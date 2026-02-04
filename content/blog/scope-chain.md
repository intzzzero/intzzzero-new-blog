---
title: "스코프 체인(scope chain)"
date: "2020-06-17"
update: "2020-06-17"
draft: false
category: "JavaScript"
path: "/blog/scope-chain"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 스코프 체인(scope chain)
내부 스코프의 렉시컬 환경에서 필요한 식별자를 찾을 수 없을 때 외부 스코프의 렉시컬 환경을 점진적으로 탐색하게 되는데, 이처럼 렉시컬 환경을 매개로 내부와 외부의 스코프가 이어진 것을 **스코프 체인\(scope chain\)** 이라고 부른다.

```js
var a = 'A';
function f() {
  var b = 'B';
  function g() {
    var c = 'C';
    console.log(a + b + c);
  }
  g();
}
f(); // ABC
```

**위와 같은 중첩 함수가 있을 때, 식별자 탐색 과정을 단계별로 알아보자면 다음과 같다.**

1. `g()`의 렉시컬 환경의 선언적 환경 레코드(Declarative Environment Record)에서 식별자 `c`를 찾는다.
2. `g()`의 선언적 환경 레코드에서 식별자 `b`를 찾지만 못 찾고, `g()`의 외부 렉시컬 환경 참조(Outer Lexical Environment Reference)에 기록된 상위 함수 `f()`로 이동하여 탐색한다.
3. `f()`의 렉시컬 환경의 선언적 환경 레코드에서 식별자 `b`를 찾는다.
4. `f()`의 선언적 환경 레코드에서 식별자 `a`를 찾지만 못 찾고, `f()`의 외부 렉시컬 환경 참조에 기록된 전역 렉시컬 환경(Global Lexical Environment)로 이동하여 탐색한다.
5. 전역 렉시컬 환경의 객체 환경 레코드(Object Environment Record)에서 식별자 `a`를 발견한다. 이때의 외부 렉시컬 환경 참조는 `null`이다.

**참고:**
- [Scope | PoiemaWeb](https://poiemaweb.com/js-scope)

## 스코프(scope)와 실행 컨텍스트(execution context)의 차이
- 스코프는 변수의 **유효 범위** 이며, 실행 컨텍스트는 실행되는 코드 덩어리라는 추상적 개념.
- 스코프는 함수가 **정의될 때** 결정되며, 실행 컨텍스트는 함수가 **실행될 때** 생성된다.
