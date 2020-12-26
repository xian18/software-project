#include "stdafx.h"
#include"SRRdtSender.h"
#include"Global.h"


SRRdtSender::SRRdtSender() :nextSeqNum(0), base(0), expectedSeqNum(0), WINDOW_SIZE(Configuration::WINDOW_SIZE) {
	for (int i = 0; i < 41; i++) stateInWindow[i] = 0;
}

SRRdtSender::~SRRdtSender() {
}


bool SRRdtSender::check(const Packet& packet) {

	return stateInWindow[packet.seqnum%WINDOW_SIZE];
}

//�жϸ����кŵı����Ƿ��ڻ���������
bool SRRdtSender::inWindow(const Packet& ack) {

	int seq = ack.seqnum%WINDOW_SIZE;
	if (base == nextSeqNum) return false;
	if (base>nextSeqNum) {
		if (seq >= base||seq < nextSeqNum) return true; 
	}
	if (base < nextSeqNum)
		if (seq >= base && seq < nextSeqNum) return true;
	return false;
}

bool SRRdtSender::getWaitingState() {
	//ѭ������Ϊ��ʱ

	if (this->nextSeqNum == this->base - 1 || (this->base == 0 && this->nextSeqNum == WINDOW_SIZE - 1))
	{
		std::cout << "base = " << base << endl;
		std::cout << "nextSeqNum = " << nextSeqNum << endl;
		std::cout << "���ͻ������������ܾ��ϲ�����" << endl;
		return true;
	}
	return false;
}
bool SRRdtSender::send(const Message& message) {

	//�ϲ���ã���黬�������Ƿ�Ϊ������Ϊ����ܾ�����
	if (getWaitingState())
	{
		return false;
	}

	//�����ϲ���ã������Ļ��浽������	
	this->packetInWindows[nextSeqNum].acknum = -1;
	this->packetInWindows[nextSeqNum].checksum = 0;
	this->packetInWindows[nextSeqNum].seqnum = expectedSeqNum + ((nextSeqNum - base) % WINDOW_SIZE + WINDOW_SIZE) % WINDOW_SIZE;
	memcpy(this->packetInWindows[nextSeqNum].payload, message.data, sizeof message.data);
	this->packetInWindows[nextSeqNum].checksum = pUtils->calculateCheckSum(this->packetInWindows[nextSeqNum]);

	pUtils->printPacket("���ͷ����ͱ���", this->packetInWindows[nextSeqNum]);		//����
	pns->startTimer(SENDER, Configuration::TIME_OUT, nextSeqNum);   //���ķ�������ʱ��ʼ
	pns->sendToNetworkLayer(RECEIVER, packetInWindows[nextSeqNum]);

	//ѭ������
	nextSeqNum++;
	if (nextSeqNum == WINDOW_SIZE) nextSeqNum = 0;
	return true;
}

void SRRdtSender::receive(const Packet& packet) {
	if (!inWindow(packet)) return;
	int checksum = pUtils->calculateCheckSum(packet);								//�����
	if (checksum == packet.checksum)
		if (packet.seqnum >= expectedSeqNum) {
			this->stateInWindow[packet.seqnum % WINDOW_SIZE] = 1;			//������ŵı��ı��Ϊ��ȷ��
			pUtils->printPacket("���ͷ���ȷ�յ�ȷ��", packet);
			pns->stopTimer(SENDER, packet.seqnum % WINDOW_SIZE);
			std::cout << "base = " << base << endl;
			std::cout << "nextSeqNum = " << nextSeqNum << endl;
			while (base != nextSeqNum && check(packetInWindows[base])) {
				this->stateInWindow[base] = 0;
				base = (base+1)%WINDOW_SIZE;

				expectedSeqNum ++;													//�ô��ڻ�������һ��û�б�ȷ�ϵ�λ��
			
			}
		}
}

void SRRdtSender::timeoutHandler(int seqNum) {
	//Ψһһ����ʱ��,���迼��seqNum
	if (nextSeqNum == base) return;                  
	pUtils->printPacket("���ͷ���ʱ��ʱ�䵽���ط���ʱ����", this->packetInWindows[seqNum]);
	pns->stopTimer(SENDER, seqNum);										//���ȹرն�ʱ��
	pns->startTimer(SENDER, Configuration::TIME_OUT, seqNum);			//�����������ͷ���ʱ��
	pUtils->printPacket("�ش���ʱ����", packetInWindows[seqNum]);
	pns->sendToNetworkLayer(RECEIVER, this->packetInWindows[seqNum]);			//���·������ݰ�
	
	
}