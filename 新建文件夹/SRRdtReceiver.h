#ifndef SR_RDT_RECEIVER
#define SR_RDT_RECEIVER

#include"RdtReceiver.h"

class SRRdtReceiver :public RdtReceiver
{
private:
	const int WINDOW_SIZE;
	int expectedseqnum;					//分组序号
	int rcv_base;						//窗口中的base， base = expectedsequm%WINDOW_SIZE			
	int rcv_window[21];					//表示滑动窗口中分组的状态，若rcv_window[i] = 1表示可将i分组交付上层，否则不可
	Packet packetInWindows[21];			//缓存接收到的分组
	Packet LastAckPkt;

public:
	SRRdtReceiver();
	virtual ~SRRdtReceiver();

public:
	void receive(const Packet& packet);
	bool checkInWindow(const Packet& packet) ;					//当前收到的分组序号是否在滑动窗口内
	bool checkInPast(const Packet& packet) ;					//当前收到的分组是否在过去已经被确认过
};


#endif