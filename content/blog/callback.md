---
title: "필요할 때 부르는 함수, 콜백(Callback)"
date: "2020-07-23"
update: "2020-07-23"
draft: false
category: "JavaScript"
path: "/blog/callback"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 콜백(Callback)
다른 함수의 인자(parameter)로 전달되는 함수를 [콜백 함수](https://ko.javascript.info/callbacks) 라고 부른다. 이 콜백 함수를 인자로 받은 함수는 원하는 순간에 콜백 함수를 호출할 수 있고, 제어권을 콜백 함수에게 넘겨준다.
여기서 제어권을 넘겨준다는 의미는 콜백 함수의 [실행 컨텍스트](https://poiemaweb.com/js-execution-context)가 생성되어 [콜스택(Callstack)](https://developer.mozilla.org/ko/docs/Glossary/Call_stack) 최상단에 위치한다는 말이며, 즉 콜백 함수를 인자로 받은 함수의 실행이 중단됨을 의미한다. 해당 콜백 함수의 실행 컨텍스트가 종료되면 제어권은 다시 콜백 함수를 인자로 받은 함수에게로 돌아가고, 콜스택 최상단에는 콜백 함수를 호출한 함수의 실행 컨텍스트가 위치하게 된다.

아래의 코드를 통해 콜백 함수의 동작 원리를 알아보도록 하자.

```js
const cheers = () => {
  return console.log('cheers!');
};

const letsBeerParty = (cb, beer) => {
  setTimeout(cb, 1000);
  return console.log(`I like ${beer}!`);
};

letsBeerParty(cheers, 'cass');
// I like cass!
// cheers! after 1 sec
```

위의 예시에서 콜백 함수는 `cheers`이며, `letsBeerParty`함수 내부에서 다시 한번 `setTimeout`의 콜백 함수로 사용되었다.
