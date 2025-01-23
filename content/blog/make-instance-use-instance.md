---
title: "인스턴스로 인스턴스 만들기"
date: "2020-07-22"
update: "2020-07-22"
draft: false
category: "JavaScript"
path: "/blog/make-instance-use-instance"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 생성자 함수를 지닌 인스턴스

```js
class Person {
  constructor(first, last, age, gender, interests) {
    this.name = {
      first: first,
      last: last
    };
    this.age = age;
    this.gender = gender === 'male' ? 'He' : 'She';
    this.interests = interests; 
  }

  bio = function() {
    console.log(
      `${this.name.first} ${this.name.last} is ${this.age} years old. ${this.gender} likes ${this.interests[0]} and ${this.interests[1]}.`
    );
  };
  greeting = function(myName) {
    console.log(`Hello I'm ${this.name.first}. Nice to meet you ${myName}.`);
  };
}
const john = new Person('John', 'Miles', 32, 'male', ['coding', 'reading']);
const Jane = new Person(‘Jane', 'Carol', 29, 'female', ['painting', 'watching movie']);
```

위와 같은 `class`와 그것을 통해 생성된 인스턴스가 있을 때, **부득이하게 생성자 함수를 예측할 수 없는 상황에서 새로운 인스턴스를 생성해야 하는 경우에 처했다고 가정한다.** 이럴 때에는 프로토타입 체인을 통해 인스턴스 내부에 구현되어 있는 생성자 함수 `constructor`를 쓰면 가능하다.

```js
console.log(jane.__proto__); // {constructor: ƒ}

console.log(jane.constructor);
/*
class Person {
	constructor(first, last, age, gender, interests) {
		this.name = {
			first: first,
			last: last
		};
		this.age = age;
		this.gender = gender === 'male' ? 'He' : 'She';
		this.interests =…
*/
```

인스턴스의 생성자 함수를 콘솔에서 확인해보면 위와 같이 슈퍼클래스의 생성자가 그대로 담겨있는 것을 볼 수 있다. 그리고, 이를 통해 일반적이지 않은 방법으로 새로운 인스턴스를 만들어낼 수 있다.

## 인스턴스로 인스턴스 만들기

인스턴스로 인스턴스를 만들기는 어렵지 않다. 아래와 같이 `new` 키워드와 `constructor()`를 통해 간단히 만들 수가 있다.

```js
const sam = new jane.constructor(‘Sam’, ‘Winchester', 25, 'male', ['singing', 'running']);

console.log(sam.name); // {first: "Sam", last: "Winchester"}
console.log(sam.bio()); // Sam Winchester is 25 years old. He likes singing and running.
console.log(sam.greeting(‘Jane’)); // Hello I'm Sam. Nice to meet you Jane.
```
