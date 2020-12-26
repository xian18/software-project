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
	//检查校验和是否正确
	int checkSum = pUtils->calculateCheckSum(packet);

	//如果校验和正确
	if (checkSum == packet.checksum && checkInWindow(packet)){

		pUtils->printPacket("接收方正确收到发送方的报文", packet);

		//将分组放入缓冲区，其放入缓冲区的位置应通过base加一个偏移量
		int offset = (rcv_base + packet.seqnum - expectedseqnum)%WINDOW_SIZE;
		
		//
		if (rcv_window[offset])
			pUtils->printPacket("该报文已经被确认,再次发送ack",packet);
		else {
			this->packetInWindows[offset] = packet;
			pUtils->printPacket("该报文被缓存", packet);
			rcv_window[offset] = 1;
		}
		//发送ack
		LastAckPkt.acknum = packet.seqnum;				//确认序号等于收到的报文序号
		LastAckPkt.seqnum = packet.seqnum;
		LastAckPkt.checksum = pUtils->calculateCheckSum(LastAckPkt);
		pUtils->printPacket("接收方发送确认报文", LastAckPkt);
		pns->sendToNetworkLayer(SENDER, LastAckPkt);	//调用模拟网络环境的sendToNetworkLayer，通过网络层发送确认报文到对方

		//将已就绪的报文递交到上层
	
		while (rcv_window[rcv_base]) {
			Message msg;
			pUtils->printPacket("接收方将报文递交到上层", LastAckPkt);
			memcpy(msg.data,packetInWindows[rcv_base].payload, sizeof(packetInWindows[rcv_base].payload));
			pns->delivertoAppLayer(RECEIVER, msg);						//
			rcv_window[rcv_base] = 0;									//递交到上层后，分组无效
			rcv_base = (rcv_base + 1) % WINDOW_SIZE;					//
			expectedseqnum++;
		}
		
	}
	else if(checkInPast(packet)){
		//发送ack
		pUtils->printPacket("该序号分组在之前已经被确认过", LastAckPkt);
		LastAckPkt.acknum = packet.seqnum;				//确认序号等于收到的报文序号
		LastAckPkt.seqnum = packet.seqnum;
		LastAckPkt.checksum = pUtils->calculateCheckSum(LastAckPkt);
		pUtils->printPacket("接收方发送确认报文", LastAckPkt);
		pns->sendToNetworkLayer(SENDER, LastAckPkt);	//调用模拟网络环境的sendToNetworkLayer，通过网络层发送确认报文到对方
	}
	else
		pUtils->printPacket("接收方没有正确收到发送方的报文,数据校验错误,忽略该分组", packet);
}