---
title: "프로토타입을 임의로 수정하면 안 되는 이유"
date: "2020-07-06"
update: "2020-07-06"
draft: false
category: "JavaScript"
path: "/blog/do-not-modify-prototype"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

```js
const arr = [1, 2, 3];
console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__ === Object.prototype); // true
console.log(arr.__proto__.__proto__.__proto__ === null); // true

const myFunc = () => {};
console.log(myFunc.__proto__ === Function.prototype); // true
console.log(myFunc.__proto__.__proto__ === Object.prototype); // true
console.log(myFunc.__proto__.__proto__.__proto__ === null); // true

const num = 5;
console.log(num.__proto__ === Number.prototype); // true
console.log(num.__proto__.__proto__ === Object.prototype); // true
console.log(num.__proto__.__proto__.__proto__ === null); // true

console.log(myFunc.__proto__.__proto__ === arr.__proto__.__proto__); // true
console.log(num.__proto__.__proto__ === myFunc.__proto__.__proto__); // true
```

위와 같이 모든 내장 프로토타입은 `Object.prototype`에서 만나게 되며, 그 끝에는 `null`이 있다.

그 말은 곧, 프로토타입 체인을 통해 다른 객체의 메서드를 가져올 수 있다는 것이며, 자주 사용하는 사용자 정의 메서드를 프로토타입에 아예 탑재해버리고 내장 메서드를 쓰듯이 쓸 수도 있다는 것이다.

**하지만, 프로토타입은 전역에 영향을 미치며, 프로토타입에 사용자 정의 메서드를 넣는다는 것은 전역 객체를 만든다는 것이므로 오류와 혼란을 야기한다.**

***

**참고:**
- [네이티브 프로토타입](https://ko.javascript.info/native-prototypes)
- [함수의 prototype 프로퍼티](https://ko.javascript.info/function-prototype)