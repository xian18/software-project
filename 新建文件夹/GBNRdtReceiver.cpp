#include "stdafx.h"
#include "Global.h"
#include "GBNRdtReceiver.h"
extern int maxSeqNum;

GBNRdtReceiver::GBNRdtReceiver():expectedseqnum(0),seq(0){
	LastAckPkt.checksum = 0;
	LastAckPkt.acknum = -1;
	LastAckPkt.seqnum = -1;
	for (int i = 0; i < Configuration::PAYLOAD_SIZE; i++)
		LastAckPkt.payload[i] = '.';
	LastAckPkt.checksum = pUtils->calculateCheckSum(LastAckPkt);
}

GBNRdtReceiver::~GBNRdtReceiver(){}

void GBNRdtReceiver::receive(const Packet &packet) {
	//���У����Ƿ���ȷ
	int checkSum = pUtils->calculateCheckSum(packet);

	//���У�����ȷ��ͬʱ�յ����ĵ���ŵ��ڽ��շ��ڴ��յ��ı������һ��
	if (checkSum == packet.checksum && this->seq == packet.seqnum) {
		pUtils->printPacket("���շ���ȷ�յ����ͷ��ı���", packet);

		//ȡ��Message�����ϵݽ���Ӧ�ò�
		Message msg;
		memcpy(msg.data, packet.payload, sizeof(packet.payload));
		pns->delivertoAppLayer(RECEIVER, msg);

		LastAckPkt.acknum = packet.seqnum;				//�ڴ�����һ�����ĵ����
		LastAckPkt.seqnum = packet.seqnum;
		LastAckPkt.checksum = pUtils->calculateCheckSum(LastAckPkt);
		pUtils->printPacket("���շ�����ȷ�ϱ���", LastAckPkt);
		pns->sendToNetworkLayer(SENDER, LastAckPkt);	//����ģ�����绷����sendToNetworkLayer��ͨ������㷢��ȷ�ϱ��ĵ��Է�

		this->seq = (this->seq + 1) % maxSeqNum;
	}
	else {
		if (checkSum != packet.checksum) {
			pUtils->printPacket("���շ�û����ȷ�յ����ͷ��ı���,����У�����", packet);
		}
		else {
			pUtils->printPacket("���շ�û����ȷ�յ����ͷ��ı���,������Ų���", packet);
		}
		pUtils->printPacket("���շ����·����ϴε�ȷ�ϱ���", LastAckPkt);
		pns->sendToNetworkLayer(SENDER, LastAckPkt);	//����ģ�����绷����sendToNetworkLayer��ͨ������㷢���ϴε�ȷ�ϱ���

	}
	
}

