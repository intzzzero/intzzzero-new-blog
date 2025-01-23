---
title: "Data Structure - Dictionary"
date: "2020-06-15"
update: "2020-06-15"
draft: false
category: "Computer Science"
path: "/blog/data-structure-dictionary"
---

## Dictionary
`Dictionary`는 `key : value`가 쌍을 이루는 형태의 자료구조를 말하며, `hash map` 또는 `hash table`이라고도 부른다. 자바스크립트에서는 객체와 JSON이 이러한 형태를 지니고 있다.

위와 같은 `Dictionary`의 자료구조를 만드는 방법으로 자바스크립트에는 아래와 같이 세 가지 방법이 있다.

```js
// how to make dictionary
// 1. literal
dictionary1 = { name: [ 'Ryan', 'Lee' ], job: 'sw engineer', address: { city: 'seoul', zip_code: '1234' } };

// 2. assignement to empty object
dictionary2 = {};
dictionary2['name'] = [ 'Ryan', 'Lee' ];
dictionary2['job'] = 'sw engineer';
dictionary2['address'] = { city: 'seoul', zip_code: '1234' };

// 3. Object method
let dictionary3 = Object({ name: [ 'Ryan', 'Lee' ], job: 'sw engineer', address: { city: 'seoul', zip_code: '1234' } });
```

위의 `Dictionary` 세 개를 각각 콘솔에 출력해보면 모두 동일한 형태와 내용을 지녔음을 알 수 있다.

**참고:**
	- [자바스크립트에서 hash table의 내부구조](https://github.com/benoitvallon/computer-science-in-javascript/blob/master/data-structures-in-javascript/hash-table.es6.js)