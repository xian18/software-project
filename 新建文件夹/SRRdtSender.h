#ifndef SR_RDT_SENDER
#define SR_RDT_SENDER
#include"RdtSender.h"
#include<queue>
class SRRdtSender :public RdtSender
{
private:
	const int WINDOW_SIZE;
	int base;							//�������յĶ���
	int nextSeqNum;						//�������ڵĶ�β
	int expectedSeqNum;					//��һ�����͵ı��ĵ����
	int stateInWindow[41];				//��ʾ�����еı����Ƿ�ȷ��
	Packet packetInWindows[41];			//��packet��acknum����ʾ�Ƿ�ȷ�ϣ�1��ʾȷ�ϣ�0��ʾû��		
public:
	SRRdtSender();
	virtual ~SRRdtSender();

public:
	bool check(const Packet& packet);						//���packet�Ƿ񱻽��շ�ȷ�Ͻ���
	bool inWindow(const Packet& ack);						//���ȷ�ϱ����Ƿ��Ӧ�ڻ��������ڵı���
	bool send(const Message& message);						//����Ӧ�ò�������Message����NetworkService����,������ͷ��ɹ��ؽ�Message���͵�����㣬����true;�����Ϊ���ͷ����ڵȴ�ȷ��״̬���ʹ����������ܾ�����Message���򷵻�false
	void receive(const Packet& ackPkt);						//����ȷ��Ack������NetworkService����	
	void timeoutHandler(int seqNum);						//Timeout handler������NetworkService����
	bool getWaitingState();									//����RdtSender�Ƿ��ڵȴ�״̬��������ͷ����ȴ�ȷ�ϻ��߷��ʹ�������������true
};

#endif // GBN_RDT_SENDER

