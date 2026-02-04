---
title: "조건문의 조건"
date: "2020-05-29"
update: "2020-05-29"
draft: false
category: "JavaScript"
path: "/blog/boolean-statement"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 제어문(Control flow statement)
코드는 일반적으로 순차적으로 실행되지만,  제어문을 활용하면 인위적으로 순서를 제어할 수 있다. 사용하기에 따라 무척 편리한 기능이지만, 무분별한 남용은 코드의 가독성을 저하시키고 오류 발생의 원인이 되기도 한다.

### 자바스크립트 제어문의 종류
- **조건문**
	- if/else 문, switch문, try/catch/finally문
	- 조건에 따라 처리를 분기
- **반복문**
	- while문, do/while문, for문, for/in문, for/of문
	- 조건을 만족하면 처리를 반복 실행
- **점프문**
	- break문, continue문, return문, throw문
	- 프로그램의 다른 위치로 이동


## 블록문(Block statement / Compound statement)
프로그램 코드에서 **블록\(block\)** 이란 마치 한 문단처럼 보이는, 코드의 한 부분을 뜻하며, 중괄호로 묶여 있는 경우가 많다. 보통 1개 이상의 명령어를 가지고 있으나, 주석으로 이루어진 블록이나, 아무 내용도 없는 빈 블록도 가능하다.

자바스크립트는 블록문을 하나의 실행 단위로 취급하며, 블록문 단독으로 사용할 수도 있으나 보통 제어문이나 함수 선언문 등으로 사용한다. 블록문 끝에는 세미콜론을 붙이지 않는다.

## 조건문
자바스크립트의 조건문은 if/else문과 switch문이 있다.

### if/else문
논리적 참(true), 거짓(false)에 따라 실행할 코드 블록을 결정한다. 평가 결과가 true나 false로 나오지 않는 조건식은 결과값을 불리언 값(true/false)으로 강제 변환한다.

if와 else는 두 번 이상 사용할 수 없지만 else if는 여러 번 사용이 가능하다. 일반적인 형태는 다음과 같다.

```js
var menuNum = 2;
var menu;

// if문
if (menuNum > 1) {
  menu = '짬뽕';
}
console.log(menu); // 짬뽕

// if/else문
if (menuNum > 1) {
  menu = '짬뽕';
} else {
  menu = '짜장';
}
console.log(menu); // 짬뽕

// if/else if문
if (menuNum > 1) {
  menu = '짬뽕';
} else if (menuNum < 1) {
  menu = '탕수육';
} else {
  menu = '짜장';
}
console.log(menu); // 짬뽕
```

### 삼항 조건 연산자
If/else문은 삼항 연산자로 표현할 수도 있다. 이를 **삼항 조건 연산자** 라고 하며, 표현식을 만든다. 이 표현식은 값처럼 사용할 수도 있다. 반면에 if/else문은 표현식이 아닌 문이며, 값처럼 사용할 수 없다.

위의 예제를 삼항 조건 연산자로 표현하면 아래와 같다.

```js
// if/else문 -> 삼항 조건 연산자
var menuNum = 2;
var menu = menuNum > 1 ? '짬뽕' : '짜장';
console.log(menu); // 짬뽕

// if/else if -> 삼항 조건 연산자
var menuNum = 2;
var menu = menuNum ? (menuNum > 1 ? '짬뽕' : '탕수육') : '짜장';
console.log(menu); // 짬뽕
```

### switch문
switch문은 true와 false로만 평가되는  if/else와는 다른 조건문이다. 
switch문은 주어진 표현식을 평가하여 그 값과 일치하는 표현식을 갖고 있는 case문이 등장할 때까지 순차적으로 실행된다. 이때, 일치하는 case가 없다면 default 문이 실행되는데 default문이 필수는 아니다. 그리고, 일치하는 case가 있더라도 break문이 누락된 경우에는 그냥 지나치게 된다. 이러한 것을 폴스루(fall through)라고 한다.

일반적인 switch문은 아래와 같은 형태를 갖고 있다.

```js
var temperature = 20;
var feeling;

switch (temperature) {
  case 10:
    feeling = 'cold';
    break;
  case 15:
    feeling = 'cool';
    break;
  case 20:
    feeling = 'warm';
    break;
  case 25:
    feeling = 'hot';
    break;
  default:
    feeling = 'soso';
}

console.log(feeling); // warm
```

의도적으로 break를 생략하여 폴스루(fall through)를 이용하는 경우도 있는데, 추후 알아보도록 하겠다.
그리고, default는, switch 블록 내에서 어느 위치에든 올 수 있지만, 블록 중간에 있으면 가독성이 좋지 않으므로 되도록 끝에 배치하도록 한다.

**참고:**
  - [코어자바스크립트 | 조건부 연산자](https://ko.javascript.info/ifelse)