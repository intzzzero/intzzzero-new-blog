---
title: "원본 배열을 수정하는 배열 메서드"
date: "2020-06-12"
update: "2020-06-12"
draft: false
category: "JavaScript"
path: "/blog/array-method-modify-original"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 수정 메서드

배열 메서드는 크게 세 종류로 나눈다.

- **수정 메서드** : 원본 배열을 수정함
- **접근자 메서드** : 배열에 접근하여 새로운 배열을 반환
- **반복 메서드** : 배열의 요소들을 순회하며 작업을 수행

이번 시간에는 주요 수정 메서드들을 살펴본다.

## push

`push()`는 배열 마지막에 새로운 요소를 추가한다.

```js
let fruits = [‘apple’, ‘banana’, ‘melon’, ‘peach’, ‘blueberry’];

fruits.push(‘pineapple’);
console.log(fruits);
// ["apple", "banana", "melon", "peach", "blueberry", "pineapple"]
```

## pop

`pop()`은 배열 마지막 요소를 제거한다.

```js
let fruits = [‘apple’, ‘banana’, ‘melon’, ‘peach’, ‘blueberry’];

fruits.pop();
console.log(fruits);
// ["apple", "banana", "melon", "peach"]
```

## shift

`shift()`는 배열 맨 앞의 요소를 제거한 후 모든 요소를 왼쪽으로 이동 시킨다.

```js
let fruits = [‘apple’, ‘banana’, ‘melon’, ‘peach’, ‘blueberry’];

fruits.shift();
console.log(fruits);
// [‘banana’, ‘melon’, ‘peach’, ‘blueberry’]
```

## unshift

`unshift()`는 배열 맨 앞에 새로운 요소를 추가하며 기존의 요소들을 오른쪽으로 이동 시킨다.

```js
let fruits = [‘apple’, ‘banana’, ‘melon’, ‘peach’, ‘blueberry’];

fruits.unshift(‘pineapple’);
console.log(fruits);
// [‘pineapple’, ‘apple’, ‘banana’, ‘melon’, ‘peach’, ‘blueberry’]
```

## splice

`splice`는 전달하는 인자 개수에 따라 특정 위치에 요소를 추가, 삭제, 교체할 수 있다.
**`splice\(시작 인덱스, 시작 인덱스부터 요소의 개수, 추가할 요소\)`**

```js
let fruits = [‘apple’, ‘banana’, ‘melon’, ‘peach’, ‘blueberry’];

// 인덱스 1부터 2개의 요소를 제거하고, ‘lemon’과 ‘grape’를 추가
fruits.splice(1, 2, ‘lemon’, ‘grape’);
console.log(fruits);
// ["apple", "lemon", "grape", "peach", "blueberry"]

// 첫 번째 인수만 넘기면 해당 인덱스 이후의 요소 모두 제거
fruits.splice(2);
console.log(fruits);
// ["apple", "lemon"]

// 두 번째 인수에 0을 넘기면 제거 없이 새로운 요소만 추가
fruits.splice(1, 0, ‘cherry’);
console.log(fruits);
// [“apple", "cherry", "lemon"]
```

## sort

`sort()`는 배열 요소를 정렬할 때 사용한다. 비교함수를 넣어야 인접한 두 개 의 요소를 비교하여 정렬을 하며, 정렬 방식은 다음과 같다.

- f(a, b) < 0 이면 a를 b보다 작은 인덱스로 정렬
- f(a, b) == 0 이면 a와 b의 순서 그대로 둠
- f(a, b) > 0 이면 b를 a보다 작은 인덱스로 정렬

```js
let numbers = [4, 6, 8, 1, 15, 3, 36, 2, 51, 7, 19, 24];

numbers.sort(function(a, b) { return a - b; });
console.log(numbers); 
// [1, 2, 3, 4, 6, 7, 8, 15, 19, 24, 36, 51]
```

비교함수를 지정하지 않으면 요소를 문자열로 변환하여 사전순(abc)으로 정렬한다.

```js
let fruits = [‘apple’, ‘banana’, ‘melon’, ‘peach’, ‘blueberry’];

fruits.sort();
console.log(fruits); 
// ["apple", "banana", "blueberry", "melon", "peach"]
```

**참고:**
  - [배열과 메서드](https://ko.javascript.info/array-methods)