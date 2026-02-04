---
title: "실행 컨텍스트를 알면 실행 순서가 보인다"
date: "2020-07-24"
update: "2020-07-24"
draft: false
category: "JavaScript"
path: "/blog/execution-context"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 실행 컨텍스트(Execution Context)
자바스크립트 엔진은 실행 가능한 코드(Executable Code)를 만나면 그 코드를 평가(Evaluation)하여 실행 컨텍스트(Execution Context)를 만든다.

실행 컨텍스트는, 실행 가능한 코드가 실제로 실행되고 관리되는 영역으로, 실행에 필요한 모든 정보를 아래와 같이 여러 컴포넌트에 나누어서 관리한다.

- 실행 컨텍스트(Execution context)
  - 렉시컬 환경(Lexical Environment)
    - 환경 레코드(Environment Record)
      - 선언적 환경 레코드(Declarative Environment Record)
      - 객체 환경 레코드(Object Environment Record)
    - 외부 렉시컬 환경 참조(Outer Lexical Environment Reference)
  - 변수 환경(Variable Environment)
  - 디스 바인딩(This Binding)

**실행 컨텍스트의 구조를 의사 코드로 표현하면 아래와 같다.**

  ```js
  // 실행 컨텍스트의 구조를 보여주는 pseudo code
  ExecutionContext = {
    LexicalEnvironment: {
      EnvironmentRecord: {
        DeclarativeEnvironmentRecord: {},
        ObjectEnvironmentRecord: {}
      },
      OuterLexicalEnvironmentReference: {}
    },
    VariableEnvironment: {},
    ThisBinding: null
  }
  ```

**참고:**
- [(JavaScript) 함수의 범위(scope) - lexical scoping - ZeroCho Blog](https://www.zerocho.com/category/Javascript/post/5740531574288ebc5f2ba97e)
- [(JavaScript) 실행 컨텍스트 - 클로저와 호이스팅 - ZeroCho Blog](https://www.zerocho.com/category/Javascript/post/5741d96d094da4986bc950a0)
- [클로저 - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures)
- [Execution context and the call stack — visually illustrated by a slice of tasty cake](https://medium.com/free-code-camp/execution-context-and-the-call-stack-visually-illustrated-by-a-slice-of-tasty-cake-14f9a64dc460)
- [Understanding Execution Context and Execution Stack in Javascript](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)

## 렉시컬 환경(Lexical Environment)
렉시컬 환경은 앞서 언급한 실행 컨텍스트를 이루는 하나의 컴포넌트로써 자바스크립트 엔진이 코드를 실행하기 위해 자원을 모아 둔 곳이다. 해당 유효 범위(Scope) 안에 있는 식별자와 식별자가 가리키는 값을 `key : value`의 형태로 바인드하여 렉시컬 환경 컴포넌트에 기록한다.

```js
LexicalEnvironment: {
  EnvironmentRecord: {},
  OuterLexicalEnvironmentReference: {}
}
```

렉시컬 환경 컴포넌트에는 위와 같이 **환경 레코드\(Environment Record\)** 와 **외부 렉시컬 환경 참조\(Outer Lexical Environment Reference\)** 가 있다.
  - 환경 레코드: 유효 범위 내의 식별자와 값이 기록되어 있으며, 함수가 호출되면 1차적으로 이곳에서 식별자를 탐색한다.
  - 외부 렉시컬 환경 참조: 유효 범위 너머의 식별자와 값이 기록되어 있는 곳으로, 환경 레코드에서 해당 식별자를 찾을 수 없을 때 외부 렉시컬 환경 참조를 탐색하게 된다.
최상위의 렉시컬 환경은 **전역 환경\(Global Environment\)** 과 바인딩되어 있으며, 이곳에서의 외부 렉시컬 환경 참조는 `null`이다.
**결국 호이스팅\(Hoisting\)은, 자바스크립트의 식별자들이 해당 스코프의 렉시컬 환경에 등록된 결과라고 볼 수 있다.**

> 중첩된 내부 함수가 외부 함수의 프로퍼티를 참조함으로써 스코프에 계속 존재하게 하는 ['클로저'](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures)는 외부 렉시컬 환경 참조를 십분 활용하는 좋은 예라고 할 수 있다.

## 콜 스택(Call Stack)
> 후입선출(LIFO, Last In First Out) 방식으로 아래부터 데이터를 쌓아 올려 가장 마지막에 추가된 데이터부터 내보내는 자료구조를 **스택\(Stack\)** 이라고 한다.
> 이때, 데이터를 쌓는 행위를 **push** 라고 하고, 스택의 가장 윗부분에서 데이터를 꺼내는 행위를 **pop** 이라고 한다.

- 실행 컨텍스트(Execution Context)는 프로그램 실행 중 스택에 push되어 실행이 된다. 이때, 전역 코드(Global Execution Context)는 브라우저의 시작과 동시에 실행되어 브라우저를 종료할 때까지 스택의 가장 아래에 위치한다.
- 함수가 호출되면, 해당 실행 컨텍스트가 스택에 push 되어 실행되며, 해당 함수의 작업이 끝나면 호출했던 부분으로 제어권이 돌아오면서 스택에서 pop 된다. 이처럼 함수가 호출(Call)될 때마다 스택에 쌓인다 하여 **콜 스택\(Call Stack\)** 이라고 부른다.

**참고:**
- [자바스크립트의 동작원리: 엔진, 런타임, 호출 스택 • Captain Pangyo](https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/)