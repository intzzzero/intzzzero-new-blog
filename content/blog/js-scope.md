---
title: "스코프(Scope)는 취조실 거울처럼 단방향"
date: "2020-07-17"
update: "2020-07-17"
draft: false
category: "JavaScript"
path: "/blog/what-is-scope"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 스코프(Scope)
**스코프(scope)** 는 변수가 선언된 위치를 기준으로 다른 코드를 참조할 수 있는 유효범위를 의미한다. 왜 선언된 위치를 기준으로 하는지, 어떤 방식으로 정해지는지 알기 위해서는 **실행 컨텍스트(execution context)** 를 알아야만 하는데, 실행 컨텍스트의 내용이 방대하기 때문에 추후 별도의 포스트에서 다루도록 하고, 이번 포스트에서는 실행 컨텍스트를 간단히 겉핥기만 하고 스코프를 알아볼까 한다.

## 실행 컨텍스트와 스코프
위에서 언급 했듯이 스코프와 실행 컨텍스트는 분리할 수가 없는 개념이다. 애초에 실행 컨텍스트로 인하여 스코프가 생긴다고도 볼 수 있다.
실행 컨텍스트를 생성하는 코드는 크게 네 종류가 있으며,
- 전역(global) 코드
- 함수(function) 코드
- eval 코드
- 모듈(module) 코드

이러한 코드들(주로 전역, 함수)이 실행 준비를 하는 평가 과정에서 각각의 실행 컨텍스트가 생성된다. 그리고, 변수, 함수, 클래스 등의 선언문이 해당 실행 컨텍스트에 등록된다. 각 실행 컨텍스트에 속한 코드가 실행을 마치면 그 실행 컨텍스트는 소멸하는데, 이 말은 곧, 전역 실행 컨텍스트는 가장 처음에 시작하여 가장 마지막까지 남는다는 것이다.(엄밀히 따지면 전역 실행 컨텍스트는 window이며 브라우저와 생애주기가 동일하다.)

함수의 경우는 함수가 호출 될 때 해당 실행 컨텍스트가 생성되며 콜 스택에 쌓이게 된다(push). 실행이 종료되면 콜 스택에서 빠지고(pop), 컨트롤을 이전 컨텍스트에 넘겨준다.

![](https://cdn-images-1.medium.com/max/2400/1*ACtBy8CIepVTOSYcVwZ34Q.png)

이와 같은 과정으로 자바스크립트 소스 코드에 **스코프(scope)**와 스코프들의 중첩으로 이루어진 **스코프 체인(scope chain)**이 생겨난다. 

## 스코프의 동작 방식
스코프는 전역(global)과 지역(local)로 구분하는데, 변수가 선언된 위치를 기준으로 유효범위를 정하기 때문에 전역에서 선언된 변수는 전역 스코프를 갖고, 지역에서 선언된 변수는 지역 스코프를 갖는다. 

전역 스코프는 가장 바깥의 window를 의미하기 때문에 모든 지역 스코프에서 참조가 가능하다. 이러한 스코프의 동작 방식을 쉽게 이해하려면 미드에서 등장하는 취조실을 떠올리면 좋다. 취조실 내부에는 거울이 있는데, 내부에서는 건너편이 보이지 않는 거울이지만, 취조실 옆 밀실에서는 유리창처럼 내부가 훤히 보이곤 한다.

![](https://i.ytimg.com/vi/P7Qadimv1M8/maxresdefault.jpg)

![](https://cdn-images-1.medium.com/max/2400/1*94wTu61tmltShnyb5U0kgw.png)

스코프도 이와 마찬가지로 단방향으로만 참조만 가능하다. 만약, 아래와 같은 중첩된 스코프가 있다면, 아래의 그림처럼 이미지를 그릴 수 있다.

![](https://cdn-images-1.medium.com/max/1600/1*okKkgfvr31oBiI_Gs90CPg.png)

결국, 중첩된 스코프에서 가장 안쪽에 있는 코드는 그것을 감싸고 있는 모든 스코프의 변수를 참조할 수 있는 것이다.
스코프가 중첩되어 이어진 것을 스코프 체인이라 한다. 엄밀히 따지면, 실행 컨텍스트의 렉시컬 환경(Lexical Environment)을 연결한 것이긴 한데, 이 부분은 추후에 다루도록 하겠다. 어쨌든, 요는 내부 스코프에서는 외부 스코프의 변수(식별자)를 참조할 수 있지만, 외부 스코프에서는 내부 스코프의 그 무엇도 참조할 수 없다는 사실이다. 물론, 아래와 같이 찾고 있는 식별자가 내부 스코프에 있다면, 그것이 반환되며,

```js
function kirin() {
  console.log('kirin is good beer!');
}

function stella() {
  function kirin() {
    console.log('asahi is good beer?');
  }
  kirin();
}

stella(); // asahi is good beer?
```

내부에 없을 때에만 스코프 체인에서 해당 식별자를 발견할 때까지 거슬러 올라간다.

```js
function kirin() {
  console.log('kirin is good beer!');
}

function stella() {
  function asahi() {
    console.log('asahi is good beer?');
  }
  kirin();
}

stella(); // kirin is good beer!
```

**참고:**
- [번역 자바스크립트 스코프와 클로저(JavaScript Scope and Closures)](https://medium.com/@khwsc1/%EB%B2%88%EC%97%AD-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8A%A4%EC%BD%94%ED%94%84%EC%99%80-%ED%81%B4%EB%A1%9C%EC%A0%80-javascript-scope-and-closures-8d402c976d19)
- [JavaScript Scope and Closures | CSS-Tricks](https://css-tricks.com/javascript-scope-closures/)
- [Understanding Execution Context and Execution Stack in Javascript](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)