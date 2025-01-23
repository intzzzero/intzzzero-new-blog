---
title: "웹의 작동 방식"
date: "2020-06-05"
update: "2020-06-05"
draft: false
category: "Network"
path: "/blog/web-process"
---

## 클라이언트와 서버
![client and server](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fc%2Fc9%2FClient-server-model.svg%2F1200px-Client-server-model.svg.png&f=1&nofb=1)

웹에 연결된 컴퓨터는 두 종류로 나눌 수가 있다. 브라우저를 통해 서비스를 요청하는 측을 **클라이언트(client)** 라고 부르며, 요청에 따른 서비스를 제공하는 측을 **서버(server)** 라고 부른다.

비단 데스크탑이나 랩탑 등의 흔히 말하는 컴퓨터 뿐만 아니라 스마트폰, 태블릿을 비롯해 네비게이션이나 심지어 요즘은 냉장고에 이르기까지 인터넷에 연결된 모든 디바이스는 클라이언트나 서버의 역할을 수행할 수 있다. 이는, 네트워크가 가능한 디바이스들은 저마다 고유한 주소인 IP를 지니고 있기 때문이다.

**참고:**
  - [MDN](https://developer.mozilla.org/ko/docs/Learn/Getting_started_with_the_web/%EC%9B%B9%EC%9D%98_%EB%8F%99%EC%9E%91_%EB%B0%A9%EC%8B%9D)


## IP Address(Internet Protocol Address)
**IP** 는 클라이언트와 서버가 통신을 통해 정보를 주고 받는 과정에서 사용하는 프로토콜이며, 호스트의 주소를 지정하고 패킷 분할 및 조립 기능을 담당한다. 그리고, **IP 주소** 는 위와 같은 일을 하기 위해 사용하는 특수한 번호다. 따라서 엄밀히 말하자면 `IP !== IP Address`인 것이다.

**IPv4(ex: 221.23.222.222)** 체계로 32비트의 주소공간을 갖는 네 묶음의 숫자로 이루어진 형태를 사용해 오다가 IP를 지정해야 하는 디바이스의 숫자가 너무 많아진 관계로 현재는 **IPv6(ex: 2001:0DB8:0000:0000:0000:0000:1428:57ab)** 즉, 128비트의 주소공간을 갖는 체계를 사용하기 시작했다.
다만, 이처럼 숫자로 이루어진 형태를 사람이 외우고 사용하기에는 무리가 있기 때문에 **숫자 주소를 문자 주소로 바꿔주는 DNS(Domain Name System)가 필요하다.**

**참고:**
  - [위키피디아](https://ko.wikipedia.org/wiki/IPv6)


## DNS(Domain Name System)
앞서 말했듯이 IP 주소는 컴퓨터가 위치를 구분할 수 있도록 고안된 주소이기 때문에 사람이 기억하고 사용하기에는 좋지 않다. 따라서 DNS를 통해 문자로 이루어진 주소로 변환을 하게 되는데, 이때 특정 IP 주소와 특정 도메인 네임의 매핑을 대신 해주는 곳이 우리가 흔히 아는 가비아, 카페24와 같은 곳이다.

**참고:**
  - [위키피디아](https://ko.wikipedia.org/wiki/%EB%8F%84%EB%A9%94%EC%9D%B8_%EB%84%A4%EC%9E%84_%EC%8B%9C%EC%8A%A4%ED%85%9C)


## OSI 7계층(OSI 7 Layer)
![OSI 7 Layer](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhydrasky.com%2Fwp-content%2Fuploads%2F2016%2F09%2FOSI-Model.jpg&f=1&nofb=1)

**OSI(Open Systems Interconnection) 7계층** 은 국제표준화기구에서 지정한 것으로, 컴퓨터 네트워크 프로토콜 디자인과 통신을 계층으로 나누어 설명한 것이다.

**참고:**
  - [위키피디아](https://ko.wikipedia.org/wiki/OSI_%EB%AA%A8%ED%98%95#%EA%B3%84%EC%B8%B5_%EB%B3%84_%EC%98%88%EC%8B%9C)