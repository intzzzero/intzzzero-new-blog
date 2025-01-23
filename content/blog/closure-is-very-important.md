---
title: "참조를 통해 변수에 인공호흡기를 달아주는 클로저(Closure)"
date: "2020-05-18"
update: "2022-11-02"
draft: false
category: "JavaScript"
path: "/blog/closure-is-very-important"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 렉시컬 스코핑(Lexical Scoping)

클로저의 개념을 이해하기 위해서는 우선 렉시컬 스코핑을 이해해야 하며, 렉시컬 스코핑을 이해하기 위해서는 실행 컨텍스트(Execution Context)를 이해할 필요가 있다.

아래와 같은 코드가 있을 때, 실행 컨텍스트와 렉시컬 스코핑을 단계별로 정리하며 알아보도록 하자.

```js
function init() {
  const name = ‘codeAmeba’;
  function displayName() {
    console.log(name);
  }
  displayName();
}
init(); // codeAmeba
```

1. 글로벌 실행 컨텍스트 생성 -> 렉시컬 환경에 `init()` 등록
2. 글로벌 실행 컨텍스트 위에 `init()` 실행 컨텍스트, 렉시컬 스코프 생성
3. `init()` 렉시컬 환경에 변수와 함수 등록, 외부 환경 참조에 글로벌 렉시컬 환경 등록
4. `init()` 실행 컨텍스트 위에 `displayName()` 실행 컨텍스트, 렉시컬 스코프 생성
5. `displayName()` 외부 환경 참조에 등록된 변수 `name`을 찾아 로그 실행
6. `displayName()` 실행 컨텍스트, 렉시컬 스코프 종료
7. `init()` 실행 컨텍스트, 렉시컬 스코프 종료

## 클로저(Closure)

앞서 살펴본 내용이 일반적인 중첩함수라면, 클로저는 어떤 부분이 다른지 아래의 코드를 살펴보자.

```js
function makeFunc() {
  const name = ‘codeAmeba’;
  function displayName() {
    console.log(name);
  }
  return displayName;
}

const myFunc = makeFunc();
myFunc(); // codeAmeba
```

`displayName()`을 리턴한다는 것 외에 큰 차이를 발견하기 어려우나 내부적으로는 클로저만의 차이점이 있다.

**클로저의 컨셉은 실행 컨텍스트 종료 후에도 렉시컬 환경을 유지하는 것에 있다.**

위의 경우에서는, `displayName()`이 리턴되어 `myFunc`에 저장되고, `displayName()`은 외부 환경 참조를 통해 `makeFunc()`의 지역변수 `name`을 참조하고 있다고 볼 수 있다.

## 클로저의 응용

클로저의 특징을 활용한다면, 아래와 같이 캡슐화된 지역변수의 상태를 유지할 수가 있다.

```js
function outerCount() {
  let cnt = 0
  function innerCount() {
    cnt++
    console.log(cnt)
  }
  return innerCount
}

const myCount = outerCount()
myCount() // 1
myCount() // 2
myCount() // 3
```

위와 같은 상태유지가 가능한 것은 `myCount` 변수에 `outerCount` 함수가 할당(참조)되어 있으며, `outerCount` 함수는 `innerCount` 함수를 호출(참조)하고 있고, `innerCount` 함수는 `cnt` 변수를 참조하고 있기 때문이다. 결국 지역변수인 `cnt`의 참조는 끊어지지 않았기에 가비지컬렉터에 의해 사라지지 않고 상태가 유지될 수 있는 것이다.

**참고:**

- [클로저 - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures)
- [변수의 스코프](https://ko.javascript.info/closure)
