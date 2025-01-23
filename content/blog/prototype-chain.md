---
title: "프로토타입 체인(prototype chain)"
date: "2020-06-21"
update: "2020-06-21"
draft: false
category: "JavaScript"
path: "/blog/prototype-chain"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 프로토타입(prototype)
자바스크립트의 모든 객체는 `[[Prototype]]`이라고 하는 **내부 슬롯(internal slot)**을 지닌다. 하위 객체는 상위 객체의 `prototype`을 상속받으며, 상속받은 데이터는 `__proto__`에 저장된다.

```js
const myCat = {
  name: 'Lucy',
  sayHello: function() { console.log('Hello! ' + this.name); }
};

const yourCat = {
  name: 'Tom'
};

yourCat.__proto__ = myCat;

const whoseCat = {};
whoseCat.__proto__ = yourCat;

whoseCat.sayHello(); // Hello! Tom
```

## 프로토타입 체인(prototype chain)
위와 같이 `__proto__`를 통해 하위 객체와 상위 객체가 이어져 있으며, 이를 **프로토타입 체인** 이라고 한다. 그리고, 자신과 가까운 객체의 프로퍼티부터 위로 거슬러 올라가며 검색하게 된다.

### Object.getPrototypeOF()
ES 명세에서나 브라우저에서나 `__proto__`를 통한 접근은 권장하지 않는다. 따라서 프로토타입 메서드에 접근해야 할 때에는 `Object.getPrototypeOf()` 또는 `Object.creat()`를 활용하도록 하자.

**참고:**
- [poiemaweb - 프로토타입](https://poiemaweb.com/js-prototype)
- [poiemaweb - 클래스](https://poiemaweb.com/es6-class)
- [코어자바스크립트 - 프로토타입 상속](https://ko.javascript.info/prototype-inheritance)