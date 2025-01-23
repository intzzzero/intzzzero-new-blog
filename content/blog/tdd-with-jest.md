---
title: "Jest로 단위 테스트(Unit Test) 시작하기"
date: "2020-07-13"
update: "2020-07-13"
draft: false
category: "JavaScript"
path: "/blog/tdd-with-jest"
---

클린 코드나 실용주의 프로그래머 등을 읽다 보니 **단위 테스트** 의 중요성을 반복적으로 강조하는 것을 볼 수 있었다. 그런데 자바스크립트에서는 아직 단위 테스트가 그렇게 활성화되지 않았는지 관련 자료를 찾아 보기 어려웠고, 인프런에서 발견한 자바스크립트 TDD 인강이 있었지만, 최근의 트렌드와는 거리가 있는 재스민(Jasmine)이라는 테스팅 라이브러리를 통해 소개하고 있었다.
내 나름의 검색을 통해 요즘은 페이스북에서 제작한 테스팅 프레임워크 **Jest** 를 주로 사용한다는 이야기를 보고 Jest를 통해 TDD에 입문하기로 정했다.

![jest](https://miro.medium.com/max/1200/1*Q26gw-kNzOXUqZKRr04T-g.png)

## Jest 설치
간단히 사용법을 익히기 위해 프로젝트를 생성한다.

```bash
mkdir learning-jest
cd learning-jest
npm init -y
```

위의 절차를 진행하면 해당 프로젝트 디렉토리에 node_modules와 package.json이 생성된다. 제대로 생성된 것을 확인했으면 Jest를 설치한다.

```bash
npm i -D jest
```

위와 같이 설치하면 `-D`를 붙였기에 devDependencies로 설치된 것을 확인할 수 있다.
이어서 scripts를 수정하여 테스팅을 쉽게 실행할 수 있도록 한다.

```json
  "scripts": {
    "test": "jest"
  },
```

위와 같이 커맨드 스크립트를 수정하면 `npm test`라고 입력하는 것으로 테스팅을 실행할 수 있다.

## 첫 테스트
테스트 코드를 작성할 `test.js`와 실행코드를 작성할 `App.js`를 생성한다. 먼저 `test.js`에 테스트 코드를 작성한다.

```js
test('return my name', () => {
  expect(getMyName(name)).toEqual(`My name is ${name}`);
});
```

인자로 이름을 전달하면 해당 이름을 특정 문자열과 함께 출력하는 간단한 함수의 테스트 코드다.
`test()` 함수의 첫 번째 인자로는 해당 테스트의 목적을 알 수 있는 내용을 문자열로 넣고, 두 번째 인자로는 콜백이 들어온다.
콜백에서 실행하는 첫 번째 함수인 `expect()`의 인자로 함수명을 넣고, 두 번째 함수인 `toEqual()`의 인자에는 반환되어야 하는 결과를 넣는다.
이 상태에서 터미널에 `npm test`를 실행하면, 당연하게도 빨간색으로 failed가 출력되는 것을 볼 수 있다.

이어서 `App.js`에 테스트 코드를 통과할 수 있는 실행 코드를 작성한다.

```js
const getMyName = name => {
  return `My name is ${name}`;
};
```

그리고, `export`와 `import`를 해야 하는데, 그 동안 리액트에서 했던 방식으로 하면 에러가 발생한다. Jest에서는 다음과 같이 `export`와 `import`를 한다.

```js
// export
module.exports = getMyName;

// import
const getMyName = require('./App');
```

위의 절차를 모두 진행하면 다음과 같은 형태가 될 것이다.

```js
// App.js
const getMyName = name => {
  return `My name is ${name}`;
};

module.exports = getMyName;
```

```js
// test.js
const getMyName = require('./App');

test('return my name', () => {
  expect(getMyName(name)).toEqual(`My name is ${name}`);
});
```

이제, `npm test`를 실행해보자.

![pass](https://github.com/codeAmeba/amebalab/blob/master/src/images/first-test.png?raw=true)

기분 좋은 녹색과 함께 PASS가 되었다.
앞서 사용한 `toEqual()` 이외에도 결과값의 데이터 타입에 따라 적절한 함수들이 있으니 공식문서를 참고하도록 하자.

***

**참고:**
- [Getting Started · Jest](https://jestjs.io/docs/en/getting-started.html)