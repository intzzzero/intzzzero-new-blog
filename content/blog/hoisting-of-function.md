---
title: "함수 선언문의 호이스팅"
date: "2020-07-14"
update: "2020-07-14"
draft: false
category: "JavaScript"
path: "/blog/hoisting-of-function"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 함수 선언문의 호이스팅
- 변수와 마찬가지로 호이스팅이 됨
- 아래와 같은 **함수선언문** 은 전체가 통째로 호이스팅 됨

```javascript
console.log(square(5)); // 25

// 함수선언문
function square(x) {
  return x * x;
}
```

- return이 없으면 `undefined`

```javascript
console.log(square(5)); // undefined

function square(x) {
  x * x;
}

console.log(square(3)); // undefined
```

- 변수와 마찬가지로 **선언문** 만 호이스팅이 되기 때문에, 아래와 같은 **함수표현식** 은 변수명만 호이스팅이 됨.

```javascript
// 기명 함수표현식
const b = function bb() {
  return 'bb';
}

// 익명 함수표현식
const c = function() {
  return 'c';
}
```

- 함수의 호이스팅은 코드의 순차실행을 저해하고 예측을 어렵게 하기 때문에 되도록 **함수표현식** 의 사용을 권함(이라고 더글라스 크락포드 옹께서 말씀하셨다)
