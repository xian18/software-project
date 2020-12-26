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
	bool isEmpty();							//队列是否为空
	bool isFull();							//是否满
	bool push(int x);						//从队尾插入(确保队列未满),返回操作是否成功
	bool pop();								//弹出队首元素(确保队列不为空),返回操作是否成功
	bool queryTop();							//查询队首	(确保队列不为空),返回操作是否成功
};


#endif // !CIRCULAR_QUEUE 
