---
title: "Node.js TIL 02"
date: "2020-08-26"
update: "2020-08-26"
draft: false
category: "Node"
path: "/blog/node-til-02"
---

## Template

클라이언트로부터 받은 데이터를 기반하여 바로 화면(view)을 구성할 수 있는 템플릿(Template)라는 것이다. 대표적인 문법으로는 `ejs`가 있는데, 사용하기에 앞서 관련 패키지를 설치해야 하며,

```bash
npm install ejs --save
```

아래와 같이 서버파일에 어떤 방식으로 화면을 구성할 것인지 설정을 해주어야 한다.

```javascript
app.set("view engine", "ejs")

app.post("/email_post", (req, res) => {
  console.log(req.body.email)
  // res.send('<h1>Welcome ' + req.body.email + '</h1>');
  res.render("email.ejs", { email: req.body.email })
})
```

찾아보니 React의 `jsx` 문법을 템플릿으로 활용할 수도 있다는 것 같다. 완강 후에 꼭 시도해봐야겠다.

- [express-react-views](https://github.com/reactjs/express-react-views)

## CORS

ajax를 통한 POST를 연습하다가 CORS(Cross Origin Resource Sharing)에 의한 통신오류를 만났다. CORS는 현재의 도메인과 다른 도메인으로 리소스를 요청할 경우를 의미하는데, 웹 개발을 하다 보면 가장 흔하게 만나게 되는 오류 중 하나라고 알고있다. 이러한 CORS 오류의 원인에는 보안 상의 이유로 브라우저에서 제한하기 때문이며, 공교롭게도 SPA의 경우는 RESTful API를 통해 비동기 통신으로 주로 이루어지기에 필연적으로 CORS에 제한이 걸린다.

위와 같은 이유들로 CORS 제한을 해제해줄 필요가 있는데, 서버의 응답 헤더의 설정을 `Access-Control-Allow-Origin: *` 이렇게 변경해주는 방법도 있지만, 이미 훌륭한 모듈이 있기에 아래와 같이 설치해주자.

```bash
npm install cors --save
```

그리고, 서버파일에서 모듈을 불러온다.

```javascript
const cors = require("cors")

app.use(cors())

app.get("/form.html", (req, res, next) => {
  res.json({ msg: "this is CORS-enabled for all origins" })
})

app.listen(80, () => {
  console.log("CORS-enabled web server listening on port 80")
})
```

## MySQL 연결

Node.js 서버와 MySQL 데이터베이스를 연결하기 위해서는 `mysql` 패키지를 추가로 설치해야 한다.

```shell
npm install mysql --save
```

그리고 아래와 같이 모듈을 불러온 뒤 설정이 필요하다.

```javascript
const mysql = require("mysql")

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "pw123",
  database: "nodejs",
})

connection.connect()
```

그런데 내 경우엔 연결 후 서버를 구동했을 때 아래와 같은 오류를 만났다.

```shell
 {
  code: 'ER_NOT_SUPPORTED_AUTH_MODE',
  errno: 1251,
  sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client',
  sqlState: '08004',
  fatal: true
}
[nodemon] app crashed - waiting for file changes before starting...
```

메시지를 보면 알 수 있듯 이 오류는 서버측 오류가 아니라 데이터베이스 즉, MySQL에서 출력된 오류다. 따라서 MySQL에 뭔가 인증 관련된 설정을 해줘야 한다는 것을 추측할 수 있었다.
오류 메시지를 기반으로 구글링을 해본 결과 스택오버플로우에서 해결책을 찾을 수 있었다.
MySQL 쿼리에 다음과 같이 작성한다.

```shell
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pw123';
```

정확한 내용은 아직 모르겠지만, 대충 '내가 설정한 비밀번호가 맞으니 접근을 허용해도 좋다'라는 의미라고 추측된다. 그리고, 다음과 같이 MySQL 리프레쉬를 한 번 한다.

```shell
flush privilefes;
```

다시 Node.js 서버를 구동해보면 정상적으로 작동하는 것을 볼 수 있다.

## Database

데이터베이스는 이름 그대로 **'수집한 데이터를 여러 목적으로 활용하기 위해 체계화하고 통합 및 관리하는 데이터의 집합'** 이다.
데이터베이스를 크게 양분하는 두 갈래로는 관계형 데이터모델(RDBMS)와 NoSQL이다. 관계형 데이터베이스는 SQL을 사용하여 데이터를 구조화한 데이터베이스를 말하고, NoSQL은 말 그대로 SQL을 사용하지 않는 모든 데이터베이스를 말한다. 대표적으로 문서 형태로 데이터를 보관하는 MongoDB가 있으며, 그 외에도 Graph의 형태를 하는 데이터베이스 등도 있다. 가장 기본이 되며, 데이터의 입출력이 비교적 원활한 SQL로 시작하는 것을 추천한다.

- [SQL vs NoSQL - Nomad Coders](https://youtu.be/Q_9cFgzZr8Q)
- [SQL Fiddle](http://sqlfiddle.com/)
- [SQLZOO](https://sqlzoo.net/wiki/SQL_Tutorial)
- [SQLBolt](https://sqlbolt.com/)
- [데이터베이스](https://ko.wikipedia.org/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4)
- [SQL기초](https://zzsza.github.io/development/2018/03/18/sql-for-everyone/)
- [NoSQL - 몽고DB](https://poiemaweb.com/mongdb-basics)

## CRUD

Create, Read, Update, Delete의 약자로 데이터 조작에 필요한 4가지 요소를 의미한다. 각 기능에 따라 API를 제작한다.

## 데이터 DB로 전송하기

`<form>` 등의 태그에서 입력된 정보를 데이터베이스에 넣을 때에는 당연히 GET이 아닌 POST를 사용한다. 또한, SQL를 사용하는 관계형데이터베이스라면 **쿼리문** 을 통해 연결된 데이터베이스에 데이터를 넣을 수가 있다.

```javascript
const query = connection.query(
  `INSERT INTO user (email, name, pw) VALUES ('${email}', '${name}', '${password}');`,
  (err, rows) => {
    if (err) {
      throw err
    } else {
      res.render("welcome.ejs", { name: name, id: rows.insertId })
    }
  }
)
```

이때, 위와 같이 일반적인 방식의 INSERT 쿼리문을 통해 데이터를 넣을 수도 있지만, MySQL에서는 아래와 같은 단축표현 방식을 제공하고 있다.

```javascript
router.post("/", (req, res) => {
  const body = req.body
  const email = body.email
  const name = body.name
  const password = body.password
  const sql = { email, name, pw: password }

  const query = connection.query("INSERT INTO user SET ?", sql, (err, rows) => {
    if (err) {
      throw err
    } else {
      res.render("welcome.ejs", { name: name, id: rows.insertId })
    }
  })
})
```

- [mysqljs - Escaping query identifiers](https://github.com/mysqljs/mysql#escaping-query-identifiers)
