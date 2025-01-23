---
title: "문자열 메소드의 활용"
date: "2020-06-19"
update: "2020-06-19"
draft: false
category: "JavaScript"
path: "/blog/string-method"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

**String 메서드 중에는 정규표현식과 활용하면 보다 유용한 경우가 왕왕 있다.**

## search
인수로 전달한 정규표현식과 일치한 최초 문자열의 첫 번째 문자 위치를 반환하며, 일치하는 문자가 없으면 -1 반환한다.

```js
const randomString = 'Porta Tortor Mollis sit Condimentum Ligula';

console.log(randomString.search(/sit/)); // 20
console.log(randomString.search(/a/)); // 4
console.log(randomString.search(/apple/)); // -1
```

## replace
첫 번째 인수로 받은 문자열을 검색하여 두 번째 인수로 받은 문자열로 교체한다.
**원본 문자열을 수정하지 않음.**

```js
const randomString = 'Porta Tortor Mollis sit Condimentum Ligula';

console.log(randomString.replace(/a/, 'b')); // Portb Tortor Mollis sit Condimentum Ligula
```

`g` 플래그를 설정하지 않으면 첫 문자만 교체함. `replace` 두 번째 인수로 함수를 넘길 수도 있음.

```js
let personalInfo = 'Jane, jane@example.com, 010-1234-5678';
let result = personalInfo.replace(/0(\d{1,4}-\d{1,4}-\d{4})/g, '+82-$1');
console.log(result); // Jane, jane@example.com, +82-10-1234-5678
```

## match
첫 번째 인수로 받은 문자열 또는 정규표현식과 일치하는 문자열을 순서대로 저장하여 배열로 반환하며, **원본 문자열을 수정하지 않음.**

```js
const randomString = 'Porta Tortor Mollis sit Condimentum Ligula';

console.log(randomString.match(/sit/g)); // ["sit"]
```

각종 정보가 혼재된 문자열에서 원하는 정보만 배열에 저장하고 싶을 때 유용함

```js
let url = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

let introduce = '안녕하세요. codeAmeba의 홈페이지는 http://www.codeameba.com/ 입니다.';

console.log(introduce.match(url)[0]); // http://www.codeameba.com/
```

## split
첫 번째 인수를 기준으로 문자열을 나누어 배열에 담아 반환한다. 인수로 문자열, 정규표현식 등이 들어가며, 생략할 경우 원본 문자열 전체를 배열로 반환한다.
**원본 문자열을 수정하지 않음.**

```js
const randomString = 'Porta Tortor Mollis sit Condimentum Ligula';

console.log(randomString.split(' '));
// ["Porta", "Tortor", "Mollis", "sit", "Condimentum", "Ligula"]
```

**참고:**
- [Methods of RegExp and String](https://javascript.info/regexp-methods)