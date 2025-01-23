---
title: "What is this?"
date: "2020-06-05"
update: "2020-06-05"
draft: false
category: "JavaScript"
path: "/blog/what-is-this"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

**`this`는 호출하는 방식에 따라 달라지며, 크게 다섯 가지 경우로 나눌 수 있다.**

## 1. 전역에서 this는 언제나 window

```js
console.log(this); // Window
console.log(this === window); // true
```

## 2. 일반 함수 호출은 언제나 window

```js
function normalFunc1() {
  console.log(this);
}
normalFunc1(); // Window

function normalFunc2() {
  function innerFunc() {
    console.log(this);
  }
  innerFunc();
}
normalFunc2(); // Window

// 메소드 내부의 일반 함수에서도 window
// 그러나 화살표 함수는 자동으로 외부 환경에 바인딩 되어 외부 환경이 this로 나온다.

const obj = {
  method: function() {
    function innerFunc() {
      console.log(this);
    }
    innerFunc();
  },
  secondMethod: function() {
    const arrowFunc = () => {
      console.log(this);
    }
    arrowFunc();
  }
}
obj.method();  // Window
obj.secondMethod(); // {e: ƒ, g: ƒ}
```

## 3. 메소드 호출에서의 this는 .(점) 앞에 있는 것. 즉, 메소드가 담긴 객체

```js
const obj = {
  prop: 'Hello world',
  method: function() {
    console.log(this.prop);
  }
}
obj.method(); // Hello world
```

그러나 메소드 내부함수의 경우는 또 얘기가 달라진다. 이때는 일반 함수에서의 this와 마찬가지로 전역을 가리킨다.

```js
var prop = 'This is window';

const obj = {
  prop: 'Bye world',
  method: function() {
    console.log(this.prop);

    function innerFunc() {
      console.log(this.prop);
    }
    innerFunc();
  }
}
obj.method(); // Bye world
              // This is window
```

위와 같은 문제에 대처하기 위한 방법으로 **this를 변수에 할당하는 우회법**이 있다.
그리고, 내부함수를 화살표 함수로 작성하면 외부환경인 메소드의 this를 그대로 바인딩한다.

```js
const obj = {
  prop: 'Nice to meet you world',
  method: function() {
    // this를 that에 할당
    const that = this;
    function innerFunc() {
      console.log(that.prop);
    }
    innerFunc();
  },
  secondMethod: function() {
    const innerArrow = () => {
      console.log(this.prop);
    }
    innerArrow();
  }
}
obj.method(); // Nice to meet you world
obj.secondMethod(); // Nice to meet you world
```

## 4. 콜백에서의 this는 기본적으로는 일반 함수처럼 전역을 가리킨다

```js
const obj = {
  prop: 'This is callback',
  method: function() {
    setTimeout(() => {
      console.log(this.prop);
    }, 1000);
  },
  secondMethod: function() {
    setTimeout(function() {
      console.log(this.prop);
    }.bind(obj), 1000); // <- binding
  }
}

// 화살표 함수로 작성하면 외부 환경에 바인딩
obj.method(); // This is callback
obj.secondMethod(); // This is callback
```

**하지만, call, apply, bind 메서드를 통해 this를 명시적으로 바인딩 할 수 있다.**

```js
function a(x, y, z) {
  console.log(this, x, y, z);
}
var b = {
  c: 'Hello'
};
a.call(b, 1, 2, 3); // {c: "Hello"} 1 2 3
a.apply(b, [1, 2, 3]); // {c: "Hello"} 1 2 3

var c = a.bind(b);
c(1, 2, 3); // {c: "Hello"} 1 2 3

var d = a.bind(b, 1, 2);
d(3); // {c: "Hello"} 1 2 3
```

## 5. 생성자 함수에서의 this는 instance

```js
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }
}
Animal.prototype.whatIsThis = function() {
  console.log(this);
};

const dog = new Animal('Max', 'Dog');
dog.whatIsThis(); // Animal {name: "Max", species: "Dog"}

const cat = new Animal('Alice', 'Cat');
cat.whatIsThis(); // Animal {name: "Alice", species: "Cat"}
```

**참고:**
  - [this | PoiemaWeb](https://poiemaweb.com/js-this)
  - [this - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)
  - [Function.prototype.call() - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
  - [Function.prototype.apply() - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
  - [Function.prototype.bind() - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)