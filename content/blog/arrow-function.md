---
title: "화살표 함수(arrow function)의 특징과 주의사항"
date: "2020-06-18"
update: "2020-06-18"
draft: false
category: "JavaScript"
path: "/blog/arrow-function"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 화살표 함수(arrow function)
ES6에서는 익명함수의 단축 표현인 **화살표 함수 표현식**이 추가되었다. 화살표 함수 표현식은 아래와 같이 다양한 방법으로 작성이 가능하다.

```js
const square = (x) => {return x*x}; // 함수 표현식
const f = (x, y, z) => {...}; // 인수가 여럿이라면 쉼표로 구분
const square = x => {return x*x}; // 인수가 하나라면 괄호 생략 가능
const f = () => {...}; // 인수가 없을 때에는 빈 괄호 필수
const square = x => x*x; // 함수 바디에 return문만 있으면 return 생략 가능
const f = (a, b) => ({x:a, y:b}); // 반환값이 객체 리터럴이라면 괄호 필수
(x => x*x)(3); // 즉시실행함수(IIFE)로 화살표 함수 사용 가능
```

## 일반 함수와 화살표 함수의 차이
### this
함수 리터럴로 정의한 함수는 `this`의 값이 함수를 호출할 때 결정되지만, 화살표 함수의 `this`값은 함수를 정의할 때 결정된다.

### arguments 변수가 없음
화살표 함수 안에는 arguments 변수가 정의되어 있지 않아 사용할 수 없다.

  ```js
  const f  = () => console.log(arguments);
  f(); // Uncaught ReferenceError: arguments is not defined
  
  const s = function() {console.log(arguments);};
  s(); // Arguments [callee: ƒ, Symbol(Symbol.iterator): ƒ]
  ```

### 생성자로 사용 불가
화살표 함수 앞에는 `new` 연산자를 붙여 호출할 수 없다.

  ```js
  const Person = (name, age) => {this.name = name; this.age = age;};
  const Tom = new Person('Tom', 25); // Uncaught TypeError: Person is not a constructor

  const Coffee = function(name, price) {this.name = name; this.price = price;};
  const americano = new Coffee('Americano', 4100);
  console.log(americano); // Coffee {name: "Americano", price: 4100}
  console.log(americano.price); // 4100
  ```

### yield 키워드를 쓸 수 없다
화살표 함수 안에서는 `yield` 키워드를 쓸 수 없으며, 따라서 화살표 함수는 제너레이터의 기능을 수행할 수 없다.

**참고:**
- [화살표 함수 - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98)
- [Arrow function | PoiemaWeb](https://poiemaweb.com/es6-arrow-function)
- [화살표 함수 기초](https://ko.javascript.info/arrow-functions-basics)
- [화살표 함수에 대한 재고](https://ko.javascript.info/arrow-functions)
- [메서드와 ‘this’](https://ko.javascript.info/object-methods)
- [제너레이터](https://ko.javascript.info/generators)
