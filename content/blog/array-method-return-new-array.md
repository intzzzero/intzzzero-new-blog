---
title: "새로운 배열을 반환하는 배열 메서드"
date: "2020-06-14"
update: "2020-06-14"
draft: false
category: "JavaScript"
path: "/blog/array-method-return-newarray"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 접근자 메서드
배열 메서드는 크게 세 종류로 나눈다.

- **수정 메서드** : 원본 배열을 수정함
- **접근자 메서드** : 배열에 접근하여 새로운 배열을 반환
- **반복 메서드** : 배열의 요소들을 순회하며 작업을 수행

이번 시간에는 주요 **접근자 메서드** 들을 살펴본다.

## join
`join()`은 모든 요소를 문자열로 변환 후 인수로 받은 문자와 연결하여 반환한다.

```js
const fruits = [‘apple’, ‘banana’, ‘melon’, ‘peach’, ‘blueberry’];

console.log(fruits.join(‘-‘));
// apple-banana-melon-peach-blueberry
```

## concat
`concat()`은 인수로 받은 값을 배열에 추가하여 새로운 배열을 생성한다.

```js
const fruits = [‘apple’, ‘banana’, ‘melon’, ‘peach’, ‘blueberry’];

console.log(fruits.concat(‘cherry’, ‘grape’));
// ["apple", "banana", "melon", "peach", "blueberry", "cherry", "grape"]
```

인수를 배열로 전달할 경우에는 자동으로 배열을 해체한 후 합친다.

```js
console.log(fruits.concat([‘cherry’, ‘grape’]));
// ["apple", "banana", "melon", "peach", "blueberry", "cherry", "grape"]
```

그러나, 가장 바깥의 배열만 자동으로 해체하기 때문에 중복된 배열은 배열 그대로 추가된다.

```js
console.log(fruits.concat([‘lemon’, [‘strawberry’, ‘watermelon’]]));
// ["apple", "banana", "melon", "peach", "blueberry", "lemon", [“strawberry”, “watermelon”]]
```

## slice
`slice()`는 선택된 만큼의 요소를 새로운 배열로 반환한다. 두 개의 인수를 받으며, 첫 번째 인수는 **시작 인덱스** , 두 번째 인수는 **끝 인덱스** 다.

`slice(시작, 끝)` : 시작 인덱스의 요소부터 끝 인덱스 바로 앞까지 새로운 배열로 반환한다. 두 번째 인수를 생략 가능하며 그럴 경우 시작 인덱스부터 모든 요소를 배열로 반환한다.

```js
const fruits = [‘apple’, ‘banana’, ‘melon’, ‘peach’, ‘blueberry’];

console.log(fruits.slice(1, 4));
// ["banana", "melon", "peach"]

console.log(fruits.slice(3));
// ["peach", "blueberry"]
```

## indexOf, lastIndexOf
`indexOf()`와 `lastIndexOf()`는 인수로 전달한 요소의 인덱스를 반환한다.
`indexOf()`는 배열 왼쪽부터 검색하고, `lastIndexOf()`는 배열 오른쪽부터 검색하여 반환한다. 만약, 찾는 요소가 배열에 없을 때에는 `-1`을 반환한다.
두 번째 인수는 검색을 시작할 인덱스이며 생략 가능하다.

```js
const numbers = [9, 2, 3, 5, 4, 8, 5, 6, 7];

console.log(numbers.indexOf(5)); // 3
console.log(numbers.lastIndexOf(5)); // 6
```

## toString, toLocaleString
`toString()`과 `toLocaleString()`은 배열의 요소를 문자열로 반환 후 쉼표로 연결하여 반환한다. 둘의 차이는 `toLocaleString()`의 경우 해당 지역에 맞는 문자열로 번역하여 반환한다는 점이다.

```js
const date = new Date();

console.log([‘Seoul’, ‘Republic of Korea’, date].toString());
// Seoul,Republic of Korea,Sat May 09 2020 20:00:19

console.log([‘Seoul’, ‘Republic of Korea’, date].toLocaleString());
// Seoul,Republic of Korea,2020. 5. 9. 오후 8:00:19
```

`Object.prototype`에 동일한 이름을 가진 메서드가 존재하지만, `Array`에 새롭게 정의한 메서드이므로 다른 메서드로 볼 수 있다.

```js
Object.prototype.toString === Array.prototype.toString // false

Object.prototype.toString === Array.prototype.__proto__.toString // true
```

**참고:**
  - [배열과 메서드](https://ko.javascript.info/array-methods)