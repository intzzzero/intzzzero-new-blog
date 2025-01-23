---
title: "Database TIL 01"
date: "2020-09-03"
update: "2020-09-03"
draft: false
category: "Database"
path: "/blog/database-til-01"
---

## Database & MySQL

- 인강과 책을 통해 Database와 MySQL을 공부하며 정리
- ([인프런 - DATABASE 1&2 - MySQL](https://www.inflearn.com/course/database-2-mysql-%EA%B0%95%EC%A2%8C#)

## Database

- 핵심은 데이터의 입력과 출력
- CRUD에서 C(create), U(update), D(delete)가 입력, R(read)이 출력
- RDBMS나 NoSQL이나 공통적인 핵심은 CRUD - [DB-Engines Ranking - popularity ranking of database management systems](https://db-engines.com/en/ranking)
- 모든 데이터가 관계형 데이터베이스(RDBMS)에 적합한 것은 아니기 때문에 NoSQL 데이터베이스가 등장했음

## 기본 용어

- 기본적으로 데이터가 기록되는 곳은 Table
- 여러 Table이 담긴 곳이 Database
- 용어를 구분하기 위해 Database 대신 Schema라는 용어를 사용함 - 즉, Table이 그루핑 하는 것이 Schema
- 이 모든 것을 포괄하는 것이 Database server
- Table의 가로축은 row, 세로축은 column

## MySQL

- [MySQL Cheat Sheet · GitHub](https://gist.github.com/bradtraversy/c831baaad44343cc945e76c2e30927b3)
- 핵심은 SELECT -> 가장 많이 사용하고, 다양한 조합이 가능하다.
- WHERE를 빠뜨리면 돌이킬 수 없는 재앙이 일어난다. 특히, UPDATE, DELETE에서는 반드시 필요하므로 한 번 더 확인하는 습관을 갖자.

## 주요 쿼리

### MySQL 서버 접속(로컬)

1. MySQL server start
2. Terminal에서 위치 이동

```shell
cd /usr/local/mysql/bin/
```

3. 해당 위치에서 root 접속 및 비밀번호 입력

```shell
./mysql -uroot -p
```

### 전체 스키마 확인

```shell
SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| learningsql        |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.01 sec)
```

### 데이터베이스 생성

```shell
CREATE DATABASE mydb;
```

### 데이터베이스 삭제

```shell
DROP DATABASE mydb;
```

### 데이터베이스 접속

```shell
USE mydb;
```

### 전체 테이블 조회

```shell
SHOW TABLES;
+-----------------------+
| Tables_in_learningsql |
+-----------------------+
| author                |
| topic                 |
+-----------------------+
2 rows in set (0.00 sec)
```

### 테이블 생성

- 각 column은 이름과 데이터타입이 필수
- 테이블에 존재하는 각 row의 고유값이 PRIMARY KEY이기 때문에 필수이며 보통 id 를 사용함.

```shell
CREATE TABLE mytable(
 id INT(11) NOT NULL AUTO_INCREMENT,
 name VARCHAR(50) NOT NULL,
 email VARCHAR(50) NOT NULL,
 password VARCHAR(20) NOT NULL,
 PRIMARY KEY(id));
```

### 테이블에 데이터 추가

```shell
INSERT INTO mytable (name, email, password) VALUES ('Allen', 'allen@gmail.com', '1234');
```

### 테이블 조회

- `SELECT`는 가장 빈번하게 사용되며 어떤 조건을 넣느냐에 따라 활용도가 무궁무진함
- `WHERE`를 통해 조건을 걸고 데이터를 조회하는 경우가 많으며 `>`, `=`, `NOT`, `AND`, `OR` 등 대부분의 연산자를 사용할 수 있음.
- [MySQL :: MySQL 8.0 Reference Manual :: 12.4 Operators](https://dev.mysql.com/doc/refman/8.0/en/non-typed-operators.html)

```shell
SELECT * FROM mytable;
+----+-------+-----------------+----------+
| id | name  | email           | password |
+----+-------+-----------------+----------+
|  1 | Allen | allen@gmail.com | 1234     |
+----+-------+-----------------+----------+
1 row in set (0.00 sec)

SELECT name, email FROM mytable;
+-------+-----------------+
| name  | email           |
+-------+-----------------+
| Allen | allen@gmail.com |
+-------+-----------------+
1 row in set (0.00 sec)

SELECT * FROM mytable WHERE name="Sally";
+----+-------+-----------------+----------+
| id | name  | email           | password |
+----+-------+-----------------+----------+
|  3 | Sally | sally@gmail.com | 1234     |
+----+-------+-----------------+----------+
1 row in set (0.00 sec)

SELECT * FROM mytable WHERE id >= 2;
+----+-------+-----------------+----------+
| id | name  | email           | password |
+----+-------+-----------------+----------+
|  2 | John  | john@gmail.com  | 1234     |
|  3 | Sally | sally@gmail.com | 1234     |
+----+-------+-----------------+----------+
2 rows in set (0.00 sec)
```

### 테이블의 데이터 삭제

```shell
DELETE FROM mytable WHERE id=2;

SELECT * FROM mytable;
+----+-------+-----------------+----------+
| id | name  | email           | password |
+----+-------+-----------------+----------+
|  1 | Allen | allen@gmail.com | 1234     |
|  3 | Sally | sally@gmail.com | 1234     |
+----+-------+-----------------+----------+
2 rows in set (0.00 sec)
```

### 데이블의 데이터 수정

```shell
UPDATE mytable SET name = 'Smith' WHERE name = 'Allen';
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

SELECT * FROM mytable;
+----+-------+-----------------+----------+
| id | name  | email           | password |
+----+-------+-----------------+----------+
|  1 | Smith | allen@gmail.com | 1234     |
|  3 | Sally | sally@gmail.com | 1234     |
+----+-------+-----------------+----------+
2 rows in set (0.00 sec)
```
