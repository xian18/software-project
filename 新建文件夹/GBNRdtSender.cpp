#include "stdafx.h"
#include"GBNRdtSender.h"
#include"Global.h"

extern int maxSeqNum;

GBNRdtSender::GBNRdtSender():nextSeqNum(0),base(0),seq(0),WINDOW_SIZE(Configuration::WINDOW_SIZE) {

}

GBNRdtSender::~GBNRdtSender() {
}


bool GBNRdtSender::getWaitingState() {

	//循环队列为满时
	if (this->nextSeqNum == this->base-1||(this->base==0&&this->nextSeqNum==WINDOW_SIZE-1)) return true;
	return false;
}


bool GBNRdtSender::send(const Message &message) {
	
	if (getWaitingState()) return false;
	
	//接受上层调用，将报文加入队列中	
	this->packetInWindows[nextSeqNum].acknum = -1;
	this->packetInWindows[nextSeqNum].checksum = 0;
	this->packetInWindows[nextSeqNum].seqnum = (seq+((nextSeqNum-base)%WINDOW_SIZE+WINDOW_SIZE)%WINDOW_SIZE)%maxSeqNum;
	
	memcpy(this->packetInWindows[nextSeqNum].payload,message.data,sizeof message.data);
	this->packetInWindows[nextSeqNum].checksum = pUtils->calculateCheckSum(this->packetInWindows[nextSeqNum]);
	
	pUtils->printPacket("发送方发送报文", this->packetInWindows[nextSeqNum]);		//发送

	if (base == nextSeqNum) 
		pns->startTimer(SENDER, Configuration::TIME_OUT, 0);   //将报文插入滑动窗口之前，滑动窗口为空
	pns->sendToNetworkLayer(RECEIVER, packetInWindows[nextSeqNum]);
	
	//循环队列
	nextSeqNum++;
	if (nextSeqNum == WINDOW_SIZE) nextSeqNum = 0;
	
	this->printSlideWindow();
	return true;
}

void GBNRdtSender::receive(const Packet& packet) {

	int checksum = pUtils->calculateCheckSum(packet);
	int isSlide = 0; //滑动窗口是否移动
	if (checksum == packet.checksum) {
		//进行序号的变换，收到的报文序号为seq或者为seq往后的WINDOW_SIZE-1个值，则接受；否则视做重复的ack，忽略
		int l = maxSeqNum - seq;			//表示从seq到最大序号还有几个数（包括seq）
		if (l >= WINDOW_SIZE)
		{
			//确保该ack确认的是以前未确认的分组
			if (packet.seqnum >= seq && packet.seqnum < seq + WINDOW_SIZE) {
				base = (base + packet.seqnum - seq+1) % WINDOW_SIZE;
				seq = packet.seqnum+1;
				isSlide = 1;
			}
			//否则忽略
		}
		else
		{
			if (packet.seqnum >= seq || packet.seqnum < (seq + WINDOW_SIZE) % maxSeqNum)
			{
				while (seq != (packet.seqnum + 1)%maxSeqNum) {
					base = (base + 1) % WINDOW_SIZE;
					seq = (seq + 1) % maxSeqNum;
				}
				isSlide = 1;
			}
		}

		pUtils->printPacket("发送方正确收到确认", packet);
		if (base == nextSeqNum)
			pns->stopTimer(SENDER, 0);
		else {
			pns->stopTimer(SENDER, 0);
			pns->startTimer(SENDER, Configuration::TIME_OUT, 0);

		}
	}
	if (isSlide) {
		std::cout << "滑动窗口移动后";
		printSlideWindow();

	}
	else
		std::cout << "滑动窗口不移动移动" << endl;
}

void GBNRdtSender::timeoutHandler(int seqNum) {
	//唯一一个定时器,无需考虑seqNum
	if (nextSeqNum == base) return;
	pUtils->printPacket("发送方定时器时间到，返回N步", this->packetInWindows[base]);
	pns->stopTimer(SENDER, 0);										//首先关闭定时器
	pns->startTimer(SENDER, Configuration::TIME_OUT, 0);			//重新启动发送方定时器
	int i = base;
	while (i % WINDOW_SIZE != nextSeqNum) {
		pns->sendToNetworkLayer(RECEIVER, this->packetInWindows[i % WINDOW_SIZE]);			//重新发送数据包
		pUtils->printPacket("重传超时分组", packetInWindows[i % WINDOW_SIZE]);
		i++;
	}
}
	
void GBNRdtSender::printSlideWindow()
{
	int i,j;
	std::cout << "发送方滑动窗口：" << endl;
	std::cout << "[";
	for (i = base,j=0;i!=nextSeqNum;i = (i+1)%WINDOW_SIZE,j++)
	{
		std::cout << (seq + j)%maxSeqNum;
		std::cout << " ";
	}
	std::cout << "*";

	for(i=nextSeqNum;i!=((base-1)%WINDOW_SIZE + WINDOW_SIZE)%WINDOW_SIZE;j++, i = (i + 1) % WINDOW_SIZE)
		std::cout << (seq + j) % maxSeqNum <<" ";
	std::cout << (seq + j) % maxSeqNum << " ";
	std::cout << "]";
	std::cout << std::endl;
}