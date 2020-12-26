#ifndef SR_RDT_RECEIVER
#define SR_RDT_RECEIVER

#include"RdtReceiver.h"

class SRRdtReceiver :public RdtReceiver
{
private:
	const int WINDOW_SIZE;
	int expectedseqnum;					//�������
	int rcv_base;						//�����е�base�� base = expectedsequm%WINDOW_SIZE			
	int rcv_window[21];					//��ʾ���������з����״̬����rcv_window[i] = 1��ʾ�ɽ�i���齻���ϲ㣬���򲻿�
	Packet packetInWindows[21];			//������յ��ķ���
	Packet LastAckPkt;

public:
	SRRdtReceiver();
	virtual ~SRRdtReceiver();

public:
	void receive(const Packet& packet);
	bool checkInWindow(const Packet& packet) ;					//��ǰ�յ��ķ�������Ƿ��ڻ���������
	bool checkInPast(const Packet& packet) ;					//��ǰ�յ��ķ����Ƿ��ڹ�ȥ�Ѿ���ȷ�Ϲ�
};


#endif