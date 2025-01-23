---
title: "자바스크립트 배열(array)의 기본 사항"
date: "2020-05-20"
update: "2020-05-20"
draft: false
category: "JavaScript"
path: "/blog/array-basic"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

자바스크립트에서 배열은 무척 중요한 **객체(object)** 이며, 이를 통해 다양한 작업들을 수행할 수 있다. 기본적인 사항들은 다음과 같다.

### 첫째
객체는 순서가 없지만, 배열은 순서가 있는 데이터의 집합이며 0부터 시작하는 숫자형 인덱스를 사용한다.

```js
let beerCollection = [];

console.log(beerCollection[1]); // undefined
console.log(beerCollection.length); // 0
console.log(typeof beerCollection); // object
```

### 둘째
자바스크립트의 모든 데이터 타입이 배열의 요소가 될 수 있다. 즉, 배열의 요소로 또다른 배열을 포함한다거나, 객체나 함수까지 하나의 배열에 포함할 수 있다.

```js
let beerCollection = [
  'kirin', // string
  3, // number
  ['oneBottle', 'twoBottle', 'threeBottle'], // array
  function drinkBeer() {}, // function
  { name: 'stella', country: 'Belgium' } // object literal
];

console.log(beerCollection);
// 콘솔에서 아래와 같이 확인할 수 있다.
/*
(5)["kirin", 3, Array(3), ƒ, {…}]
0:"kirin"
1:3
2:(3)["oneBottle","twoBottle","threeBottle"]
3: ƒ drinkBeer()
4:{name:"stella",country:"Belgium"}
length:5
__proto__:Array(0)
*/
```

### 셋째
배열은 기본적으로 `length` 프로퍼티를 가지며, 이것은 요소의 개수를 나타낸다.

```js
let beerCollection = [
  'kirin', 'stella', 'asahi', 'cass', 'sapporo', 'kozel'
];

console.log(beerCollection.length); // 6
```

### 넷째
배열의 길이(length)보다 큰 인덱스로 요소를 할당하면 배열은 자동으로 길이가 늘어나며, 비어있는 인덱스에는 `empty`가 채워진다.

```js
let beerCollection = [
  'kirin', 'stella', 'asahi', 'cass', 'sapporo', 'kozel'
];

beerCollection[9] = '1664 blanc';
console.log(beerCollection.length); // 10
console.log(beerCollection);
// 콘솔에서 아래와 같이 확인할 수 있다.
/*
(10)["kirin", "stella", "ashai", "cass", "sapporo", "kozel", empty × 3, "1664 blanc"]
0:"kirin"
1:"stella"
2:"asahi"
3:"cass"
4:"sapporo"
5:"kozel"
9:"1664 blanc"
length:10
__proto__:Array(0)
*/
```

### 다섯째
`Array` 생성자로 배열을 만들 수도 있다. 하지만, 그런 경우는 드물다.

```js
let beerCollection = new Array(5);

console.log(beerCollection); // (5) [empty × 5]
```

**참고:**
- Learning JavaScript (ISBN 9788968483387)
- [poiemaweb | 배열](https://poiemaweb.com/js-array)
- [MDN | Array](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array)