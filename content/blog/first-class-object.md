---
title: "자바스크립트의 함수는 1급 객체"
date: "2020-06-06"
update: "2020-06-06"
draft: false
category: "JavaScript"
path: "/blog/first-class-object"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 1급 객체란
특정 언어의 **일급 객체** \(first-class citizens, 일급 값, 일급 엔티티, 혹은 일급 시민\)이라 함은 컴퓨터 프로그래밍 언어 디자인에서 일반적으로 다른 객체들에 적용 가능한 연산을 모두 지원하는 객체를 가리킨다. 함수에 매개변수로 넘기기, 변수에 대입하기와 같은 연산들이 여기서 말하는 **일반적인** 연산의 예에 해당한다.
직관적으로 설명하자면, Function 이면서 Class의 성질인 지닌 객체 또는 Class이면서 Function의 성질을 지닌 객체를 First-Class Citizens 라고 이해할 수 있다.
JavaScript 에서 Function에 Property를 줄 수 있는 것이 대표적인 예이다.

위의 내용이 위키백과에서 말하는 1급 객체의 설명이다.

## 내가 이해한 1급 객체
우선 자바스크립트에서 대표적인 1급 객체로 취급 받는 함수(Function)는 다음과 같은 특성을 지니고 있기에 1급 객체라고 한다.

- 무명의 리터럴로 생성이 가능하다. 따라서 런타임에 생성이 가능하다.
- 변수 혹은 객체나 배열 등의 자료구조에 저장이 가능하다.
- 함수의 매개변수(parameter)에 전달이 가능하다.
- 함수의 반환값(return)으로 사용이 가능하다.

```js
/*
1. 무명의 리터럴로 생성이 가능하다.
2. 변수나 자료구조에 저장이 가능하다.
-> 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당 된다.
*/
const getBeer = function (num) {
  return ++num;
};

const loseBeer = function (num) {
  return --num;
};

// 함수 객체를 객체에 저장할 수 있다.
const myBeer = { getBeer, loseBeer };

// 3. 함수의 매개변수에 전달이 가능하다.
// 4. 함수의 반환값으로 사용이 가능하다.
function myBeerCounter(myBeer) {
  let num = 0;

  return function () {
    num = myBeer(num);
    return num;
  };
}

// myBeerCounter의 매개변수에 함수 객체를 전달
const getBeerCounter = myBeerCounter(myBeer.getBeer);
console.log(getBeerCounter()); // 1
console.log(getBeerCounter()); // 2

// myBeerCounter의 매개변수에 함수 객체를 전달
const loseBeerCounter = myBeerCounter(myBeer.loseBeer);
console.log(loseBeerCounter()); // -1
console.log(loseBeerCounter()); // -2
```

이처럼 자바스크립트의 함수는 마치 1급 시민권을 소유한 시민이 자유와 특권을 갖고 있듯 여타 객체들에 비해 관여할 수 있는 범위가 넓다. 활용하기에 따라 무궁무진한 결과를 만들어낼 수 있는 강력한 기능인 함수이기 때문에 최근 **함수형 프로그래밍** 이 각광 받는 게 아닐까 싶다. 배워야 할 것들이 너무나 많아서 행복하다(?).

**참고:**
  - [Javascript에서 왜 함수가 1급 객체일까요? – Sona Lee – Medium](https://medium.com/@soeunlee/javascript%EC%97%90%EC%84%9C-%EC%99%9C-%ED%95%A8%EC%88%98%EA%B0%80-1%EA%B8%89-%EA%B0%9D%EC%B2%B4%EC%9D%BC%EA%B9%8C%EC%9A%94-cc6bd2a9ecac)
  - [위키피디아 | 일급 객체](https://ko.wikipedia.org/wiki/%EC%9D%BC%EA%B8%89_%EA%B0%9D%EC%B2%B4)