#ifndef GBN_RDT_SENDER
#define GBN_RDT_SENDER
#include"RdtSender.h"
class GBNRdtSender :public RdtSender
{
public:
	const int WINDOW_SIZE;
	int base;				//滑动窗空的队首
	int nextSeqNum;			//滑动窗口的队尾
	int seq;				//下一个发送的报文的序号
	Packet packetInWindows[21];
public:
	GBNRdtSender();
	virtual ~GBNRdtSender();

public:
	bool send(const Message& message);						//发送应用层下来的Message，由NetworkService调用,如果发送方成功地将Message发送到网络层，返回true;如果因为发送方处于等待确认状态或发送窗口已满而拒绝发送Message，则返回false
	void receive(const Packet& ackPkt);						//接受确认Ack，将被NetworkService调用	
	void timeoutHandler(int seqNum);					//Timeout handler，将被NetworkService调用
	bool getWaitingState();								//返回RdtSender是否处于等待状态，如果发送方正等待确认或者发送窗口已满，返回true
	void printSlideWindow();
};

#endif // GBN_RDT_SENDER

