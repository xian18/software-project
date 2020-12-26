#include "stdafx.h"
#include "Global.h"
#include "SRRdtReceiver.h"

SRRdtReceiver::SRRdtReceiver() :expectedseqnum(0),rcv_base(0), WINDOW_SIZE(Configuration::WINDOW_SIZE) {

	LastAckPkt.checksum = 0;
	LastAckPkt.acknum = -1;
	LastAckPkt.seqnum = -1;
	for (int i = 0; i < WINDOW_SIZE; i++)
		rcv_window[i] = 0;

	for (int i = 0; i < Configuration::PAYLOAD_SIZE; i++)
		LastAckPkt.payload[i] = '.';
	LastAckPkt.checksum = pUtils->calculateCheckSum(LastAckPkt);
}

SRRdtReceiver::~SRRdtReceiver() {}

bool SRRdtReceiver:: checkInWindow(const Packet& packet) {
	int seq = packet.seqnum;
	return (seq < expectedseqnum + WINDOW_SIZE) && (seq >= expectedseqnum);

}

bool SRRdtReceiver::checkInPast(const Packet& packet) {
	return packet.seqnum < expectedseqnum;
}

void SRRdtReceiver::receive(const Packet& packet) {
	//���У����Ƿ���ȷ
	int checkSum = pUtils->calculateCheckSum(packet);

	//���У�����ȷ
	if (checkSum == packet.checksum && checkInWindow(packet)){

		pUtils->printPacket("���շ���ȷ�յ����ͷ��ı���", packet);

		//��������뻺����������뻺������λ��Ӧͨ��base��һ��ƫ����
		int offset = (rcv_base + packet.seqnum - expectedseqnum)%WINDOW_SIZE;
		
		//
		if (rcv_window[offset])
			pUtils->printPacket("�ñ����Ѿ���ȷ��,�ٴη���ack",packet);
		else {
			this->packetInWindows[offset] = packet;
			pUtils->printPacket("�ñ��ı�����", packet);
			rcv_window[offset] = 1;
		}
		//����ack
		LastAckPkt.acknum = packet.seqnum;				//ȷ����ŵ����յ��ı������
		LastAckPkt.seqnum = packet.seqnum;
		LastAckPkt.checksum = pUtils->calculateCheckSum(LastAckPkt);
		pUtils->printPacket("���շ�����ȷ�ϱ���", LastAckPkt);
		pns->sendToNetworkLayer(SENDER, LastAckPkt);	//����ģ�����绷����sendToNetworkLayer��ͨ������㷢��ȷ�ϱ��ĵ��Է�

		//���Ѿ����ı��ĵݽ����ϲ�
	
		while (rcv_window[rcv_base]) {
			Message msg;
			pUtils->printPacket("���շ������ĵݽ����ϲ�", LastAckPkt);
			memcpy(msg.data,packetInWindows[rcv_base].payload, sizeof(packetInWindows[rcv_base].payload));
			pns->delivertoAppLayer(RECEIVER, msg);						//
			rcv_window[rcv_base] = 0;									//�ݽ����ϲ�󣬷�����Ч
			rcv_base = (rcv_base + 1) % WINDOW_SIZE;					//
			expectedseqnum++;
		}
		
	}
	else if(checkInPast(packet)){
		//����ack
		pUtils->printPacket("����ŷ�����֮ǰ�Ѿ���ȷ�Ϲ�", LastAckPkt);
		LastAckPkt.acknum = packet.seqnum;				//ȷ����ŵ����յ��ı������
		LastAckPkt.seqnum = packet.seqnum;
		LastAckPkt.checksum = pUtils->calculateCheckSum(LastAckPkt);
		pUtils->printPacket("���շ�����ȷ�ϱ���", LastAckPkt);
		pns->sendToNetworkLayer(SENDER, LastAckPkt);	//����ģ�����绷����sendToNetworkLayer��ͨ������㷢��ȷ�ϱ��ĵ��Է�
	}
	else
		pUtils->printPacket("���շ�û����ȷ�յ����ͷ��ı���,����У�����,���Ը÷���", packet);
}