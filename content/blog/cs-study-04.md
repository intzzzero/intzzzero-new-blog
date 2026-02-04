---
title: "CS Study 04"
date: "2020-06-19"
update: "2020-06-19"
draft: false
category: "Computer Science"
path: "/blog/computer-science-04"
---

## 함수
- Namespace : 변수가 출력될 때 본인과 가까운 순서로 실행되며 그 영역을 namespace라고 함. 변수가 저장된 공간.

```python
a=10
def f():
    t=10
    def g():
        b=20
        def h():
            nonlocal b #다른 지역 변수 b를 선택
            b=30
            print(b,'in h')
        h()
        print(b, 'in g')
    g()
f()
```

- Stack frame: 함수가 실행될 때 쌓이는 메모리 공간(자바스크립트의 call stack)

## 인자 전달 방식에 따른 함수의 구분
- call by value  :  값을 가져와서 스택을 쌓음. 스택 밖으로 넘어갈 수는 없음.
- call by reference  : 주소값을 가져와서(참조하여) 스택을 쌓음. 스택을 넘어서 값을 가져오거나 수정이 가능함.
- call by object reference
- immutable object는 함수 내부에서 값을 변경할 수 없다.

## First - Class Function
- 프로그래밍 언어 중 함수를 다른 변수와 동일하게 다루는 언어를 함수우선순위(First-class function)를 가졌다고 표현합니다. 예를 들어 함수를 다른 함수의 전달인자(Argument)로 사용하고, 함수에서 함수를 리턴하거나 변수의 값으로 함수를 할당할 수 있습니다.  

**출처**
- [First-class Function - 용어 사전 | MDN](https://developer.mozilla.org/ko/docs/Glossary/First-class_Function)

## First-Class function은…
- 함수를 인자(argument)로 전달
- 함수를 리턴(return) 값으로 전달
- 함수를 변수에 전달

## 익명 함수
- 이름이 없는 함수
- 몇 번 사용 안 할 때 주로 씀

```python
def func(a, b):
    return a + b

# 람다는 반드시 리턴이라서 return 생략
f = lambda a, b: a + b

li=[3, 2, 5, 6, 1, 8]
li2=li.copy()

li2.sort(reverse=True)

li2.sort(key=lambda x: x%2==2, reverse=True)
```

## list comprehension

```python
li2=[i*2 for i in range(1, 101)]
```

## map, filter, reduce
- lazy evaluation(게으른 연산)
- **map** : for와의 차이점은 연산의 실행 시점을 주도적으로 정할 수 있다는 점. 

```python
li=[1, 2, 3, 4]
m=map(lambda x: x**2, li)
next(m)
```

- **filter** : 기준을 정하여 원하는 값만 걸러냄

```python
li=[5, -4, 3, -2, 6]
f=filter(lambda x: x > 0, li)
next(f)
```

**filter와 map의 동시 사용 예시**

```python
li=[4, -2, 5, 3]
list(map(lambda x: x**2 ,filter(lambda x: x > 0, li)))
```

- **reduce**: 원하는 값이 나올 때까지 리스트를 줄여줌

```python
# 최대값 구하기
li=[5, 2, 7, 13, 2, 6, 10]
reduce(lambda a, b: a if a > b else b, li)
```

## 삼항 연산자(python)

```python
a=10
# 참일 때 값 if 조건문 else 거짓일 때 값
string='big' if a > 7 else 'small'
```

## 예제
```python
li=['a', 'b', 'c', 'd', 'a', 'a', 'a', 'b', 'c']

#result
#dic={'a' : 4, 'b' : 2, 'c' : 2, 'd' : 1}

#use
#dic.get()
#dic.update() or dic

reduce(lambda dic, ch: dic.update({ch : dic.get(ch, 0)+1}) or dic, li, {})
```

- reduce는 내장함수가 아니라서 `from functools import reduce`  추가해야 함

## 클로저(closure)
- 함수 내부에 상태 정보를 저장해두고, 함수 결과가 이 내부의 상태 정보에 따라 출력 결과가 달라짐.
- 일반적인 함수(function)은 하나의 input에 대해 하나의 output만을 가짐. 하지만 method, closure부터는 이 법칙이 깨짐.
- (과거에)OOP를 쓸 수 없을 때 울며 겨자 먹기로 썼다.

**지역변수\(local variable\)가 필요한 이유**
- 함수가 실행 도중에 결과 데이터를 저장하기 위해서
- 상태정보: 특정한 데이터의 현재 상태

**스택프레임\(stack frame\) 존재의 이유**
- 어떤 함수가 실행될 때 필요한 상태정보를 저장하기 위해
-> 상태정보는 지역변수가 지정

**계좌 클로저 함수**
- 상태값에 따라 결과값이 달라짐?

```python
def account(cus_name, balance):
    def inner(money):
        nonlocal balance
        balance+=money
        return cus_name, balance
    return inner

my_acnt = account('greg', 5000)
your_acnt = account('john', 300)

my_acnt(500)
#('greg', 5500)
your_acnt(500)
#('john', 800)
```

### 선형 탐색(Linear Search)

```python
li=[5, 4, 3, 1, 2, 10, 25]
target = 3
def linear_search(li, target):
    for idx in range(len(li)):
        if li[idx] == target:
            return idx
    return None
linear_search(li, target)
```

## 알고리즘 성능 평가
- 절대 시간  X 
- 상대 시간으로 측정: 연산 횟수, 최악의 경우
- 선형탐색의 소요 시간은 n에 바례

## 이진 탐색(Binary Search)
- 데이터가 정렬되어 있어야 함(필수)

```python
def binary_search(li, target):
    """
    binary_search(li, target) -> idx
    타겟을 찾았다면 인덱스 반환
    찾기 못 하면 None
    """
    pass
```
