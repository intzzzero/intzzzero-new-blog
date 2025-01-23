---
title: "좋은 URI(Uniform Resource Identifier) 설계"
date: "2021-05-28"
update: "2021-05-28"
draft: false
category: "Network"
path: "/blog/what-is-good-uri"
---

## 좋은 URI(Uniform Resource Identifier) 설계

### 리소스?

- 예를 들어 ‘회원정보조회 API’가 있다면, ‘회원’이라는 개념 자체가 바로 리소스

### 리소스를 어떻게 식별해야 할까

- 등록, 조회, 수정 등은 배제하고 오로지 ‘회원’이라는 리소스만 식별하면 된다. 회원 리소스를 URI에 매핑하는 것이다.
- URI리소스만 식별하며, 리소스의 행위(ex: 조회, 등록, 삭제, 수정)를 포함하면 안 된다.
- 행위는 HTTP method를 통해 식별한다.
- GET, POST, PUT, PATCH, DELETE

### URI 설계의 예외상황

- 리소스만으로 URI를 설계하면 가장 이상적이나 현실적인 한계가 있다. 이럴 때는 예외적으로 URI에 동사가 포함된 ‘컨트롤 URI’를 설계하기도 한다.

### POST의 다양한 쓰임새

- POST단순히 새로운 정보 등록에만 쓰이지 않는다.
- JSON 형태의 body를 가질 수 있게 때문에 GET으로 처리할 수 없는 다양한 문제들에 쓰일 수 있다.
- ex) [결제완료 -> 배달시작 -> 배달완료]와 같이 단순한 값 추가, 변경을 넘어 프로세스의 상태가 변경되는 경우

### PUT과 POST의 차이

- PUT은 이미 존재하는 리소스를 대체하며, 리소스가 없을 경우 생성한다.
- 클라이언트에서 해당 리소스의 path를 알고 있을 때 사용한다. - ex) /members/10

### PUT과 PATCH의 차이

- PUT은 리소스 전체를 대체하기 때문에 전송하지 않은 필드는 사라지며, 부분 변경에는 PATCH를 쓴다.
- ex) 아래와 같은 원본 데이터가 있을 때

```json
{
  "name": "sooyoung",
  "age": 34,
  "gender": "male"
}
```

- PUT으로 이름만 `{"name": "intzero"}` 전송했을 경우 해당 리소스는 아래와 같이 업데이트된다.

```json
{
  "name": "intzero",
  "age": null,
  "gender": null
}
```

- PATCH로 동일하게 이름만 전송했을 때에는 아래와 같이 업데이트된다.

```json
{
  "name": "intzero",
  "age": 34,
  "gender": "male"
}
```
