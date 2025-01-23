---
title: "자주 쓰지 않지만 알면 유용한 배열 메서드"
date: "2020-05-20"
update: "2020-05-20"
draft: false
category: "JavaScript"
path: "/blog/array-method-some-every"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## .every()
  - `every()` 메서드는 배열 안의 모든 요소가 주어진 판별 함수를 통과하는지 테스트합니다. (MDN)
  - 간단히 말하자면, 요소 하나라도 조건식을 통과하지 못하면  `false`를 반환하고, 모든 요소가 조건식을 만족하면 `true`를 반환한다.
  - 빈 배열일 경우에는 무조건 `true`를 반환한다.

```js
const animals = ['bears', 'cats', 'dogs', 'elephants', 'giraffes'];
animals.every(animal => animal.length < 5); // false
animals.every(animal => animal.length < 10); // true

const beers = [];
beers.every(beer => beer === ‘beer’); // true
```

**참고:**
  - [Array.prototype.every() - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

## .some()
  - `every()` 메서드와 비슷하면서 다르다.
  - 배열의 요소 중 **단 하나라도** 조건식을 통과하면 `true` 를 반환한다.
  - 빈 배열의 경우는 무조건 `false`를 반환한다.

```js
const nums = [1, 4, 23, 37, 55];
nums.some(num => num > 50); // true
nums.some(num => num > 60); // false

const beers = [];
beers.some(beer => beer === 'beer'); // false
```

**참고:**
  - [Array.prototype.some() - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/some)