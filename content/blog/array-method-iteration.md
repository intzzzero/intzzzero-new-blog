---
title: "모든 요소에 특정 작업을 수행하는 반복 배열 메서드"
date: "2020-06-13"
update: "2020-06-13"
draft: false
category: "JavaScript"
path: "/blog/array-method-iteration"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 반복 메서드
배열 메서드는 크게 세 종류로 나눈다.

- **수정 메서드** : 원본 배열을 수정함
- **접근자 메서드** : 배열에 접근하여 새로운 배열을 반환
- **반복 메서드** : 배열의 요소들을 순회하며 작업을 수행

이번 시간에는 주요 **반복 메서드** 들을 살펴본다.

## 반복 메서드의 공통 성질
1. 반복 메서드의 인수로 전달한 함수는 배열의 모든 요소들에 호출되어 적용되며, 희소 배열의 경우 비어있는 요소는 건너뜀
2. 반복 메서드 대부분은 첫 번째 인수로 함수를 받으며, 이 함수에는 **최대 세 개의 인수** 를 전달할 수 있다. 첫 번째 인수만 전달하는 경우가 많으며, 각각의 인수는 다음과 같다.
  - 첫 번째 인수(value): 현재 처리하는 요소의 값
  - 두 번째 인수(index): 현재 처리하는 요소의 인덱스
  - 세 번째 인수(array): 메서드가 적용되는 배열의 참조
3. `reduce`와 `reduceRight`를 제외한 반복 메서드에는 두 번째 인수를 지정할 수 있다. 두 번째 인수는 첫 번째 인수로 받은 함수 안의 `this`값이며 생략 가능하다.

## forEach
`forEach()`는 인수로 받은 함수를 요소 하나 하나마다 실행한다.

```js
const fruits = [‘apple’, ‘banana’, ‘melon’, ‘peach’, ‘blueberry’];

fruits.forEach((fruit) => console.log(`I Love ${fruit}`));
// I Love apple
// I Love banana
// I Love melon
// I Love peach
// I Love blueberry

fruits.forEach((fruit, index) => {
  console.log(`${fruit} is ${index + 1}th fruit.`);
});
// apple is 1th fruit.
// banana is 2th fruit.
// melon is 3th fruit.
// peach is 4th fruit.
// blueberry is 5th fruit.
```

## map
`map()`은 인수로 받은 함수를 요소별로 한 번씩 실행하며, 함수가 반환한 값으로 새로운 배열을 생성한다. `map()`의 인수로 넘기는 함수는 반드시 값을 반환해야 한다.

```js
const fruits = [‘apple’, ‘banana’, ‘melon’, ‘peach’, ‘blueberry’];
const myFruits = fruits.map((fruit) => fruit.toUpperCase());
console.log(myFruits); 
// [“APPLE”, “BANANA”, “MELON”, “PEACH”, “BLUEBERRY”]

const numbers = [1, 4, 9, 16, 25];
const sqrt = numbers.map(Math.sqrt);
console.log(sqrt); // [1, 2, 3, 4, 5]

const persons = [
  {name: ‘Tom’, age: 17},
  {name: ‘James’, age: 19},
  {name: ‘Sam’, age: 15}
];
const names = persons.map(person => person.name);
const ages = persons.map(person => person.age);
console.log(`names: ${names} / ages: ${ages}`);
// names: Tom,James,Sam / ages: 17,19,15

console.log(persons.map(person => person.name).map(name => name.length));
// [3, 5, 3]
```

## filter
`filter()`는 조건에 충족하는 요소만 걸러 새로운 배열로 반환한다.

```js
const fruits = [‘apple’, ‘banana’, ‘melon’, ‘peach’, ‘blueberry’];

const includeM = fruits.filter((fruit) => fruit.includes(‘m’));
console.log(includeM); // [“melon”]

const longerThan5Length = fruits.filter(fruit => fruit.length > 5);
console.log(longerThan5Length); // [“banana”, “blueberry”]
```

## reduce
`reduce()`는 배열을 기반으로 하나의 값을 도출할 때 사용한다. reduce의 인수로 넘기는 함수의 첫 번째 인수는 **accumulator(누산기)** 라고 할 수 있으며, 함수의 결과가 누적되어 저장되고 마지막 함수까지 호출되면 이 값이 `reduce()`의 반환값이 된다.

```js
const myNums = [1, 5, 3, 7, 9, 2];
const result = myNums.reduce((sum, current) => sum + current, 0);
console.log(result); // 27
```

`reduce()`에 전달된 함수는 위와 같이 두 개의 인수를 받는 게 일반적이다.
위 코드의 실행 절차에 따른 `sum`과 `current`의 상태 변화는 다음과 같다.

1. `sum = 0` / `current = 1`
2. `sum = 0 + 1` / `current = 5`
3. `sum = 0 + 1 + 5` / `current = 3`
4. `sum = 0 + 1 + 5 + 3` / `current = 7`
5. `sum = 0 + 1 + 5 + 3 + 7` / `current = 9`
6. `sum = 0 + 1 + 5 + 3 + 7 + 9` / `current = 2`
7. `return sum = 0 + 1 + 5 + 3 + 7 + 9 + 2`

끝의 `0`은 `reduce()`의 마지막 인수로 초깃값을 뜻하며 `sum`에 할당된다. 

```js
let arr = [1, 4, 6, 9];
let newResult = arr.reduce((sum, current) => sum + current);
console.log(newResult); // 20

let emptyArr = [];
let newResult = emptyArr.reduce((sum, current) => sum + current);
console.log(newResult); // TypeError: Reduce of empty array with no initial value
```

초깃값을 생략할 경우 배열의 첫 번째 요소를 초깃값으로 사용한다. 다만, 배열이 비었을 경우 초깃값으로 사용할 요소가 없기 때문에 `error`가 발생한다.

이러한 `reduce()`의 특성을 활용하면 꼭 요소들의 합 뿐만 아니라 다양한 방법으로 사용할 수 있다.

```js
let a = [3, 6, 7, 2];

// 모든 배열 요소의 곱
console.log(a.reduce((pre, val) => pre * val)); // 252

// 배열 요소 중 가장 큰 값
console.log(a.reduce((pre, val) => pre > val ? pre : val)); // 7

let names = ['Tom', 'Jane', 'Sam'];

// 문자열 연결
console.log(names.reduce((pre, val) => pre + ' ' + val)); // Tom Jane Sam
```

### reduceRight
`reduce()`와 유사한 메서드로 `reduceRight()`가 있다. 원리와 사용법은 동일하며 배열의 오른쪽 요소부터 작업을 수행한다는 점이 다르다.

**참고:**
  - [배열과 메서드](https://ko.javascript.info/array-methods)