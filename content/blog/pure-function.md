---
title: "순수 함수(Pure Function)의 조건"
date: "2020-07-26"
update: "2020-07-26"
draft: false
category: "JavaScript"
path: "/blog/pure-function"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 순수 함수

```js
function add(a, b) {
  return a + b;
}

console.log(add(4, 7)); // 11
```

위와 같이 동일한 인자를 전달했을 때 항상 동일한 값이 나오는 함수를 순수 함수라고 한다. 반면에, 아래와 같이 동일한 인자를 전달했음에도 반환값이 달라질 가능성이 있는 함수는 순수 함수와 거리가 멀다.

```js
var c = 10;

function add2(a, b) {
  return a + b * c;
}

console.log(add2(3, 6)); // 63

c = 5;

console.log(add2(3, 6)); // 33
```

물론, 변수 `c`를 `const`를 사용하여 상수로 선언한다면 순수 함수가 될 수 있다.

```js
var c = 20;
function add3(a, b) {
  c = b;
  return a + c;
}

console.log(add3(5, 6)); // 11
console.log(add3(5, 6)); // 11

console.log(c); // 6
```

또한, 위와 같이 함수의 반환값은 동일한 인자에 대해 동일하게 출력되지만, 함수 내부에서 변수 `c`의 값이 변하는 것은 일종의 부수 효과(side effect)라고 할수 있으며, 이와 같은 경우도 순수 함수라고 할 수 없다.
