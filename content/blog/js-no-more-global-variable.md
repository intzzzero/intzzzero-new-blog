---
title: "전역 변수를 왜 지양해야 하는가"
date: "2020-06-16"
update: "2020-06-16"
draft: false
category: "JavaScript"
path: "/blog/no-more-global-variables"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 변수의 생명 주기(Life cycle)
변수 선언에 의해 생성된 변수는 영원불멸이 아니다. 언젠가는 소멸하게 되어 있는데, 이를 생명 주기라고 한다. 
변수는 선언된 위치에서 생성과 소멸을 겪게 되는데, 그렇기 때문에 당연히 전역 변수와 지역 변수의 생명 주기에는 차이가 있다.

### 지역 변수의 생명 주기
함수 내부에서 생성된 지역변수(Local variable)은 함수와 생사를 함께 한다. 아래와 같은 함수가 있을 때,

```js
// 지역변수의 생명 주기
function drink() {
  var beer = 'stella';
  console.log(beer);
  return beer;
}

drink();
console.log(beer);
```

drink 함수가 호출되기 전까지 지역변수 beer는 생성되지 않으며, 마침내 drink 함수가 호출 되었을 때야 비로소 변수 beer도 생성된다. 이때의 순서는 전역변수가 호이스팅 되듯이 함수 몸체의 문들이 순차적으로 실행되기 이전에 변수 beer의 선언이 자바스크립트 엔진에 의해 우선적으로 실행되어 undefined로 초기화 된다. 그 이후에 함수 몸체의 문들이 순차적으로 실행 되며 변수에 값이 할당된다. 그리고 함수가 종료될 때 변수도 소멸하며 생명 주기가 종료된다.

마치, 김춘수의 꽃이라는 시가 생각나는 모습이 아닐 수 없다. 함수를 호출했을 때에만 비로소 변수로써의 제역할을 하는 것이다.

### 전역 변수의 생명 주기
전역 변수는 함수와 다르게 호출이 없더라도 실행이 되고, 함수와 달리 return 문이 필요 없기 때문에 더 이상 실행할 문이 없더라도 종료되지 않는다. 만일 전역 코드가 종료된다면 애플리케이션에 존재하는 모든 이벤트는 작동하지 않게 된다. 즉, 전역 변수와 애플리케이션의 생명 주기는 일치한다고 볼 수 있다.

![scope | 출처: poiemaweb](https://poiemaweb.com/assets/fs-images/13-2.png)


## 전역 변수 === 시한폭탄
이러한 전역 변수에는 당연하게도 문제가 많은데, 크게 네 가지로 나눌 수가 있겠다.

### 암묵적 결합
전역 변수는 이름 그대로 소스 코드 어디서든지 사용할 수 있는 변수다. 어느 위치의 어느 코드든지 전역 변수를 참조하고, 변경할 수 있다는 것이다. 이것을 **암묵적 결합\(Implicit coupling\)** 이라고 하는데, 언뜻 듣기에는 편리하고 좋을 것 같은 느낌이 들기도 한다. 하지만, 전역 변수의 유효 범위 즉, 소스 코드의 길이가 길어질수록 가독성은 저하되고, 의도치 않게 상태가 변경되는 등의 위험성이 있다. 

### 긴 생명 주기
앞서 말했지만, 전역 변수의 생명 주기는 길다. 애플리케이션의 입장으로 보자면, 영원불멸의 삶을 사는 것이다. 그리고, 그에 따른 부작용은 고스란히 애플리케이션의 성능 저하로 이어지게 된다. 이를테면, 소스 코드 내의 모든 함수들이 아무때나 참조하고, 상태를 변경할 수도 있는 24시간 편의점과 같다. 그렇기 때문에 메모리 리소스를 오랫동안 소비하는 것은 당연하다. 특히, var 키워드의 경우는 중복 선언까지 허용하는 만큼 언제 어디서 변수명이 변경될 지 모르는 일이다.

### 스코프 체인 상에서 종점에 존재
전역 변수의 세 번째 문제점은 스코프 체인 상에서 가장 마지막에 존재한다는 점이다. 이는 변수를 검색할 때 전역 변수가 가장 마지막에 검색된다는 말인데, 따라서 전역 변수의 검색 속도가 가장 느리다는 말이기도 하다.

### 네임 스페이스 오염
자바스크립트의 단점 중 하나는 파일이 분리되어 있어도 하나의 전역 스코프를 공유한다는 점이다. 그래서 별도의 파일이라고 해도 동일한 이름을 지닌 변수나 함수가 같은 스코프 내에 존재할 가능성이 있다는 것인데, 이것이 내 인생의 변수가 될 수도 있다.


## 전역 변수의 사용을 어떻게 줄일 수 있을까?
지금껏 말한 것처럼 전역 변수는 언제 터질 지 모르는 시한폭탄과 같다. 따라서 가능한 전역 변수의 사용을 **지양** 하고, 지역 변수의 사용을 **지향** 해야 한다.
전역 변수의 사용을 줄일 수 있는 방법에 대해 알아보자.

### 즉시 실행 함수(IIFE, Immediately-Invoked Function Expression)
즉시 실행 함수는 함수의 정의와 동시에 호출되는 함수를 말한다. 생성과 동시에 실행 및 소멸까지 이어지기 때문에 내부의 변수들은 모두 지역 변수라고 할 수 있다.

```js
(function () {
  var beer = 'kirin'; // 즉시 실행 함수의 지역 변수
  // ...
}());

console.log(beer); // ReferenceError: beer is not defined
```

### 네임 스페이스 객체
아래와 같이 전역에 네임 스페이스 역할을 맡는 객체를 생성하여 **전역 변수처럼** 사용할 변수를 프로퍼티(property)로 추가하는 방법이다.

```js
var BEER = {}; // 전역 네임 스페이스 객체 생성

BEER.name = 'stella';

console.log(BEER.name); // stella
```

또한, 네임 스페이스 객체에 새로운 네임 스페이스 객체를 프로퍼티로 추가하여 네임 스페이스를 중첩(nesting)시킬 수도 있다.

```js
var BEER = {}; // 전역 네임 스페이스 객체 생성

BEER.species = {
  name: 'stella',
  from: 'Belgium'
};

console.log(BEER.species.from); // Belgium
```

이와 같은 방법으로 식별자(Identifier)의 충돌을 막을 수 있다. 하지만, **네임 스페이스 객체는 전역 변수에 할당되기 때문에 권장할만한 방법은 아니다.**

### 모듈 패턴(Module Pattern)
모듈 패턴은 클래스(class)를 모방한 방식으로, 관련이 있는 변수와 함수를 모아서 즉시 실행 함수로 감싼 것이다. 자바스크립트의 강력한 기능인 클로저(closure)를 기반으로 동작하며, 모듈 패턴의 특징은 전역 변수의 억제와 더불어 **캡슐화** 까지 구현할 수 있다는 것이다.

**캡슐화\(encapsulation\)**
객체 지향 프로그래밍에서 캡슐화를 설명할 수 있는 특징으로는 다음의 두 가지가 있다.
  - 객체의 속성(data fields)과 행위(메소드, methods)를 하나로 묶는다.
  - 실제 구현 내용의 일부를 외부에서 참조할 수 없도록 은닉한다(정보은닉, information hiding).

자바스크립트의 경우는 자바(Java)의 캡슐화처럼 public, private, protected 등의 접근 제한자(Access modifier)를 지원하지는 않지만, 모듈 패턴을 통해 어느 정도 구현이 가능하다.

```js
const Counter = (function () {
  // private 변수
  let num = 0;

  // 외부로 공개할 데이터나 메소드를 프로퍼티로 추가한 객체를 반환.
  return {
    increase() {
      return ++num;
    },
    decrease() {
      return --num;
    }
  };
}());

// private 변수는 외부에서 참조할 수 없음.
console.log(Counter.num); // undefined
console.log(Counter.increase()); // 1
console.log(Counter.increase()); // 2
console.log(Counter.increase()); // 3
console.log(Counter.decrease()); // 2
console.log(Counter.decrease()); // 1
```

위와 같이 모듈 패턴은 즉시 실행 함수처럼 객체를 반환하는데, 외부에 노출하고 싶은 변수 혹은 함수가 반환된다.


**참고:**
  - [poiemaweb | 전역 객체](https://poiemaweb.com/js-global-object)
  - [MDN | 문법과 자료형](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Values,_variables,_and_literals)
  - [코어자바스크립트 | 변수](https://ko.javascript.info/variables)