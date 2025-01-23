---
title: "CS Study 05"
date: "2020-06-20"
update: "2020-06-20"
draft: false
category: "Computer Science"
path: "/blog/computer-science-05"
---

## 금일 학습 진행 순서
0. Binary search, big O
1. Compiler vs interpreter
2. Process / thread -> multi thread -> race condition -> mural exclubion
3. 절차지향
4. OOP
5. Network
6. 알고리즘/자료구조

## Binary Search
- 데이터가 정렬되어 있어야 함(필수)

```python
def binary_search(li, target):
    start=0
    end=len(li)-1
    while start <= end:
        mid=(start+end)//2
        if target == li[mid]:
            return mid
        elif target < li[mid]:
            end=mid-1
        elif target > li[mid]:
            start=mid+1
    return None

li=[1, 3, 5, 7, 9, 15, 17]
target = 7
binary_search(li, target)
```

- linear search : T(n) = n
- binary search : T(n) = log<sub>2</sub>n

- 아래의 영상을 이해할 수 있다면 BEST

<iframe width="560" height="315" src="https://www.youtube.com/embed/kPR8h4-qZdk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Big-O 시간 복잡도 랭킹
1. O(1) : constant time(상수시간)
    - 입력값 n이 주어졌을 때, 알고리즘이 문제를 해결하는데 오직 한 단계만 거침

2. O(log n) : log time(로그시간)
    - 입력값 n이 주어졌을 때, 문제를 해결하는데 필요한 단계들이 연산마다 특정 요인에 의해 줄어듭니다.
    - ex) BST(insert/search/delete)

3. O(n) : linear time(선형시간, 직선적 시간)
    - 문제를 해결하기 위한 단계의 수와 입력값 n이 1:1 관계를 가집니다.

4. O(n log n) : log linear time(선형 로그 시간)
    - ex) quick sort, merge sort
    - 비교정렬(comparison sorting)의 경우 O(n log n)보다 성능이 좋을 수 없음.

5. O(n<sup>2</sup>) : quadratic time(2차 시간)
    - 문제를 해결하기 위한 단계의 수는 입력값 n의 제곱입니다.

6. O(n<sup>3</sup>) : cubic time

7. O(2<sup>n</sup>) : exponential time

##  OS
1. Job scheduling 
	- scheduler -> context switching
	- process status(프로세스 상태) -> thread -> multithreading
        **참고 페이지**
		- 프로세스(https://ko.wikipedia.org/wiki/%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4)
		- [운영 체제 - 위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/%EC%9A%B4%EC%98%81_%EC%B2%B4%EC%A0%9C)
		- [Scheduling Priorities - Windows applications | Microsoft Docs](https://docs.microsoft.com/en-us/windows/desktop/procthread/scheduling-priorities)
		- [Scheduler -3- (Preemption & Context Switch) – 문c 블로그](http://jake.dothome.co.kr/preemption/)
		- 선점형(새치기, pre-emptive) 스케쥴링 / 비선점형(non-preemptive) 스케쥴링
		- pre-emptive -> multitasking
			1. Priority algorithm
			2. Round-Robin algorithm -> 정해진 시간 동안 실행
				- time slice / quantum

2. Concurrency programming(동시성 프로그래밍)
	- 논리적인 용어로 동시에 실행되는 것처럼 보이는 것입니다. 싱글 코어(멀티 코어에서도 가능)에서 멀티스레드를 동작시키기 위한 방식으로 멀티 태스킹을 위해 여러 개의 스레드가 번갈아 가면서 실행되는 방식입니다. 동시성을 이용한 싱글 코어의 멀티 태스킹은 각 스레드들이 병렬적으로 실행되는 것처럼 보이지만 사실은 서로 번갈아 가면서 실행되고 있는 방식입니다. (출처: [1) 동시성 프로그래밍과 비동기 프로그래밍 > 부스트코스 iOS 프로그래밍 : edwith](https://www.edwith.org/boostcourse-ios/lecture/16866/))
	- 과거엔 주로 multithreading
	- race-condition / dead-lock
	- ::Asynchronous I/O -> IO Bound -> javascript 핵심개념 꼭 공부할 것!::
		- 프로그램의 주 실행 흐름을 멈추어서 기다리는 부분 없이 바로 다음 작업을 실행할 수 있게 하는 방식입니다. 즉, 코드의 실행 결과 처리를 별도의 공간에 맡겨둔 뒤 결과를 기다리지 않고 바로 다음 코드를 실행하는 병렬처리 방식입니다. 비동기 프로그래밍은 언어 및 프레임워크에서 지원하는 여러 방법으로 구현할 수 있습니다.(출처: [1) 동시성 프로그래밍과 비동기 프로그래밍 > 부스트코스 iOS 프로그래밍 : edwith](https://www.edwith.org/boostcourse-ios/lecture/16866/))

## program
- **하드디스크**에 저장되어 있는 하나의 이미지(code, data)

## process
- **메인 메모리**에 올라와서 실행을 시작한 프로그램
- 실행된 프로그램마다 P(process)ID 발급
- 프로세서는 하드웨어적인 측면에서 컴퓨터 내에서 프로그램을 수행하는 하드웨어 유닛입니다. 대표적으로 중앙처리장치(Central Processing Unit - CPU)가 이에 속합니다. 한 컴퓨터가 여러 개의 프로세서를 갖는다면 멀티 프로세서라고 말합니다. 듀얼 프로세서라고 한다면 한 컴퓨터에 두 개의 프로세서가 운용된다고 할 수 있습니다. (출처:  [https://www.edwith.org/boostcourse-ios/lecture/16866/](https://www.edwith.org/boostcourse-ios/lecture/16866/) )

## 프로그램과 프로세스
- 프로그램은 일반적으로 보조기억 장치에 저장된 실행코드 즉, 생명이 없는 상태를 말합니다. 프로세스는 프로그램을 구동하여 프로그램 자체와 프로그램의 상태가 메모리상에서 실행되는 작업 단위를 말합니다. 동시에 여러 개의 프로세스를 운용하는 시분할 방식을 멀티태스킹이라고 합니다. 이러한 프로세스 관리는 운영체제에서 담당합니다. (출처: [1) 동시성 프로그래밍과 비동기 프로그래밍 > 부스트코스 iOS 프로그래밍 : edwith](https://www.edwith.org/boostcourse-ios/lecture/16866/))

## Context Switching
- instruction 
- PCB(process controls block)
- context switching은 느려서 자주 하면 안 좋지만, 안 할 수는 없음
- [문맥 교환 - 위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/%EB%AC%B8%EB%A7%A5_%EA%B5%90%ED%99%98)
- [Process (computing) - Wikipedia](https://en.wikipedia.org/wiki/Process_(computing))

## Process vs Thread
- Process
	- 실행흐름

- Thread
	- 스레드는 하나의 프로세스 내에서 실행되는 작업흐름의 단위를 말합니다. 보통 한 프로세스는 하나의 스레드를 가지고 있지만, 프로세스 환경에 따라 둘 이상의 스레드를 동시에 실행할 수 있습니다. 이러한 방식을 멀티스레딩이라고 합니다. 그리고 프로그램 실행이 시작될 때부터 동작하는 스레드를 메인 스레드라 하고 그 외에 나중에 생성된 스레드를 서브 스레드 또는 세컨더리 스레드라고 합니다. (출처: [1) 동시성 프로그래밍과 비동기 프로그래밍 > 부스트코스 iOS 프로그래밍 : edwith](https://www.edwith.org/boostcourse-ios/lecture/16866/))
	- 인스트럭션의 나열
	- process에 포함됨                    
	- GIL(global interpreter lock)
	- multi-thread exam

```python
import threading

n=1000
offset=n//4

def thread_main(li, i):
    for idx in range(offset i, offset(1+1)):
        li[idx]=2
        
li=[i for i in range(1, 1001)]
threads=[]

#스레드를 생성
for i in range(4):
    th=threading.Thread(
        target=thread_main, args=(li, i))
    threads.append(th)

#멀티스레딩
for th in threads:
    th.start()

#메인 스레드에서 나머지 스레드들이 모든 실행을 끝날 때까지 기다림.
for th in threads:
    th.join()

print(li)
```
	
- 동시성(Concurrency) 프로그래밍/ 병렬(Parallelism) 프로그래밍
	- 둘은 다른 개념
	- 동시성 프로그래밍은 하드웨어적으로도 나누어져야 함
  
- 공유자원(shared resource)에 같이 접근하면 멀티스레딩의 효율(race condition)이 좋지 않음
- 공유자원 대표적인 건 ‘전역 변수’ 
- race-condition exam

```python
import threading

# 공유 자원
# 모든 스레드에서 접근이 가능한 자원
# 전역 변수
g_num=0
# Lock 객체
lock=threading.Lock()

def thread_main():
    global g_num

    # critical section
    # 임계 영역
    # 어떤 스레드에서 공유 자원에 접근한 후
    # 수정, 변경 하려는 코드
    lock.acquire()
    for _ in range(1000000):
        g_num+=1
    lock.release()

threads=[]

for _ in range(50):
            th=threading.Thread(target=thread_main)
            threads.append(th)

for th in threads:
    th.start()

for th in threads:
    th.join()

print(g_num)
```

## 재귀함수(Recursion)
- 함수 호출 도중에 자기 자신을 다시 호출하는 것
- base case(기저 조건, 종료 조건, 탈출 조건)

```python
def func(n):
    # base case
    if n <= 0:
        return
    func(n-1)

func(5)
```

## 재귀함수를 만드는 방법
- 패턴을 찾는다 -> 점화식을 만든다!
- 기저 조건을 만든다

**예제**
- factorial(계승) : `3! = 3 * 2 * 1 = 3 * 2!`
- 점화식: `fac(n) = fac(n-1) * n`
- 기저조건: `n==1 or n==0 return 1`

```python
def factorial(n):
    if n==0 or n==1:
        return 1
    
    return factorial(n-1) * n

for i in range(1, 6):
    print(factorial(i))
```

## 피보나치 수열(Fibonacci Series)

**예제**
- 점화식: `fibo(n-2)+fibo(n-1)`
- 기저조건: `if n==1 then 0` / `if n==2 then 1`

```python
def fibonacci(n):
    if n==1:
        return 0
    elif n==2:
        return 1
    return fibonacci(n-2) + fibonacci(n-1)

for i in range(1, 11):
    print(fibonacci(i), end=' ')
```

***

**참고:**
- [시간 복잡도 - 위키백과](https://ko.wikipedia.org/wiki/%EC%8B%9C%EA%B0%84_%EB%B3%B5%EC%9E%A1%EB%8F%84)
