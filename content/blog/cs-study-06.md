---
title: "CS Study 06"
date: "2020-06-21"
update: "2020-06-21"
draft: false
category: "Computer Science"
path: "/blog/computer-science-06"
---

## OOP 공부할 때 반드시 이해해야 할 개념
1. 캡슐화(encapsulation): 정보 은닉을 포함
2. 정보 은닉(information hiding)
3. 다형성(polymorphism): 상속(inheritance) -> 매서드 오버라이딩(method overriding)
4. 디자인 패턴(SOLID) - 참고서적: [GoF](http://www.yes24.com/Product/goods/2594543)
	- S: single responsibility principle(단일책임)
	- O: open-closed principle(확장-폐쇄)
	- L: Liskov substitution principle(리스코프 치환)
	- I: interface segregation principle(인터페이스 분리)
	- D: dependency inversion principle(의존 역전)

## Hanoi Tower

```python
def hanoi(n, _from, _by, _to): #n은 쟁반 갯수
    #base case
    if n==1:
        print(f'{n}번째 쟁반을 {_from}에서 {_to}로 이동')
        return
    
    hanoi(n-1, _from, _to, _by)
    print(f'{n}번째 쟁반을 {_from}에서 {_to}로 이동')
    hanoi(n-1, _by, _from, _to)

hanoi(2, 'A', 'B', 'C')

# result
# 1번째 쟁반을 A에서 B로 이동
# 2번째 쟁반을 A에서 C로 이동
# 1번째 쟁반을 B에서 C로 이동
```

## 버블정렬(Bubble sort)

**예제**
- for, while 사용하지 않고
- 1 ~ 10,000,000의 합을 구해라
- 재귀
	- factorial* -> +
	- summation
	- sum(n) = sum(n-1) + n

    ```python
    def sumation(n):
        if n==1:
            return 1
        return sumation(n-1)+n
    ```
    ```python
    def sumation2(n):
        return n*(1+n)//2
    ```

## 리누스 토발즈 영상을 통해 알 수 있는 알고리즘의 필요성
<iframe width="560" height="315" src="https://www.youtube.com/embed/8zhxD563uCw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Class
- class가 붕어빵 틀이라면,
- instance는 붕어빵

## 절차지향
- 함수 -> 함수 시그니처
- 함수는 기능을 모아둔 단위
- 함수는 추상화의 도구

## 객체지향
- 객체(object) -> 추상화 도구
- 객체는 관련이 있는 변수(상태정보, 특성값)와 함수(기능)가 합쳐진 것
- 예제(계좌)

```python
class Account:
    # 생성자(constructor)
    # 객체를 생성활 때 "반드시" 한번 호출한다.
    def __init__(self, cust_name, init_balance):
        # 인스턴스 멤버(속성, 데이터, 변수)를 설정
        self.name=cust_name
        self.balance=init_balance
        
    # 소멸자(destructor)
    # 객체가 소멸될 때 "반드시" 한번 호출
    def __del__(self):
        pass
    
    # 인스턴트 메서드(기능, 행동)
    def deposit(self, money):
        if money < 0:
            return False
        
        # 관련 있는 변수: 인스턴스 멤버
        self.balance+=money
        return True
    
    def withdraw(self, money):
        if money > self.balance:
            return 0
        
        self.balance -= money
        return money
    
    def transfer(self, other, money):
        self.balance -= money
        # 다른 객체의 멤버에 바로 접근하지 않는다.
        # 다른 객체의 멤버값을 변경할 때는
        # 반드시 상대 객체가 가진 메서드에 맡겨야 한다.
        # 이것을 메시지 패싱이라고 한다.
        other.deposit(money)

# 메서드 호출
my_acnt=Account('Greg', 5000) 
```

## Information Hiding
- 접근 제어자
- C, C++은 접근차단 가능
- python은 불가능

## Network
- OSI 7 계층
- TCP/IP
- 랜카드의 공식명은 NIC(network interface card)
- NIC 고유의 (물리적)주소가 MAC address

## LAN / WAN
- LAN(local area network)
	- 서로의 MAC주소를 안다면 라우터를 거치지 않고서도 PC끼리 통신 가능
	- MTU: 한 번에 보낼 수 있는 데이터 허용량(1500 bytes)
	- $ ifconfig -> NIC 확인 가능

- WAN(wide area network)
	- 광범위한 지역 단위로 구성하는 네트워크
	- LAN과 LAN을 잇는다.


## TCP/IP
- TCP(전송제어프로토콜, Transmission Control Protocol)
- IP(인터넷프로토콜, Internet Protocol)
- TCP/IP 4계층 아래 이미지 참고
<img src="/images/arp.jpg">

## ARP
- 주소 결정 프로토콜(Address Resolution Protocol, ARP)은 네트워크 상에서 IP 주소를 물리적 네트워크 주소로 대응(bind)시키기 위해 사용되는 프로토콜이다. 여기서 물리적 네트워크 주소는 이더넷 또는 토큰링의 48 비트 네트워크 카드 주소를 뜻한다. (출처: [위키백과](https://ko.wikipedia.org/wiki/%EC%A3%BC%EC%86%8C_%EA%B2%B0%EC%A0%95_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)

## IP(Internet Protocal)
- 1byte 정수(0~255)로 이루어져 있음
- 클래스

## 서브넷 
- Host IP에 할당된 비트를 쪼갠 것이 서브넷
- [참고자료 1](https://ko.wikipedia.org/wiki/%EB%B6%80%EB%B6%84%EB%A7%9D)
- [참고자료 2](https://support.microsoft.com/ko-kr/help/164015/understanding-tcp-ip-addressing-and-subnetting-basics)

## Public IP / Private IP
- 내용 추가 예정

***

## 알고리즘
### sorting
- 단순 알고리즘 (비교정렬, comparison sorting)
	- bubble sort
	- insertion sort
	- selection sort

- 분할 정복 기법(Divide & Conquer) : 어려운 문제를 잘게 쪼개서, 작게 쪼개진 문제를 하나씩 해결함으로써 작은 solution이 모여서 전체 문제에 대한 solution을 구하는 기법
	- quick sort
		- pivot은 해당 index의 값, 그 자체
	- merge sort
	- heap sort

### quick sort 예제

```python
def quick_sort(li, start, end):
    # base case
    # to do
    if start >= end:
        return
    
    left=start
    right=end
    pivot=li[(left+right)//2]
    
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
    quick_sort(li, end, left)
    

#test code

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

### 아래 영상 참고할 것
<iframe width="560" height="315" src="https://www.youtube.com/embed/WaNLJf8xzC4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
