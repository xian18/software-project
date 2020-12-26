#include "stdafx.h"
#include"GBNRdtSender.h"
#include"Global.h"

extern int maxSeqNum;

GBNRdtSender::GBNRdtSender():nextSeqNum(0),base(0),seq(0),WINDOW_SIZE(Configuration::WINDOW_SIZE) {

}

GBNRdtSender::~GBNRdtSender() {
}


bool GBNRdtSender::getWaitingState() {

	//ѭ������Ϊ��ʱ
	if (this->nextSeqNum == this->base-1||(this->base==0&&this->nextSeqNum==WINDOW_SIZE-1)) return true;
	return false;
}


bool GBNRdtSender::send(const Message &message) {
	
	if (getWaitingState()) return false;
	
	//�����ϲ���ã������ļ��������	
	this->packetInWindows[nextSeqNum].acknum = -1;
	this->packetInWindows[nextSeqNum].checksum = 0;
	this->packetInWindows[nextSeqNum].seqnum = (seq+((nextSeqNum-base)%WINDOW_SIZE+WINDOW_SIZE)%WINDOW_SIZE)%maxSeqNum;
	
	memcpy(this->packetInWindows[nextSeqNum].payload,message.data,sizeof message.data);
	this->packetInWindows[nextSeqNum].checksum = pUtils->calculateCheckSum(this->packetInWindows[nextSeqNum]);
	
	pUtils->printPacket("���ͷ����ͱ���", this->packetInWindows[nextSeqNum]);		//����

	if (base == nextSeqNum) 
		pns->startTimer(SENDER, Configuration::TIME_OUT, 0);   //�����Ĳ��뻬������֮ǰ����������Ϊ��
	pns->sendToNetworkLayer(RECEIVER, packetInWindows[nextSeqNum]);
	
	//ѭ������
	nextSeqNum++;
	if (nextSeqNum == WINDOW_SIZE) nextSeqNum = 0;
	
	this->printSlideWindow();
	return true;
}

void GBNRdtSender::receive(const Packet& packet) {

	int checksum = pUtils->calculateCheckSum(packet);
	int isSlide = 0; //���������Ƿ��ƶ�
	if (checksum == packet.checksum) {
		//������ŵı任���յ��ı������Ϊseq����Ϊseq�����WINDOW_SIZE-1��ֵ������ܣ����������ظ���ack������
		int l = maxSeqNum - seq;			//��ʾ��seq�������Ż��м�����������seq��
		if (l >= WINDOW_SIZE)
		{
			//ȷ����ackȷ�ϵ�����ǰδȷ�ϵķ���
			if (packet.seqnum >= seq && packet.seqnum < seq + WINDOW_SIZE) {
				base = (base + packet.seqnum - seq+1) % WINDOW_SIZE;
				seq = packet.seqnum+1;
				isSlide = 1;
			}
			//�������
		}
		else
		{
			if (packet.seqnum >= seq || packet.seqnum < (seq + WINDOW_SIZE) % maxSeqNum)
			{
				while (seq != (packet.seqnum + 1)%maxSeqNum) {
					base = (base + 1) % WINDOW_SIZE;
					seq = (seq + 1) % maxSeqNum;
				}
				isSlide = 1;
			}
		}

		pUtils->printPacket("���ͷ���ȷ�յ�ȷ��", packet);
		if (base == nextSeqNum)
			pns->stopTimer(SENDER, 0);
		else {
			pns->stopTimer(SENDER, 0);
			pns->startTimer(SENDER, Configuration::TIME_OUT, 0);

		}
	}
	if (isSlide) {
		std::cout << "���������ƶ���";
		printSlideWindow();

	}
	else
		std::cout << "�������ڲ��ƶ��ƶ�" << endl;
}

void GBNRdtSender::timeoutHandler(int seqNum) {
	//Ψһһ����ʱ��,���迼��seqNum
	if (nextSeqNum == base) return;
	pUtils->printPacket("���ͷ���ʱ��ʱ�䵽������N��", this->packetInWindows[base]);
	pns->stopTimer(SENDER, 0);										//���ȹرն�ʱ��
	pns->startTimer(SENDER, Configuration::TIME_OUT, 0);			//�����������ͷ���ʱ��
	int i = base;
	while (i % WINDOW_SIZE != nextSeqNum) {
		pns->sendToNetworkLayer(RECEIVER, this->packetInWindows[i % WINDOW_SIZE]);			//���·������ݰ�
		pUtils->printPacket("�ش���ʱ����", packetInWindows[i % WINDOW_SIZE]);
		i++;
	}
}
	
void GBNRdtSender::printSlideWindow()
{
	int i,j;
	std::cout << "���ͷ��������ڣ�" << endl;
	std::cout << "[";
	for (i = base,j=0;i!=nextSeqNum;i = (i+1)%WINDOW_SIZE,j++)
	{
		std::cout << (seq + j)%maxSeqNum;
		std::cout << " ";
	}
	std::cout << "*";

	for(i=nextSeqNum;i!=((base-1)%WINDOW_SIZE + WINDOW_SIZE)%WINDOW_SIZE;j++, i = (i + 1) % WINDOW_SIZE)
		std::cout << (seq + j) % maxSeqNum <<" ";
	std::cout << (seq + j) % maxSeqNum << " ";
	std::cout << "]";
	std::cout << std::endl;
}