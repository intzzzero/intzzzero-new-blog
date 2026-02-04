---
title: "객체(object)를 생성하는 다양한 방법"
date: "2020-06-25"
update: "2020-06-25"
draft: false
category: "JavaScript"
path: "/blog/how-to-make-object"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

자바스크립트의 객체는 이름(key)과 값(value)을 하나로 묶은 집합이다. 이러한 집합 하나 하나를 프로퍼티(property)라고 부른다. 값으로는 원시 값(primitive)과 객체(object) 타입 데이터가 모두 할당될 수 있는데, 당연히 객체인 함수(function)도 참조 값으로 들어올 수가 있다. 그리고, 값의 자리에 함수가 오는 경우는 구분을 위해 메서드(method)라고 부른다.
자바와 같은 일반적인 클래스 기반 객체 지향 언어는 클래스를 정의하고 필요한 시점에 `new` 연산자와 함께 인스턴스를 생성하는 방식을 이용한다. 자바스크립트 역시 es6에서 그와 같은 클래스 문법이 추가되었지만, 프로토타입을 기반으로 동작한다는 점에서 다소 차이가 있다.

![](https://images.unsplash.com/photo-1517148815978-75f6acaaf32c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60)

## 객체 리터럴(Literal) 생성
객체를 생성하는 가장 기본적인 방법은 객체 리터럴이다. 기본적으로 변수에 값을 할당하는 형태와 크게 다르지 않으며, 이름과 값으로 이루어진 프로퍼티를 중괄호`{}`로 감싼다.

```js
const beer = {
  name: 'stella',
  taste: 'fruity'
};
```

객체는 프로퍼티의 추가 및 수정, 삭제가 가능하며, 프로퍼티가 없는 **빈 객체** 를 생성하는 것 또한 가능하다.

```js
// 빈 객체 생성
const beer = {};
console.log(beer); // {}

// 프로퍼티 추가
beer.name = 'kirin';
console.log(beer); // {name: "kirin"}

// 프로퍼티 수정
beer.name = 'stella';
console.log(beer); // {name: "stella"}

// 프로퍼티 삭제
delete(beer.name); // true
console.log(beer); // {}
```

위와 같이 프로퍼티의 삭제까지 가능하지만, 삭제는 추가, 수정에 비해 메모리에 가해지는 부담이 크기 때문에 되도록 하지 않는 게 좋다.

## 내장(built in) 객체 생성자(constructor)
아래의 소스 코드와 같이 new 연산자와 함께 Object 생성자 함수를 호출하면 **빈 객체** 를 생성 및 반환한다. 이렇게 생성된 빈 객체에도 객체 리터럴과 마찬가지로 프로퍼티(property)나 메서드(method)를 추가할 수가 있다.

```js
// 빈 객체 생성
const beer = new Object();

// 프로퍼티 추가
// 이때 this는 메서드를 호출한 객체를 가리킨다.
beer.name = 'kirin';
beer.drinkBeer = function () {
  console.log('Yeah! ' + this.name + ' is good beer!');
};

console.log(beer); // {name: "kirin", drinkBeer: ƒ}
beer.drinkBeer(); // Yeah! kirin is good beer!
```

이와 같은 생성자 함수를 내장 객체(built in object)라고 하며, 자바스크립트 엔진에 기본적으로 탑재되어 있다. 앞서 소개한 객체를 생성하는  `Object` 외에도 문자열 객체를 생성하는 `String`, 숫자 객체를 생성하는 `Number`, 논리값 객체를 생성하는 `Boolean` 등 다양한 내장 객체들이 있다.

> 이때, Object 생성자는 프로토타입으로 Object.prototype을 지니며 그 하위에 Number.prototype, String.prototype 등 데이터타입에 따른 각 prototype과 생성자 함수가 존재한다.

이 내장 객체들은 함수 형식으로 사용하여 객체를 생성하기 때문에 **생성자\(constructor\) 함수** 라고도 하며, new 연산자와 함께 호출했을 때, 객체(인스턴스)를 생성할 수 있다. 이때 **인스턴스란, 생성자 함수에 의해 생성된 객체를 뜻하는데, 다른 객체와 구분을 하기 위해 인스턴스라고 부른다.**

다만, 단순히 빈 객체를 생성하는 것이라면, **객체 리터럴 표기법** 을 사용하는 편이 더욱 간편하다.

## 생성자 함수

```js
// name과 taste가 parameter의 역할을 하며, arguments를 입력 받아 인스턴스가 생성된다.
// 이때 this는 생성자 함수가 생성하게 될 인스턴스를 가리킨다.
function Oblager(name, price) {
  this.name = name;
  this.price = price;
  this.howMuch = function() {
    console.log(`${this.name} is ${this.price}won`);
  };
}

const oblager1 = new Oblager('OB Lager', 4000);
oblager1.howMuch(); // OB Lager is 4000won
```

ES6부터는 `class` 문법이 추가되어 다음과 같이 생성자 함수를 작성한다.

```js
class Kloud {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}
Kloud.prototype.howMuch = function() {
  console.log(`${this.name} is ${this.price}won`)
}

const kloud = new Kloud('Kloud', 3500);
kloud.howMuch(); // Kloud is 3500won
```

**참고:**
- [poiemaweb | 객체](https://poiemaweb.com/js-object)
- [MDN | 객체](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object)
- 모던 자바스크립트 입문 ISBN 9791160504439