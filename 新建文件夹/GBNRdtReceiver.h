#ifndef GBN_RDT_RECEIVER
#define GBN_RDT_RECEIVER

#include"RdtReceiver.h"

class GBNRdtReceiver :public RdtReceiver
{
private:
	int expectedseqnum;						//���յ��ı��ĺż���
	int seq;								//ͨ��expectedseqnum�õ�seq
	Packet LastAckPkt;

public:
	GBNRdtReceiver();
	virtual ~GBNRdtReceiver();

public:
	void receive(const Packet &packet );
};


#endif
