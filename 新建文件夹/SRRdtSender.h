#ifndef SR_RDT_SENDER
#define SR_RDT_SENDER
#include"RdtSender.h"
#include<queue>
class SRRdtSender :public RdtSender
{
private:
	const int WINDOW_SIZE;
	int base;							//滑动窗空的队首
	int nextSeqNum;						//滑动窗口的队尾
	int expectedSeqNum;					//下一个发送的报文的序号
	int stateInWindow[41];				//表示窗口中的报文是否被确认
	Packet packetInWindows[41];			//用packet的acknum来表示是否被确认，1表示确认，0表示没有		
public:
	SRRdtSender();
	virtual ~SRRdtSender();

public:
	bool check(const Packet& packet);						//检查packet是否被接收方确认接收
	bool inWindow(const Packet& ack);						//检查确认报文是否对应于滑动窗口内的报文
	bool send(const Message& message);						//发送应用层下来的Message，由NetworkService调用,如果发送方成功地将Message发送到网络层，返回true;如果因为发送方处于等待确认状态或发送窗口已满而拒绝发送Message，则返回false
	void receive(const Packet& ackPkt);						//接受确认Ack，将被NetworkService调用	
	void timeoutHandler(int seqNum);						//Timeout handler，将被NetworkService调用
	bool getWaitingState();									//返回RdtSender是否处于等待状态，如果发送方正等待确认或者发送窗口已满，返回true
};

#endif // GBN_RDT_SENDER

