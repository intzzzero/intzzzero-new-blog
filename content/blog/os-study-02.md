---
title: "OS Study 02"
date: "2020-11-03"
update: "2020-11-03"
draft: false
category: "Computer Science"
path: "/blog/operating-system-02"
---

## 운영체제의 구조

- 응용 프로그램, 운영체제, 하드웨어(시스템 리소스)의 관계
  - 운영체제가 도서관이라면
    - 응용 프로그램은 시민
    - 하드웨어는 책
    - 운영체제의 역할
    - 시민이 도서관에 책을 요청
    - 도서관은 요청받은 책을 빌려줌(응답)
    - 시민이 빌린 책의 기한이 다 되면 도서관이 회수

### 운영체제의 역할

- 응용 프로그램이 요청하는 메모리를 허가 및 분배
- 응용 프로그램이 요청하는 CPU 시간을 제공
- 응용 프로그램이 요청하는 IO Device 사용을 허가 및 제어

### 사용자 인터페이스 제공

#### 쉘(shell)

- 사용자가 운영체제 기능과 서비스를 조작할 수 있도록 인터페이스를 제공하는 프로그램
- 쉘은 터미널 환경(CLI: Command Line Interface)과, GUI(Graphical User Interface) 환경으로 구분

### API(Application Programming Interface)

- 운영체제가 응용 프로그램을 위해 제공하는 인터페이스
  - 함수의 형태
  - ex) `open()` -> 파일을 오픈할 때 쓰는 함수
- 종류가 많기 때문에 보통 라이브러리(Library)로 제공

### 시스템 콜

- 시스템 콜 또는 시스템 호출 인터페이스
- 운영체제가 운영체제 각 기능을 사용할 수 있도록 시스템 콜이라는 명령 또는 함수를 제공
- API 내부에는 시스템 콜을 호출하는 형태로 만들어지는 경우가 대부분
- 시스템 콜을 바로 사용하기에는 번거롭기 때문에 API를 통해 접근하게 됨
- UNIX 계열 운영체제의 시스템 콜은 POSIX API를 주로 사용함(리눅스, 맥)
- 시스템 콜 역시 API로 볼 수 있으며, 운영체제의 기능을 호출하는 함수를 제공한다. 그리고, API는 시스템 콜을 랩핑(wrapping)하여 각 언어별로 운영체제의 기능을 호출할 수 있도록 함수를 제공한다.

**참고:**

- [셸 - 위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/%EC%85%B8)
- [시스템 호출 - 위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/%EC%8B%9C%EC%8A%A4%ED%85%9C_%ED%98%B8%EC%B6%9C)
- [POSIX - 위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/POSIX)

### 사용자 모드와 커널 모드

#### CPU Protection Rings

![](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Priv_rings.svg/1280px-Priv_rings.svg.png)

- CPU는 권한 모드를 갖고 있음
  1. 사용자 모드(user mode): 응용 프로그램이 사용
  2. 커널 모드(kernel mode):
     - 특권 명령어 실행과 원하는 작업 수행을 위한 자원 접근을 가능하게 하는 모드
     - OS가 사용
- 우리가 만드는 프로그램은 사용자 영역에서 존재함
  ![](https://kwonsoonwoo.github.io/assets/Operating%20System/protectionring2.png)

- 시스템콜은 커널모드로 실행
  - 커널 모드에서만 실행 가능한 기능들이 있음
  - 커널 모드로 실행하려면 반드시 시스템 콜을 사용해야 함
  - 시스템 콜은 운영체제에서 제공
- 권한에 따라 영역을 나눔으로써 응용 프로그램이 전체 컴퓨터 시스템에 악영향을 끼칠 가능성을 사전에 예방

#### code example

![](https://user-images.githubusercontent.com/40616436/75624981-f9db3380-5bfc-11ea-8d18-17bcea6482f4.png)

#### 사용자 영역 -> 커널 영역 실행 도식도

![](https://miro.medium.com/max/1091/1*t2-zohRaFxxqHFF-xDPOWA.png)

**참고:**

- [커널 (컴퓨팅) - 위키백과, 우리 모두의 백과사전](<https://ko.wikipedia.org/wiki/%EC%BB%A4%EB%84%90_(%EC%BB%B4%ED%93%A8%ED%8C%85)>)
- [보호 링 - 위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/%EB%B3%B4%ED%98%B8_%EB%A7%81)
