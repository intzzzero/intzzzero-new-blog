---
title: "Data Structure - Set"
date: "2020-06-15"
update: "2020-06-15"
draft: false
category: "Computer Science"
path: "/blog/data-structure-set"
---

## Set
`Set`는 다음과 같은 특징을 갖는다.
- 데이터를 비순차적으로 저장할 수 있다. (순서가 상관 없다는 것)
- 삽입하는 순서가 저장되는 순서가 아니다.
- 수정이 가능하다.
- 고유값을 지니기 때문에 동일한 값을 삽입하면 덮어 씌워진다.

```js
let beerSet = new Set([ 'cass', 'goose', 'terra', 'cass' ]);
console.log(beerSet);
// Set(3) {"cass", "goose", "terra"}
// 중복되는 cass는 하나만 포함된 것을 볼 수 있음

beerSet.add('terra');
beerSet.add('kozel');
console.log(beerSet);
// Set(4) {"cass", "goose", "terra", "kozel"}
// 중복된 값인 terra는 무시되고, 새로운 값 kozel은 제대로 추가된 것을 볼 수 있음
```

위와 같은 `Set`의 특징은 아래와 같이 활용 가능하다.

```js
// 중복 여부 확인
function isDuplicated(arr) {
  var mySet = new Set(arr);
  return mySet.size < arr.length;
}
console.log(isDuplicated([ 1, 1, 2, 3 ])); // true
console.log(isDuplicated([ 1, 2, 3 ])); // false

// 고유값으로 배열 생성
function uniqueElements(list1, list2) {
  var mySet = new Set(list1.concat(list2));
  return Array.from(mySet);
}
console.log(uniqueElements([ 1, 2, 4, 5 ], [ 2, 3, 5, 6 ]));
// (6) [1, 2, 4, 5, 3, 6]
```

**참고:**
	- [자바스크립트에서 Set의 내부구조](https://github.com/codeAmeba/computer-science-in-javascript/blob/master/data-structures-in-javascript/set.es6.js)
