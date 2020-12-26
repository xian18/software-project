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
	//检查校验和是否正确
	int checkSum = pUtils->calculateCheckSum(packet);

	//如果校验和正确，同时收到报文的序号等于接收方期待收到的报文序号一致
	if (checkSum == packet.checksum && this->seq == packet.seqnum) {
		pUtils->printPacket("接收方正确收到发送方的报文", packet);

		//取出Message，向上递交给应用层
		Message msg;
		memcpy(msg.data, packet.payload, sizeof(packet.payload));
		pns->delivertoAppLayer(RECEIVER, msg);

		LastAckPkt.acknum = packet.seqnum;				//期待的下一个报文的序号
		LastAckPkt.seqnum = packet.seqnum;
		LastAckPkt.checksum = pUtils->calculateCheckSum(LastAckPkt);
		pUtils->printPacket("接收方发送确认报文", LastAckPkt);
		pns->sendToNetworkLayer(SENDER, LastAckPkt);	//调用模拟网络环境的sendToNetworkLayer，通过网络层发送确认报文到对方

		this->seq = (this->seq + 1) % maxSeqNum;
	}
	else {
		if (checkSum != packet.checksum) {
			pUtils->printPacket("接收方没有正确收到发送方的报文,数据校验错误", packet);
		}
		else {
			pUtils->printPacket("接收方没有正确收到发送方的报文,报文序号不对", packet);
		}
		pUtils->printPacket("接收方重新发送上次的确认报文", LastAckPkt);
		pns->sendToNetworkLayer(SENDER, LastAckPkt);	//调用模拟网络环境的sendToNetworkLayer，通过网络层发送上次的确认报文

	}
	
}

