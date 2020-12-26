#ifndef CIRCULAR_QUEUE 
#define CIRCULAR_QUEUE

class CirQueue {
private:
	const int Lenth;
public:
	int hh;
	int tt;
	int* queue;
public:
	CirQueue();
	~CirQueue();
public:
	bool isEmpty();							//�����Ƿ�Ϊ��
	bool isFull();							//�Ƿ���
	bool push(int x);						//�Ӷ�β����(ȷ������δ��),���ز����Ƿ�ɹ�
	bool pop();								//��������Ԫ��(ȷ�����в�Ϊ��),���ز����Ƿ�ɹ�
	bool queryTop();							//��ѯ����	(ȷ�����в�Ϊ��),���ز����Ƿ�ɹ�
};


#endif // !CIRCULAR_QUEUE 
