---
title: "CS Study 08"
date: "2020-06-23"
update: "2020-06-23"
draft: false
category: "Computer Science"
path: "/blog/computer-science-08"
---

## Merge sort

```python
def merge(li, start, mid, end):
    merged=[]
    left=start
    right=mid+1
    while left <= mid and right <= end:
        if li[left] < li[right]:
            merged.append(li[left])
            left+=1
        else:
            merged.append(li[right])
            right+=1
            
    while left <= mid:
        merged.append(li[left])
        left+=1
        
    while right <= end:
        merged.append(li[right])
        right+=1
        
    li[start : end+1]=merged
    
#     또는 아래의 코드
#     for idx in range(start, end):
#         li[idx]=merged.pop(0)

def merge_sort(li, start, end):
    # 기저조건
    if start >= end:
        return
    
    mid=(start+end)//2
    merge_sort(li, start, mid)
    merge_sort(li, mid+1, end)
    
    merge(li, start, mid, end)

# TEST
import random
while True:
    num_data=int(input('데이터 개수(종료:0):'))
    if not num_data:
        break
    data=[random.randint(1, 100) for _ in range(num_data)]
    print(data)
    merge_sort(data, 0, len(data)-1)
    print(data)
```
- 참고: [합병 정렬 - 위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/%ED%95%A9%EB%B3%91_%EC%A0%95%EB%A0%AC#/media/File:Merge-sort-example-300px.gif)


## 영상 추천
- [MIT OpenCourseWare - YouTube](https://www.youtube.com/user/MIT)


## ADT(추상 자료형, Abstract Data Type)
- 자료구조의 인터페이스(함수 시그니처, 오퍼레이션)를 명시해 놓은 것. 기능명세.
- 구체적인 구현 설명이 들어가면 안 된다. 
- 구현 방법은 크게 3가지
	1. 배열
	2. 연결리스트
	3. 파이썬의 리스트(어댑터) -> 스택

## Stack
- LIFO(후입선출/선입후출, Last In, First Out)
	- 쌓여있는 접시를 꺼내는 이미지로 생각하면 쉬움.
	- stack ADT 참고

```python
# adapter pattern
class Stack:
    def __init__(self):
        self.container=list()
        
    def empty(self):
        if not self.container:
            return True
        return False
    
    def push(self, data):
        self.container.append(data)
    
    # 래퍼 함수(wrapper function)
    def pop(self):
        return self.container.pop()
    
    def peek(self):
        return self.container[-1]

stack=Stack()

stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)
stack.push(5)

while not stack.empty():
    print(stack.pop())
```

### 스택으로 꼭 해봐야 할 것
1. 후위 표기법 계산기
2. 미로찾기

## Queue
- FIFO(선입선출, First In, First Out)
- ADT 참고

```python
# adapter pattern
class Queue:
    def __init__(self):
        self.container=list()
        
    def empty(self):
        if not self.container:
            return True
        return False
    
    def enqueue(self, data):
        self.container.append(data)
    
    # 래퍼 함수(wrapper function)
    def dequeue(self):
        return self.container.pop(0)
    
    def peek(self):
        return self.container[0]

q=Queue()
for i in range(1, 6):
    q.enqueue(i)

while not q.empty():
    print(q.dequeue())
```

### 문제: 스택 두 개를 이용해서 큐를 구현하라!

```python
# 스택
class Stack:
    def __init__(self):
        self.container=list()
        
    def empty(self):
        if not self.container:
            return True
        return False
    
    def push(self, data):
        self.container.append(data)
    
    # 래퍼 함수(wrapper function)
    def pop(self):
        return self.container.pop()
    
    def peek(self):
        return self.container[-1]

# 큐
class Queue:
    def __init__(self):
        self.first=Stack()
        self.second=Stack()
        
    def empty(self):
        if self.first.empty() and self.second.empty():
            return True
        return False
    
    def enqueue(self, deta):
        self.first.push(data)
    
    def dequeue(self):
        if self.empty():
            return None
        
        # first에서 second로 옮기는 시점이 중요
        # second가 비었을 때
        if self.second.empty():
            while not self.first.empty():
                self.second.push(self.first.pop())
            
        return self.second.pop()

q=Queue()
q.enqueue(1)
q.enqueue(2)
q.enqueue(3)

print(q.dequeue())

q.enqueue(4)
q.enqueue(5)

while not q.empty():
    print(q.dequeue())
```

## 연결리스트(Linked List)
- 싱글 링크드 리스트와 더블 링크드 리스트가 있음.
- 더블 링크드 리스트
	- 더미 더블 링크드 리스트

## 노드(Node)
- 링크드 리스트에 데이터와 데이터를 잇는 지점
- 더미 노드: 데이터가 없는 노드, 구현 편의성(프로그래머의 실수를 줄임)을 높이기 위해 사용

## Node Add

```python
class DLinkedList:
    def __init__(self):
        self.head=Node()
        self.tail=Node()
        self.d_size=0
        
        self.head.next=self.tail
        self.tail.prev=self.head
        
    def empty(self):
        if self.d_size==0:
            return True
        return False
    
    def size(self):
        return self.d_size
    
    def add_first(self, data):
        # 새로운 노드를 만들었다.
        new_node=Node(data)
        
        # new_node 기준으로 연결
        new_node.prev=self.head
        new_node.next=self.head.next
        
        self.head.next.prev=new_node
        self.head.next=new_node
        
        self.d_size+=1
        
    def add_last(self, data):
        new_node=Node(data)
        
        new_node.next=self.tail
        new_node.prev=self.tail.prev
        
        self.tail.prev.next=new_node
        self.tail.prev=new_node
        
        self.d_size+=1
```

## Node Insert

```python
class DLinkedList:
    def __init__(self):
        self.head=Node()
        self.tail=Node()
        self.d_size=0
        
        self.head.next=self.tail
        self.tail.prev=self.head
        
    def empty(self):
        if self.d_size==0:
            return True
        return False
    
    def size(self):
        return self.d_size 

	  def insert_after(self, data, node):
        new_node=Node(data)
        
        new_node.prev=node
        new_node.next=node.next
        
        node.next.prev=new_node
        node.next=new_node
        
        self.d_size+=1
    
    def insert_before(self, data, node):
        new_node=Node(data)
        
        new_node.next=node
        new_node.prev=node.prev
        
        node.prev.next=new_node
        node.prev=new_node
        
        self.d_size+=1
```

## Node Search
- 순회 방식(Traversal)
- 더미 노드 다음/이전(head.next / tail.prev)에서 시작

```python
class DLinkedList:
    def __init__(self):
        self.head=Node()
        self.tail=Node()
        self.d_size=0
        
        self.head.next=self.tail
        self.tail.prev=self.head
        
    def empty(self):
        if self.d_size==0:
            return True
        return False
    
    def size(self):
        return self.d_size

    def search_forward(self, target):
        cur=self.head.next
        
        while cur is not self.tail:
            if cur.data==target:
                return cur
            cur=cur.next
            
        return None
    
    def search_backward(self, target):
        cur=self.tail.prev
        
        while cur is not self.head:
            if cur.data==target:
                return cur
            cur=cur.prev
            
        return None

    # 제너레이터
def show_list(dlist):
    cur=dlist.head.next
    while cur is not dlist.tail:
        yield cur.data
        cur=cur.next

# TEST
li=DLinkedList()

li.add_first(1)
li.add_first(2)
li.add_last(3)

def show(li):
    for elem in show_list(li):
        print(elem, end=' ')

# search data test
li.add_last(4)
li.add_last(3)

searched_node=li.search_forward(3)

if searched_node:
    print(searched_node.data)
else:
    print('there is no such data')

node=li.search_forward(3)
if node:
    li.insert_after(10, node)

show(li)
```

## Node Delete
### Reference Count

- 참조 갯수
- a=10 일 때 10(value)을 기준으로 ref count는 1
- b=a,  c=b라고 한다면, ref count는 3
- garbage collection을 이루는 것들 중 하나

```python
class Node:
    def __init__(self, data=None):
        self.prev=None
        self.data=data
        self.next=None
        
    # 객체가 소멸될 때
    # 반드시 한 번 호출되는 소멸자
    def __del__(self):
        print(f'{self.data} is deleted')

class DLinkedList:
    def __init__(self):
        self.head=Node()
        self.tail=Node()
        self.d_size=0
        
        self.head.next=self.tail
        self.tail.prev=self.head
        
    def empty(self):
        if self.d_size==0:
            return True
        return False
    
    def size(self):
        return self.d_size
   
 def delete_first(self):
        if self.empty():
            return
        
        self.head.next=self.head.next.next
        self.head.next.prev=self.head
        
        self.d_size-=1
    
    def delete_last(self):
        if self.empty():
            return
        
        self.tail.prev=self.tail.prev.prev
        self.tail.prev.next=self.tail
        
        self.d_size-=1
    
    def delete_node(self, node):
        node.prev.next=node.next
        node.next.prev=node.prev
        
        self.d_size-=1

    # 제너레이터
def show_list(dlist):
    cur=dlist.head.next
    while cur is not dlist.tail:
        yield cur.data
        cur=cur.next

# Test
li.delete_first()
li.delete_last()
li.delete_node(li.search_backward(10))
```

## 추가로 공부해야 할 것들
### 배열과 연결리스트

- 배열
	- 검색(인덱싱)이 빠르다는 것이 배열의 장점, O(1)
	- 데이터를 insert할 때 O(n) - 단점
	- 데이터를 delete할 때도 O(n) - 단점

- 연결리스트
	- 검색이 느림, O(n) - 단점
	- insert - O(1) - 장점
	- delete - O(1) - 장점

### 선형 자료구조
- Linked List
- Stack
- Queue

### 비선형 자료구조
- Tree(이진트리)
	- 순회(traversal)
		- 전위(preorder) - stack
		- 중위(inorder) - stack. -> DFS -> 재귀(스택트레인)로 구현, 반복문으로 스택
		- 후위(postorder) - stack
		- 레벨 순서(level order) - queue -> BFS

- BST(Binary Search Tree)
	- O(n**2) -> search
	
- 균형이진트리(Balanced Self Balancing)
	- AVL Tree
	- Red-Black Tree

- B-Tree(데이터베이스 인덱스)
	- 균형이진트리 + 하드웨어 아키텍처

- Heap(완전이진트리, 배열)

### Hash Table(map)
- heath function
- collision(충돌)
	- chaining
	- open-addressing 기법

### Graph
- 순회(traversal)
	- DFS -> 깊이 우선 탐색 - 스택 기반
	- BFS -> 너비 우선 탐색 - 큐 기반

- MST
	- 최소신장트리(minimum spanning tree)
	- greedy algorithm 기반
	- kruslcal algorithm
	- prim algorithm

- 최단 경로 문제(shortest path)
	- Dijkstra algorithm -> greedy algorithm
	- Bellman-ford algorithm
	- flood-warshall algorithm -> dynamic programming