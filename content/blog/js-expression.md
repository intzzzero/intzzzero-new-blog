---
title: "표현식(Expression)과 문(Statement)"
date: "2020-06-02"
update: "2020-06-02"
draft: false
category: "JavaScript"
path: "/blog/expression-and-statment"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 표현식(Expression)
자바스크립트에서의 값(value)은 리터럴 표기법으로도 생성이 가능하지만, 대개의 경우 표현식(Expression)으로 생성한다. 엄밀히 따지면, 리터럴은 표현식의 일부라고 할 수 있으며, 표현식은 리터럴 외에도 식별자, 연산자, 함수 호출 등으로도 구성할 수 있다.

```js
// 리터럴 표현식
10
'beer'

// 식별자 표현식(선언을 했다는 가정 하에)
beer
beer.name
beerBox[2]

// 연산자 표현식
5 + 10
sum = 15
a !== b

// 함수, 메서드 호출 표현식(선언을 했다는 가정 하에)
multiply()
beer.getName()
```

결국, **표현식은 하나의 값으로 평가될 수 있는 문\(statement\)**라고 할 수 있다.

## 문(Statement) || 표현식(Expression)
처음 자바스크립트를 배울 때 이해하기 어려운 개념 베스트 5에 들어가는 개념이라면, 단연 문과 표현식의 구분이라고 나는 말하고 싶다. 나 역시 그랬다. 하지만, 각각의 역할을 생각하면 구분하는 것은 쉽다.

요는, **문은 자바스크립트 엔진에게 명령을 내리는 것**이고, **표현식은 값으로 평가될 수 있다는 것**이다. 따라서 값을 통해 명령을 내릴 경우 그것은 표현식인 문이다. 표현식만으로는 명령을 내릴 수 없다.

만약, 그래도 둘의 역할이 헷갈린다면, 간단히 구분할 수 있는 방법이 있다. 바로, 변수에 할당을 해보는 것이다. 변수에 할당할 수 있는 것은 값이며, 따라서 변수에 할당이 된다면 그것은 표현식이다. 예를 들어 아래와 같은 것이다.

```js
var a; // 변수 선언문은 표현식이 아닌 문이다.
a = 10; // 할당문은 표현식인 문이다.
var b = bar a; // Uncaught SyntaxError: Unexpected token var -> 문은 값처럼 사용할 수 없다.
var b = a = 100; // 표현식인 문은 값처럼 사용할 수 있다.
console.log(b); // 100
```
