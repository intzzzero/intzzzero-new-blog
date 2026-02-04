---
title: "Data Structure - Array"
date: "2020-06-08"
update: "2020-06-08"
draft: false
category: "Computer Science"
path: "/blog/data-structure-array"
---

## 자료구조란?
자료구조(Data Structure)는 데이터를 보다 효율적으로 저장하고 조작하기 위한 방법이다. 자료구조에는 다양한 종류가 존재하며, 데이터의 크기나 용도에 따라 적합한 자료구조는 천차만별이다. 따라서 각 자료구조의 특징을 바로알고 적재적소에 활용하는 것이 중요하다.

![Linus Torvalds](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.WqjgGOFI28G9BuDGaZOEWQHaEF%26pid%3DApi&f=1)
  > “코딩은 알고리즘과 자료구조, 이 두 가지로 이루어진다”
  > -Linus Torvalds-

## 자료구조의 분류
![data structure diagram](https://cdn.ttgtmedia.com/rms/onlineimages/whatis-data_structure.png)

자료구조는 크게 두 갈래로 나눌 수가 있다. **단순 구조\(Primitive Data Structure\)** 와 **비단순 구조\(None-Primitive Data Structure\)** 가 바로 그것이다. 
단순 구조에는 Integer, Float, String, Boolean 등의 기본 데이터 타입들이 존재하며, 비단순 구조에는 Array, List, Tuple, Dictionary, Set, File 등이 존재한다. 그리고, 비단순 구조에서도 List는 다시 두 종류로 나뉘는데, Stack과 Queue로 이루어진 Linear(선형 구조)와 Graph, Tree로 이루어진 Non-linear(비선형 구조)로 나누어진다.

## Array(List)
Array는 다양한 곳에서 가장 흔하게 사용되는 자료구조로써 다음과 같은 특징들을 갖는다.

![array](https://codeforwin.org/wp-content/uploads/2015/07/array-and-array-index-representation.png)

- 데이터를 순서대로 저장하며 각 데이터는 INDEX를 갖는다.
- INDEX를 통해 특정 요소에 직접 접근이 가능하다.
- 데이터의 수정 및 삭제가 가능하다.
- INDEX는 0부터 시작하며, INDEX -1은 마지막 요소를 가리킨다.

위와 같이 사용하기에 따라 상당히 유용할 것 같은 특징들을 많이 갖고 있는 Array지만, 가능하다고 해서 꼭 좋은 것만은 아니다. Array는 항상 순차적인 INDEX를 가져야만 하기 때문에 맨 끝이 아닌 곳에 위치한 요소를 조작하는 경우에는 해당 요소 뒤쪽의 모든 요소들까지 영향을 받게 되고, 이는 결국 불필요한 리소스 낭비로 이어진다. 자바스크립트의 메서드로 예를 들자면, `push()`와 `pop()`에 비해 `unshift()`와 `shift()`, `slice()` 등의 메서드의 소요 리소스가 훨씬 크다는 것이다.
**따라서 Array에 담는 데이터로 추가 및 삭제가 빈번한 데이터는 적절치 않다.**
