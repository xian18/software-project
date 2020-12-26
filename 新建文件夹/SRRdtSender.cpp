#include "stdafx.h"
#include"SRRdtSender.h"
#include"Global.h"


SRRdtSender::SRRdtSender() :nextSeqNum(0), base(0), expectedSeqNum(0), WINDOW_SIZE(Configuration::WINDOW_SIZE) {
	for (int i = 0; i < 41; i++) stateInWindow[i] = 0;
}

SRRdtSender::~SRRdtSender() {
}


bool SRRdtSender::check(const Packet& packet) {

	return stateInWindow[packet.seqnum%WINDOW_SIZE];
}

//判断该序列号的报文是否在滑动窗口内
bool SRRdtSender::inWindow(const Packet& ack) {

	int seq = ack.seqnum%WINDOW_SIZE;
	if (base == nextSeqNum) return false;
	if (base>nextSeqNum) {
		if (seq >= base||seq < nextSeqNum) return true; 
	}
	if (base < nextSeqNum)
		if (seq >= base && seq < nextSeqNum) return true;
	return false;
}

bool SRRdtSender::getWaitingState() {
	//循环队列为满时

	if (this->nextSeqNum == this->base - 1 || (this->base == 0 && this->nextSeqNum == WINDOW_SIZE - 1))
	{
		std::cout << "base = " << base << endl;
		std::cout << "nextSeqNum = " << nextSeqNum << endl;
		std::cout << "发送缓冲区已满，拒绝上层请求" << endl;
		return true;
	}
	return false;
}
bool SRRdtSender::send(const Message& message) {

	//上层调用，检查滑动窗口是否为满，若为满则拒绝请求
	if (getWaitingState())
	{
		return false;
	}

	//接受上层调用，将报文缓存到队列中	
	this->packetInWindows[nextSeqNum].acknum = -1;
	this->packetInWindows[nextSeqNum].checksum = 0;
	this->packetInWindows[nextSeqNum].seqnum = expectedSeqNum + ((nextSeqNum - base) % WINDOW_SIZE + WINDOW_SIZE) % WINDOW_SIZE;
	memcpy(this->packetInWindows[nextSeqNum].payload, message.data, sizeof message.data);
	this->packetInWindows[nextSeqNum].checksum = pUtils->calculateCheckSum(this->packetInWindows[nextSeqNum]);

	pUtils->printPacket("发送方发送报文", this->packetInWindows[nextSeqNum]);		//发送
	pns->startTimer(SENDER, Configuration::TIME_OUT, nextSeqNum);   //报文发出，计时开始
	pns->sendToNetworkLayer(RECEIVER, packetInWindows[nextSeqNum]);

	//循环队列
	nextSeqNum++;
	if (nextSeqNum == WINDOW_SIZE) nextSeqNum = 0;
	return true;
}

void SRRdtSender::receive(const Packet& packet) {
	if (!inWindow(packet)) return;
	int checksum = pUtils->calculateCheckSum(packet);								//检验和
	if (checksum == packet.checksum)
		if (packet.seqnum >= expectedSeqNum) {
			this->stateInWindow[packet.seqnum % WINDOW_SIZE] = 1;			//将该序号的报文标记为以确认
			pUtils->printPacket("发送方正确收到确认", packet);
			pns->stopTimer(SENDER, packet.seqnum % WINDOW_SIZE);
			std::cout << "base = " << base << endl;
			std::cout << "nextSeqNum = " << nextSeqNum << endl;
			while (base != nextSeqNum && check(packetInWindows[base])) {
				this->stateInWindow[base] = 0;
				base = (base+1)%WINDOW_SIZE;

				expectedSeqNum ++;													//让窗口滑动到第一个没有被确认的位置
			
			}
		}
}

void SRRdtSender::timeoutHandler(int seqNum) {
	//唯一一个定时器,无需考虑seqNum
	if (nextSeqNum == base) return;                  
	pUtils->printPacket("发送方定时器时间到，重发超时分组", this->packetInWindows[seqNum]);
	pns->stopTimer(SENDER, seqNum);										//首先关闭定时器
	pns->startTimer(SENDER, Configuration::TIME_OUT, seqNum);			//重新启动发送方定时器
	pUtils->printPacket("重传超时分组", packetInWindows[seqNum]);
	pns->sendToNetworkLayer(RECEIVER, this->packetInWindows[seqNum]);			//重新发送数据包
	
	
}