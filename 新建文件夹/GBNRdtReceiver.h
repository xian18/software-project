#ifndef GBN_RDT_RECEIVER
#define GBN_RDT_RECEIVER

#include"RdtReceiver.h"

class GBNRdtReceiver :public RdtReceiver
{
private:
	int expectedseqnum;						//将收到的报文号计数
	int seq;								//通过expectedseqnum得到seq
	Packet LastAckPkt;

public:
	GBNRdtReceiver();
	virtual ~GBNRdtReceiver();

public:
	void receive(const Packet &packet );
};


#endif
