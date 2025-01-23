---
title: "Node.js TIL 04"
date: "2020-10-11"
update: "2020-10-11"
draft: false
category: "Node"
path: "/blog/node-til-04"
---

## TDD로 만드는 Node.js API 서버

- [인프런 | 테스트주도개발(TDD)로 만드는 NodeJS API 서버](https://www.inflearn.com/course/%ED%85%8C%EC%8A%A4%ED%8A%B8%EC%A3%BC%EB%8F%84%EA%B0%9C%EB%B0%9C-tdd-nodejs-api/dashboard)를 보며 기록함

## 테스트 주도 개발(TDD)

실제 동작하는 코드를 작성하기 전에 앞서 요구사항이 충분히 갖추어졌는지 확인할 수 있는 테스트 코드를 먼저 작성하는 방식의 개발 방법론이다. 테스트 코드 작성 이후에 작성되는 구현 코드는 당연히 테스트에 통과할 수 있도록 작성해야만 하며, 테스트에 통과하는 스펙을 갖춘 뒤에는 리펙토링을 반복하여 코드의 효율성과 가독성을 발전시키는 것에 의의가 있다.

### Node.js에서의 TDD

Node.js에서는 테스트를 위해 다음과 같은 세 가지 라이브러리를 주로 사용한다.

- [Mocha](https://mochajs.org/)
- [Should](https://shouldjs.github.io/)
- [superTest](https://github.com/visionmedia/supertest)

**참고:**

- [Node.js로 만든 API 테스트(supertest) | 김정환 블로그](https://jeonghwan-kim.github.io/dev/2020/05/25/supertest.html)

## Mocha

모카(mocha)는 테스트 코드를 실행해주는 **테스트 러너(Test Runner)** 이고, **테스트 수트(Test Suite)** 는 테스트 환경을 의미하며 모카에서는 `describe()`로 구현한다. **테스트 케이스(Test Case)** 는 실제 테스트를 말하며 모카에서는 `it()`으로 구현한다.

### 환경 구성

`npm install mocha --save-dev`로 모카를 설치한 뒤 손쉽게 테스트를 진행하기 위해 `package.json`의 스크립트를 아래와 같이 수정하는 것이 좋다.

```json
  "scripts": {
    "test": "mocha"
  },
```

### 테스트 코드의 구성

모카를 활용한 테스트 코드의 기본적인 구성은 아래와 같다.

```javascript
const assert = require("assert")

describe("Array", () => {
  describe("#indexOf()", () => {
    it("should return -1 when the value is not present", () => {
      assert.strictEqual([1, 2, 3].indexOf(4), -1)
    })
  })
})
```

단정문 작성을 위해 `assert` 모듈을 가져온 뒤, `describe()` 메서드로 테스트 수트를 만들고, `it()` 메서드로 테스트 케이스를 만든다. 그리고, 단정문을 작성하여 결과를 검증한다. 간단히 부가설명을 하자면, 외부의 테스트 수트는 넓은 범위의 테스트 목적이라고 볼 수 있고, 내부의 테스트 수트는 보다 구체적인 느낌의 테스트 소제목이라고 할 수 있다. 이어서 테스트 케이스는 실제로 검증해야 하는 가장 구체적인 테스트 내용이 자리한다. 코드에서 볼 수 있듯 각 메서드의 첫 번째 파라미터는 해당 규모의 테스트가 진행되는 목적을 설명하고 있다.

테스트 코드를 실행하기 위해 터미널에 `npm test`를 입력하면, 아래와 같은 테스트 결과가 출력되는 것을 볼 수 있다.

```shell
> with-tdd@1.0.0 test /Users/jeongsooyoung/Desktop/etc/node-with-tdd
> mocha



  Array
    #indexOf()
      ✓ should return -1 when the value is not present


  1 passing (3ms)
```

그리고, `strictEqual()`의 두 번째 파라미터에는 기대값이 들어가는데, 이 곳의 값을 -1이 아닌 1로 변경한 뒤 다시 테스트를 실행해보면 아래와 같이 실패하는 것을 볼 수 있다.

```shell
> with-tdd@1.0.0 test /Users/jeongsooyoung/Desktop/etc/node-with-tdd
> mocha



  Array
    #indexOf()
      1) should return -1 when the value is not present


  0 passing (6ms)
  1 failing

  1) Array
       #indexOf()
         should return -1 when the value is not present:

      AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:

-1 !== 1

      + expected - actual

      --1
      +1

      at Context.<anonymous> (test/test.js:6:14)
      at processImmediate (internal/timers.js:456:21)



npm ERR! Test failed.  See above for more details.
```

### test directory

Mocha 공식문서에서는 test 디렉토리를 생성하여 테스트 코드를 이곳에 모아두는 것을 권장하고 있다. 이는 테스트의 편의성을 위함인데, 이렇게 했을 때 `npm test` 명령어만으로도 Mocha가 알아서 테스트 코드를 찾아 실행할 수 있기 때문이다.

만약 test 디렉토리를 생성하지 않고 구현 코드가 담긴 파일과 섞여 있다면, 아래와 같이 Mocha의 경로를 찾아 해당 테스트 코드의 파일명을 적어야 테스트가 실행된다.

```shell
node_modules/.bin/mocha utils.spec.js
```

## Should.js

테스트 코드 작성 시 Node.js에서 제공되는 `assert`모듈 대신 서드파티 라이브러리의 사용을 권장하고 있으며, 그 중 하나가 검증(assertion) 라이브러리인 Should.js다.

**Should.js는 BDD(Behavior Driven Development) 스타일의 Assertion 라이브러리** 로써 마치 일반 문장을 읽는 듯 표현적이고 가독성이 뛰어난 것이 특징이다.

```javascript
const should = require("should")
const utils = require("../utils")

describe("utils.js module's capitalize() is...", () => {
  it("capitalize first letter of string", () => {
    const result = utils.capitalize("hello")
    // assert.strictEqual(result, 'Hello'); -> Node.js의 assertion
    result.should.be.equal("Hello") // -> Should.js의 assertion
  })
})
```

**참고:**

- [should.js : node.js에서 사용할 수 있는 BDD 스타일의 Assertion 모듈](https://blog.outsider.ne.kr/774)
- [Should.js github](https://github.com/tj/should.js/)

## superTest

위의 테스트들은 함수의 기능을 테스트하는 **단위 테스트(Unit Test)** 였지만, superTest를 통해 진행하는 테스트는 **API의 기능을 테스트하는 통합 테스트(Integration Test)** 다.
superTest는 익스프레스 통합 테스트용 라이브러리로써 내부적으로 익스프레스 서버를 구동시켜 실제 요청을 보낸 뒤 결과를 검증한다.

```javascript
// example
const request = require("supertest")
const express = require("express")

const app = express()

app.get("/user", function (req, res) {
  res.status(200).json({ name: "john" })
})

request(app)
  .get("/user")
  .expect("Content-Type", /json/)
  .expect("Content-Length", "15")
  .expect(200)
  .end(function (err, res) {
    if (err) throw err
  })
```

### superTest로 API 테스트 해보기

앞에서 만들었던 `/users` API가 제대로 작동하는 지 테스트할 수 있는 테스트 코드를 superTest로 만들어보자.

```javascript
// index.js
const express = require("express")
const app = express()
const morgan = require("morgan")

const users = [
  { id: 1, name: "Tom" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Mike" },
]

app.use(morgan("dev"))

app.get("/users", (req, res) => {
  res.json(users)
})

app.listen(3000, () => {
  console.log("server start")
})

module.exports = app
```

기존의 `index.js`에서 크게 달라진 부분은 없으나, 테스트가 진행되는 `index.spec.js`에서 불러와야 하기 때문에 위와 같이 `app`을 모듈로써 export 한다.

```javascript
// index.spec.js
const app = require("../index")
const request = require("supertest")

describe("GET /users is", () => {
  it("...", (done) => {
    request(app)
      .get("/users")
      .end((err, res) => {
        console.log(res.body)
        done()
      })
  })
})
```

그리고, `index.spec.js`에 `index.js`와 `supertest`를 불러온 뒤 테스트 코드를 작성한다. 단위 테스트를 작성할 때와 다른 점이라면, `supertest` 모듈을 할당한 `request` 함수를 사용하며, 요청 형식(METHOD)가 체이닝 된다는 것이다. 그리고 요청 후 응답값이 `end()` 메서드의 인자로 들어온다.

또한, Node.js로 만든 서버는 비동기로 동작하기 때문에 테스트 코드 역시 비동기 처리를 해줘야 하는데, 의외로 간단하다. `it()` 함수의 두 번째 파라미터로 들어오는 콜백함수의 인자로 `done`을 넣어주고, 처리가 끝나는 마지막에 `done()`을 호출해주면 이것으로 비동기 처리가 끝난다.

`npm test`를 실행해보면 아래와 같이 서버를 실행하고 데이터를 요청한 뒤 받아오는 것을 볼 수 있다.

```shell
> with-tdd@1.0.0 test /Users/jeongsooyoung/Desktop/etc/node-with-tdd
> mocha

server start


  GET .users is
GET /users 200 1.639 ms - 69
[
  { id: 1, name: 'Tom' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Mike' }
]
    ✓ ...


  1 passing (19ms)
```

**참고:**

- [superTest](https://github.com/visionmedia/supertest)
- [Node.js로 만든 API 테스트(supertest)](https://jeonghwan-kim.github.io/dev/2020/05/25/supertest.html)
