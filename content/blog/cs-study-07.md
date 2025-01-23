---
title: "CS Study 07"
date: "2020-06-22"
update: "2020-06-22"
draft: false
category: "Computer Science"
path: "/blog/computer-science-07"
---

## Network
- NIC가 2개 이상부터는 라우터라고 부를 수 있음.
- IP의 역할은 단 하나, IP라우팅
- `$ netstat -r` 라우팅테이블 호출

## TCP/IP 4계층
1. 1계층) Network Interface - Ethernet(MAC address)
2. 2계층) Internet - IP(IP routing), packet을 받는 호스트(컴퓨터)를 특정하는 역할, 특정 호스트에 도달하기 위해 IP를 관리하는 계층
3. 3계층) Transport - TCP/UDP, Port를 관리하며, 특정 프로세스(서버나 클라이언트)에 접근
4. 4계층) Application
	- HTTP: 메시지 기반, 문자열,
	- HTTPS: application과 transport 사이에 SSL/TLS(secure socket layer)가 추가되어 암호화 됨
	- DNS

## DNS(Domain Name System)
- `$ nslookup` -> facebook.com : 해당 도메인의 IP 확인 가능
- IP주소를 기억하기 어려워서 사람이 기억하기 쉬운 도메인 네임이 등장
- 입력된 도메인 네임을 DNS가 IP로 변환해줌
- 브라우저가 DNS Server 측으로 요청(처음 접속 시에 요청 후, cache에 저장 됨)

## URL(파일식별자, Uniform Resource Lacator)
- 구조: `http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument`
- URL: 요청한 자원의 위치를 가리킨다.
- `http`: 형식을 나타내는 Protocol 혹은 Scheme
- `www.example.com`: Domain Name, IP주소와 동일한 역할
- `:80`: Port, 생략하는 경우가 많음.
- `/path/to/myfile.html`: 해당 문서의 경로, 최근에는 물리적 경로가 아닌, 웹 서버에서 추상화된 경로를 나타내는 경우가 많음.
- `?key1=value1&key2=value2`: Query라고 부르며, 해당 자원을 대략적으로 설명한다.
- `#SomewhereInTheDocument`: Anchor 혹은 Bookmark라고 한다. 보통 해당 페이지에서 임의 지점으로 자동 스크롤링 되는 방식으로 이용된다.

## HTTP
- 0.9/1.0 버전까지는 text 위주였기 때문에 UDP를 사용했음.
- 1.1부터는 TCP를 통한 지속적 연결 지원. -> 이미지, 영상 등 정보가 많아져서

## 메서드
클라이언트가 웹서버에게 사용자 요청의 목적과 종류를 알리는 수단으로, HTTP 요청 메시지의 첫째줄에 위치한다. GET과 POST 방식이 주로 쓰인다.
- GET: 리소스 취득
- HEAD: 메시지 헤더(문서 정보) 취득
- POST: 내용 전송(파일 전송도 가능)
- PUT: 내용 갱신 위주(파일 전송도 가능)
- DELETE: 웹 리소스(파일) 제거
- TRACE: 요청 리소스가 수신되는 경로를 보여줌. 거의 사용 안함.
- OPTION: 웹서버측 제공 메소드에 대한 질의
- CONNECT: 프록시 서버와 같은 중간 서버 경유. 거의 사용 안함.
> 보안상의 이유로, 웹서버가 GET, POST 2개의 메소드 또는 OPTIONS를 포함한 3개까지만 허용하는 경우가 대부분.

## 상태코드
- 200번대: 성공
- 300번대: Redirect
- 400번대: client의 문제로 실패, 요청에 문제가 있음.
- 500번대: server의 문제로 실패, 응답에 문제가 있음.

## 컨텐츠 협상
- 요청 자료에 대해 우선순위를 정해 놓고 요청을 했을 때 서버에서 해당 설정에 맞춰서 전송
- 서버 주도 방식과 클라이언트 주도 방식이 있음
	- server-driven: 네트워크에 부담
	- agent-driven: 정확도 상승
- ex) `Accept : text/html, text/*;q=0.5, */*;q=0.2`

## TCP/UDP
- **TCP**
	- 신뢰도가 높다.
	- 패킷이 유실되면, 재전송 해줌.
	- 유실 유무를 지속적으로 확인하기 때문에 네트워크에 부담이 됨.
	- 파일, 메일 등에 주로 쓰임.
	- 서버소켓과 호스트가  접속된 후 계속 연결 되어있음.

- **UDP**
	- 신뢰도가 낮다.
	- 패킷 전송 후 유실 돼도 재전송 안해줌.
	- 빠르고 가벼움.
	- 동영상 서비스나 게임 등에 주로 쓰임.
	- 데이터 전송 후 연결 해제

### 참고할만한 자료
- [알라딘: TCP/IP 완벽 가이드](https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=872152)
- [NAVER D2](https://d2.naver.com/helloworld/47667) - 최소한 ‘데이터 수신’까지는 알아야 함!

## NAT(Network Address Translation)
- 라우터가 호스트의 IP(private)를 자신의 IP(public)로 변환하여 저장

## NAPT(Network Address Port Translation)
- NAT에 Port까지 함게 맵핑하여 변환
- NIC(정확하게는 라우터가 호스트에게 할당해줄 수 있는 IP의 갯수)가 부족하여 동일한 IP를 할당할 수밖에 없을 때, 이를 구분하기 위해 Port번호를 추가, 변경하여 구분.

## port
- 2**10개 만큼 사용 가능
- 특정 프로세스에 정확하게 정보를 전송하기 위한 표식

## Server / Client
- server: 서비스 제공자, socket이 많다. 특정 컴퓨터의 특정 프로세스.
	- 웹 서버
	- 게임 서버
	- ftp 서버
- port: socket(일종의 메모리)에 부여된 숫자. 0~2<sup>16-1</sup>, 2bytes 정수
	- 0~1023 (server)
	- 49152~65534(client)
	- Well-known port(정해진 포트 번호)가 있음(표 참고)
	- HTTPS port : 443 / HTTP : 80
- client: 프로세스
- socket: 두 종류가 있음
	- data socket: 접속 후 데이터를 송/수신 하는 소켓
	- listening socket : client로부터 접속 요청을 받는 소켓
**sliding window - 공부할 것**

## 자료구조/알고리즘
### Comparison Sorting - 우선적으로 공부해야 할 알고리즘

1. Quick Sort - Random pivot
	- O(n log n) -> average
	
```python
def get_middle_idx(li, start, mid, end):
    """
    리스트의 맨 처음 값과 중간 값, 마지막 값 중에서
    가운데 값이 위치한 인덱스를 반환한다.
    """
    idx_li=[start, mid, end]
    
    # to do
    if li[idx_li[0]] < li[idx_li[1]]:
        idx_li[0], idx_li[1]=idx_li[1], idx_li[0]
    if li[idx_li[1]] > li[idx_li[2]]:
        idx_li[1], idx_li[2]=idx_li[2], idx_li[1]
    if li[idx_li[0]] > li[idx_li[1]]:
        idx_li[0], idx_li[1]=idx_li[1], idx_li[0]
    
    return idx_li[1]

def quick_sort(li, start, end):
    # base case
    # to do
    if start >= end:
        return
    left=start
    right=end
    mid=li[(left+right)//2]
    
    # 추가된 코드
    mid_idx=get_middle_idx(li, start, mid, end)
    li[mid_idx], li[mid]=li[mid], li[mid_idx]
    
    # left와 right가 교차하기 전까지
    while left <= right:
        # li[left]가 피벗보다 작으면
        # left++
        while li[left] < pivot:
            left+=1

        # li[right]가 피벗보다 크면
        # right--
        while pivot < li[right]:
            right-=1
            
        if left <= right:
            li[left], li[right]=li[right], li[left]
            left+=1
            right-=1
            
    quick_sort(li, start, right)
    quick_sort(li, left, end)

# TEST
import random
while True:
    num_data=int(input('데이터 개수(종료:0):'))
    if not num_data:
        break
    data=[random.randint(1, 100) for _ in range(num_data)]
    print(data)
    quick_sort(data, 0, len(data)-1)
    print(data)
```

2. Insertion sort / selection sort
    - insertion sort(삽입정렬)

```python
def insertion_sort(li):
    n=len(li)
    
    for i in range(1, n):
        temp=li[i]
        for j in range(i-1, -2, -1):
            if j==-1:
                break
                
            if li[j] > temp:
                li[j+1]=li[j]
            else:
                break
        li[j+1]=temp

# TEST
import random
while True:
    num_data=int(input('데이터 개수(종료:0):'))
    if not num_data:
        break
    data=[random.randint(1, 100) for _ in range(num_data)]
    print(data)
    insertion_sort(data)
    print(data)
```

- selection sort

```python
def selection_sort(li):
    n=len(li)
    
    for i in range(n-1):
        min_idx=i
        for j in range(i+1, n):
            if li[j] < li[min_idx]:
                min_idx=j
        li[i], li[min_idx]=li[min_idx], li[i]

# TEST
import random
while True:
    num_data=int(input('데이터 개수(종료:0):'))
    if not num_data:
        break
    data=[random.randint(1, 100) for _ in range(num_data)]
    print(data)
    selection_sort(data)
    print(data)
```