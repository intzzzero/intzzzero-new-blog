---
title: "OS Study 01"
date: "2020-10-10"
update: "2020-10-10"
draft: false
category: "Computer Science"
path: "/blog/operating-system-01"
---

**패스트캠퍼스 온라인 강의 [컴퓨터공학 올인원 패키지]를 시청하며 기록함**

## 운영체제의 역할

### 1. 시스템 자원(System Resource) 관리자

- 운영체제(Operating System)의 준말 OS를 주로 사용함
- 시스템 자원은 **컴퓨터 하드웨어** 를 의미함
  - CPU - Memory(DRAM, RAM)
  - I/O Devices(입출력 장치)
  - Monitor, Mouse, Keyboard, Network 등
  - 저장매체: SSD, HDD
- 운영체제의 주요한 역할은 컴퓨터 하드웨어를 관리하는 것
- 하드웨어는 스스로 할 수 있는 일이 없다. 따라서 각 프로그램이 CPU를 얼마나 사용할지, 각 프로그램이 메모리의 어느 주소에 저장할지, 메모리 공간은 얼마나 차지할지 결정하는 것은 소프트웨어(OS)의 역할.
- 대표적인 OS로는 다음과 같은 것들이 있다.
  - UNIX: 현대 운영체제의 시초
  - Windows OS
  - Mac OS: UNIX 계열 OS
  - LINUX: UNIX 계열 OS, 프로그래밍을 한다면 반드시 사용

### 2. 사용자와 컴퓨터를 이어주는 매개체

![](https://electricalfundablog.com/wp-content/uploads/2018/09/Operating-System-Interface-Between-User-and-Computers-Hardware_thumb.png)

### 3. 컴퓨터 하드웨어와 프로그램을 제어

## 운영체제의 History

### 1950

- ENIAC: 최초의 컴퓨터
- 최초의 컴퓨터에는 운영체제가 없었음.
- 운영체제는 커녕 하나의 응용 프로그램을 실행하는 것도 벅찼음
- 응용 프로그램이 시스템 자원까지 직접 제어해야 했음

### 1960

- 프로그램의 종류가 다양해지기 시작하며, 사용자도 늘어남
- 실행할 프로그램은 여럿인데 실행할 수 있는 프로세서는 하나 뿐이라 각 프로그램이 실행되는 순서를 정해야 했음
- 그래서 **배치 처리 시스템\(batch processing system\)** 이 등장함
  - 여러 응용 프로그램을 등록하여 순차적으로 실행하는 시스템
  - 배치 처리 시스템을 기반으로 하여 운영체제가 출현

#### 배치 처리 시스템 역할

![](https://www.gatevidyalay.com/wp-content/uploads/2018/10/Batch-Operating-System.png)

- 자동으로 다음 응용 프로그램이 이어서 실행될 수 있도록 하는 시스템
- 각 프로그램을 어떤 순서로 등록하느냐에 따라 실행속도 및 실행시간이 달라질 수 있음 - 두 번째 프로그램은 첫 번째 프로그램의 실행시간까지 포함하기 때문

### 1960년대 후반

- 새로운 개념이 등장
  - 시분할 시스템(Time Sharing System)
  - 멀티 태스킹(Multi Tasking)
- 위의 개념이 등장했으나 기술적 한계로 이론적으로만 남고 구현되지는 못함

#### 시분할 시스템과 멀티 태스킹

![](https://media.geeksforgeeks.org/wp-content/uploads/20200524180155/Capture2210.png)

- 응용 프로그램이 CPU를 사용하는 시간을 세분화하여 여러 응용 프로그램을 동시에 실행하는 기법
- 시분할 시스템과 멀티 태스킹은 목적이 조금 다르지만 원리는 유사함
  - 시분할 시스템: 다중 사용자를 지원하고, 컴퓨터 응답 시간을 최소화는 것이 목적
  - 멀티 태스킹: 다수의 작업이 CPU와 같은 공용자원을 나누어 쓰는 것

**참고:**

- [다중작업 - 위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/%EB%8B%A4%EC%A4%91%EC%9E%91%EC%97%85)
