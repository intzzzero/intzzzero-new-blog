---
title: "구조 분해 할당(destructured assignment)"
date: "2020-05-27"
update: "2020-05-27"
draft: false
category: "JavaScript"
path: "/blog/destructured-assignment"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

```js
const member = {
  name: ‘codeAmeba’,
  position: 'Front-end',
  skills: ['HTML', 'CSS', 'JavaScript'],
}
```

위와 같은 객체가 있을 때, 객체의 일부만 변수에 할당하여 사용하고 싶은 경우가 종종 있을 것이다. 그리고, 보통은 아래와 같이 할당을 할 것이다.

```js
const name = member.name;
const position = member.position;
const skills = member.skills;
```

물론 이렇게 한다고 큰 일이 일어나지는 않지만, **구조 분해 할당\(destructured assignment\)** 를 활용하면 단 한 줄로 동일한 결과를 낼 수 있다.

```js
const { name, position, skills } = member;
```

이와 같은 구조 분해 할당은 객체의 일부를 저장하는 상황에 국한되지 않는다. **배열의 요소를 저장할 때** 나 **매개변수에 기본값이 필요한 경우** 등에도 유용하게 쓰인다.

```js
let users = [‘codeAmeba’, ‘codeMonkey’];
let [firstUser, secondUser] = users;
console.log(firstUser); // codeAmeba
```

특히, 구조 분해 할당의 몇 가지 포인트만 알면 다양한 상황에 응용이 가능한데, 포인트는 다음과 같다.

1. 할당 연산자 우측에는 모든 이터러블(iterable)이 올 수 있다.
2. 할당 연산자 좌측에는 할당 가능한 모든 것이 올 수 있다.
3. 기본값 설정이 가능하다.

**참고:**
- [구조 분해 할당](https://ko.javascript.info/destructuring-assignment)