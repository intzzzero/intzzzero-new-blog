---
title: "메서드(method)의 약식 표현과 한계"
date: "2020-07-13"
update: "2020-07-13"
draft: false
category: "JavaScript"
path: "/blog/es6-method-expression"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

ES6의 등장으로 말미암아 다양한 문법적 편의성을 누릴 수 있게 되었다. 그 중 하나가 아래와 같은 메서드(method)의 약식 표현이다.

## 메서드 약식 표현(ES6에서 추가)

```javascript
const robot = {
  name: ‘Coderoid’,
  sayHello() { console.log(‘Hello! ‘ + this.name); }
};
```

ES6 이전의 메서드의 표현은 아래와 같았다.

## ES6 이전의 메서드 표현

```javascript
const robot = {
  name: ‘Coderoid’,
  sayHello: function() { console.log(‘Hello! ‘ + this.name); }
};
```

단순히 `key : value`  형태의 유무 정도의 차이로 보이지만, 생각보다 중요한 차이가 있다.
약식표현의 경우 `prototype`을 지니지 않기 때문에 생성자로 사용할 수 없으며 이말은 곧, `new` 연산자를 통한 인스턴스의 생성이 불가하다는 말이기도 하다. 또한, 약식표현은 `super` 키워드를 사용할 수 없다.
