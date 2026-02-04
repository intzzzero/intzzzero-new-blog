---
title: "배열(array)를 조작하는 몇 가지 방법"
date: "2020-06-09"
update: "2020-06-09"
draft: false
category: "JavaScript"
path: "/blog/array-control"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 1. 배열 요소의 추가
### 1 - 1. 인덱스를 지정하여 요소 추가
배열의 요소에는 기본적으로 0부터 시작되는 인덱스가 지정되어 있으며, 요소를 추가할 때는 해당 요소의 인덱스와 함께 추가해야 한다.

```js
let beerBox = [];
console.log(beerBox[0]); // undefined

beerBox[] = 'kirin';
console.log(beerBox); // Uncaught SyntaxError: Unexpected token

beerBox[1] = 'kirin';
beerBox[3] = 'stella';

console.log(beerBox); // [empty, "kirin", empty, "stella"]
console.log(beerBox.length); // 4
```

### 1 - 2.  `push`와 `unshift`메서드를 통한 요소 추가
`push`와 `unshift`를 사용하여 배열에 요소를 추가할 수도 있다. 용어에서 알 수 있듯 컴퓨터공학에서 심심치 않게 등장하는 용어들로 각각 스택(stack)과 큐(queue)와 관련된 행동을 한다.

각각의 특징으로는, `push`는 배열의 끝에 요소를 추가하며, `unshift`는 배열의 가장 앞에 요소를 추가한다는 것이다.

```js
let beerBox = [];

beerBox.push('kirin');
console.log(beerBox); // [ 'kirin' ]

beerBox.unshift('stella');
console.log(beerBox); // [ 'stella', 'kirin' ]

beerBox.push('cass', 'hite');
console.log(beerBox); // [ 'stella', 'kirin', 'cass', 'hite' ]

beerBox.unshift('kozel', 'asahi');
console.log(beerBox); // [ 'kozel', 'asahi', 'stella', 'kirin', 'cass', 'hite' ]
```

위의 예제에서 볼 수 있듯이 `unshift`는 배열의 앞으로 요소를 추가한다.

### 1 - 3.  `concat` 메서드를 통한 요소 추가
`concat`은 엄밀히 따지자면 요소를 추가한다기 보다는, **요소를 복사 및 붙여넣기** 한다고 볼 수 있다.

```js
let firstBox = ['cass', 'hite', 'fitz'];
let secondBox = ['asahi', 'kirin', 'stella'];

let thirdBox = firstBox.concat(secondBox);
console.log(thirdBox); // (6) ["cass", "hite", "fitz", "asahi", "kirin", "stella"]

let fourthBox = firstBox.concat('1664 blanc');
console.log(fourthBox); // (4) ["cass", "hite", "fitz", "1664 blanc"]

let fifthBox = firstBox.concat('kozel', 'guinness');
console.log(fifthBox); // (5) ["cass", "hite", "fitz", "kozel", "guinness"]

console.log(firstBox); // (3) ["cass", "hite", "fitz"]
```

위의 예제와 같이 `concat`을 통하여 각각의 배열이 하나의 배열로 합쳐질 수 있으며, 여기서 주의 깊게 볼 것은 원본의 배열은 그대로 남아있다는 것이다.

## 2. 배열 요소의 제거
### 2 - 1. `delete`와 `splice`를 통한 요소의 제거
`delete` 를 사용하면 배열의 요소를 제거할 수 있다. 이때 `delete`는 메서드가 아니라 **연산자**이며, 특정 요소의 인덱스를 지정하여 제거할 수 있다.
다만, 요소만 제거될 뿐, 인덱스는 그대로 남게 되어 해당 인덱스는 `empty`로 채워지게 된다.

```js
let beerBox = ['cass', 'hite', 'fitz', 'asahi', 'kirin', 'stella'];

delete beerBox[2];
console.log(beerBox); // (6) ["cass", "hite", empty, "asahi", "kirin", "stella"]

beerBox.splice(2, 1);
console.log(beerBox); // (5) ["cass", "hite", "asahi", "kirin", "stella"]
```

따라서 `delete`로 요소를 제거한 다음, 해당 인덱스까지 제거하기 위해 `splice` 메서드를 사용한다. `splice` 메서드는 다음과 같은 구조를 하고 있다.

```js
beerBox.splice(제거할 인덱스 시작점, 시작점으로부터의 요소 갯수);
```

### 2 - 2. `pop`과  `shift` 메서드를 활용한 요소의 제거
앞서 요소를 추가할 때 사용했던 `push`와 `unshift` 메서드에는 각각 짝이 있다. 동일한 방식의 작업인데 반대의 결과를 가져오는 메서드로 볼 수 있는데, 그것이 바로 `pop`과 `shift`다. 마찬가지로 `stack`과 `queue`를 배울 때 자주 보게 되는 녀석들이다. 사용법은 아래와 같다.

```js
let beerBox = ['cass', 'hite', 'fitz', 'asahi', 'kirin', 'stella'];

beerBox.pop();
console.log(beerBox); // (5) ["cass", "hite", "fitz", "asahi", "kirin"]

beerBox.shift();
console.log(beerBox); // (4) ["hite", "fitz", "asahi", "kirin"]
```

특이한 점이 있다면, `pop`과 `shift`는 특정 인덱스나 요소를 지정하지 않는다는 것이다. 그 이유는 이들의 특성에 있다. 아래의 예시를 통해 확인해보자.

```js
let beerBox = ['cass', 'hite', 'fitz', 'asahi', 'kirin', 'stella'];

beerBox.pop(0); // "stella"
beerBox.pop('cass'); // "kirin"
console.log(beerBox); // (4) ["cass", "hite", "fitz", "asahi"]

beerBox.shift(-1); // "cass"
beerBox.shift('asahi'); // "hite"
console.log(beerBox); // (2) ["fitz", "asahi"]
```

위와 같이 `pop`과 `shift`는 임의로 지정하는 요소와 별개로 동작한다. `pop`은 맨뒤의 요소부터 차례대로 제거하고, `shift`는 맨앞의 요소부터 차례대로 제거한다.

결론적으로 이들, `push` - `pop`, `unshift` - `shift`는 `stack`과 `queue`의 특성으로 이해하면 된다.
  > ![stack & queue](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-EFEEDn3-3iE%2FWNht0FyF1eI%2FAAAAAAAAIL0%2F9JUoE9jXYd411x91GZFvWY4QRhvzRj-RACEw%2Fs1600%2FDifferenceBetween_C_Stack_Queue.jpg&f=1&nofb=1)
  > 스택(stack)은 **LIFO\(후입선출, Last In First Out\)**의 특성이 있다. 즉, 마지막에 입력된 자료부터 출력된다는 말이다.
  > 반대로 큐(queue)는 **FIFO\(선입선출, First In First Out\)**라는 특성이 있다. 즉, 먼저 입력된 자료부터 출력된다.

## 3. 그 밖의 배열을 조작하는 방법들
### 3 - 1. 요소 가져오기
`slice()`

```js
const myBeer = ['Kirin', 'Stella', 'Guinness'];

let res = myBeer.slice(0, 1);
console.log(res); // ["Kirin"]

res = myBeer.slice(1);
console.log(res); // ["Stella", "Guinness"]

res = myBeer.slice(1, 2);
console.log(res); // ["Stella"]

res = myBeer.slice(-1);
console.log(res); // ["Guinness"]
```

### 3 - 2. 요소 추가 및 제거 동시에 하기
`splice()`

```js
const firstBeerBox = ['Kirin', 'Stella', 'Cass', 'Hite'];

const yourBeer = firstBeerBox.splice(2, 2);

console.log(firstBeerBox); // [ 'Kirin', 'Stella' ]
console.log(yourBeer); // [ 'Cass', 'Hite' ]


const secondBeerBox = ['Kozel', '1664 Blanc', 'Guinness', 'Asahi'];

const myBeer = secondBeerBox.splice(1);

console.log(secondBeerBox); // [ 'Kozel' ]
console.log(myBeer); // [ '1664 Blanc', 'Guinness', 'Asahi' ]
```

### 3 - 3. 요소 교체하기
`copyWithin()`

### 3 - 4. 특정 값으로 채우기
`fill()`

```js
const beer = ['kirin', 'stella', 'cass', 'hite'];

beer.fill('asahi');
console.log(beer); // (4) ["asahi", "asahi", "asahi", "asahi"]
```

### 3 - 5. 배열 정렬과 역순 정렬
`sort()`
`reverse()`

```js
const beer = ['kirin', 'stella', 'cass', 'hite'];

beer.sort();
console.log(beer); // (4) ["cass", "hite", "kirin", "stella"]

beer.reverse();
console.log(beer); // (4) ["stella", "kirin", "hite", "cass"]
```

하지만, `sort`는 유니코드 순서로 정렬한다는 문제가 있다. 그래서 아래와 같이 숫자형 요소를 지닌 배열의 경우 일반적인 방법으로는 마음에 드는 정렬이 완성되지 않는다. 따라서 오름차순대로 정렬되도록 별도의 함수를 사용해야 한다.

```js
const arrNum = [100, 30, 2, 1543, 76, 6, 19, 753];

arrNum.sort();
console.log(arrNum); // (8) [100, 1543, 19, 2, 30, 6, 753, 76]

arrNum.sort((a, b) => a - b);
console.log(arrNum); // (8) [2, 6, 19, 30, 76, 100, 753, 1543]
```

위의 함수는 ES6에서 추가된 **화살표함수**다. 우리 눈에 익숙한 형태인 아래의 함수와 동일한 기능을 한다.

```js
const arrNum = [100, 30, 2, 1543, 76, 6, 19, 753];

arrNum.sort(function (a, b) { return a - b; });
console.log(arrNum); // (8) [2, 6, 19, 30, 76, 100, 753, 1543]
```

또한, 이것을 응용하면 `reverse`의 효과도 낼 수 있다.

```js
const arrNum = [100, 30, 2, 1543, 76, 6, 19, 753];

arrNum.sort((a, b) => b - a);
console.log(arrNum); // (8) [1543, 753, 100, 76, 30, 19, 6, 2]
```

```js
const beerBox = [
  { id: 4, content: 'Kirin' },
  { id: 1, content: 'Stella' },
  { id: 2, content: 'Guinness' }
];

function compare(key) {
  return function (a, b) {
    return a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0);
  };
}

beerBox.sort(compare('id'));
console.log(beerBox);
// 0:{id:1,content:"Stella"}
// 1:{id:2,content:"Guinness"}
// 2:{id:4,content:"Kirin"}

beerBox.sort(compare('content'));
console.log(beerBox);
// 0:{id:2,content:"Guinness"}
// 1:{id:4,content:"Kirin"}
// 2:{id:1,content:"Stella"}
```

**참고:**
- Learning JavaScript (ISBN 9788968483387)
- [poiemaweb.com](http://poiemaweb.com/)
- [MDN | array](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Immersive_Sprint.js Stack & Queue – 이용현 – Medium](https://medium.com/@lyhlg0201/immersive-sprint-js-stack-queue-426ccfbdb602)
