---
title: "데이터 타입(Data type)의 구분과 이유"
date: "2020-06-03"
update: "2020-06-03"
draft: false
category: "JavaScript"
path: "/blog/data-type"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 데이터 타입(Data Type)
데이터 타입은 프로그래밍 언어의 가장 기본적인 구성 요소이며, 자바스크립트 역시 다양한 데이터 타입을 갖고 있다.
자바스크립트의 데이터 타입은 크게 두 종류로 나눌 수 있는데, 원시 타입(Primitive Type)과 객체 타입(Object Type)이 바로 그것이다. 그리고 원시 타입은 다시 여섯 종류로 나누어진다.

### 원시 타입(Primitive Type)
- Number
- String
- Boolean
- Undefined
- Null
- Symbol

### Object Type
- Object

## 데이터 타입을 구분하는 이유
일반적인 프로그래밍 언어는 자바스크립트처럼 값으로 데이터 타입을 구분하지 않고, 변수 키워드를 통해 구분한다. 대표적으로 int, float, str 등이 그렇다. 하지만 자바스크립트는 데이터 타입과 상관 없이 var, let, const 세 개의 변수 키워드로 모든 데이터 타입을 정의할 수 있다. 그렇다고 해서 데이터 타입의 구분도 필요 없는 것은 아닌데, 자바스크립트 엔진은 평가된 값에 따라 데이터 타입을 나눈다.

```js
var num = 1; // Number
var num = '1'; // String
```

이처럼 데이터 타입을 구분하는 가장 큰 이유는 메모리 공간 확보에 있다. 값은 2진수로 메모리에 저장되며 변수는 해당 메모리 공간의 주소값을 가리키게 되는데, 이때 필요한 최소 메모리 공간이 데이터 타입에 따라 다르다. 이외에도 데이터 타입이 필요한 이유에는 몇 가지가 더 있는데 크게 세 가지의 이유를 들자면 아래와 같다.

- 값을 저장할 때 확보해야 하는 메모리 공간의 크기를 결정하기 위해
- 값을 참조할 때 한번에 읽어 들여야 할 메모리 공간의 크기를 결정하기 위해
- 메모리에 읽어 들인 2진수를 어떻게 해석해야 할지 결정하기 위해

**참고:**
- [poiemaweb | 데이터 타입과 변수](https://poiemaweb.com/js-data-type-variable)
- [MDN | 자바스크립트의 자료형](https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures)
- [코어자바스크립트 | 자료형](https://ko.javascript.info/types)