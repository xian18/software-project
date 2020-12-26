#ifndef GBN_RDT_SENDER
#define GBN_RDT_SENDER
#include"RdtSender.h"
class GBNRdtSender :public RdtSender
{
public:
	const int WINDOW_SIZE;
	int base;				//�������յĶ���
	int nextSeqNum;			//�������ڵĶ�β
	int seq;				//��һ�����͵ı��ĵ����
	Packet packetInWindows[21];
public:
	GBNRdtSender();
	virtual ~GBNRdtSender();

public:
	bool send(const Message& message);						//����Ӧ�ò�������Message����NetworkService����,������ͷ��ɹ��ؽ�Message���͵�����㣬����true;�����Ϊ���ͷ����ڵȴ�ȷ��״̬���ʹ����������ܾ�����Message���򷵻�false
	void receive(const Packet& ackPkt);						//����ȷ��Ack������NetworkService����	
	void timeoutHandler(int seqNum);					//Timeout handler������NetworkService����
	bool getWaitingState();								//����RdtSender�Ƿ��ڵȴ�״̬��������ͷ����ȴ�ȷ�ϻ��߷��ʹ�������������true
	void printSlideWindow();
};

#endif // GBN_RDT_SENDER

