---
title: "함수의 실행 절차"
date: "2020-06-13"
update: "2020-06-13"
draft: false
category: "JavaScript"
path: "/blog/function-execution-process"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 함수의 실행 절차
아래의 예시 코드에서 `console.log()`의 인자가 출력되는 내용을 통해 함수의 실행 절차를 알아보자.

```js
var a = 1;
function outer() {
  console.log(a); // 1

  function inner() {
    console.log(a); // undefined
    var a = 3;
  }

  inner();

  console.log(a); // 1
}

outer();
console.log(a); // 1
```

**위와 같은 코드가 있을 때 내부적인 실행 절차는 다음과 같다.**

1. 전역 실행 컨텍스트 생성
2. 전역 변수 `a` 선언(호이스팅)
3. 외부 함수 `outer` 선언(호이스팅)
4. 변수 `a`에 1 할당
5. `outer` 함수 호출 및 `outer` 실행 컨텍스트 생성
6. 함수 `inner` 선언(`outer` 스코프에서 호이스팅)
7. `outer` 스코프에서 `a` 탐색하지만 찾을 수 없으므로 전역 스코프에서 재탐색 후 1 출력
8. 중첩 함수 `inner` 호출 및 `inner` 실행 컨텍스트 생성
9. 지역 변수 `a` 선언(`inner` 스코프에서 호이스팅)
10. `inner` 스코프에서 `a` 탐색 후 출력하지만 호이스팅만 된 단계이므로 `undefined` 출력
11. 지역 변수 `a`에 3 할당
12. `inner` 실행 컨텍스트 종료
13. 제어권이 `outer` 실행 컨텍스트로 돌아오며 전역 스코프에서 변수 `a` 탐색 후 1 출력
14. `outer` 실행 컨텍스트 종료
15. 전역 스코프에서 변수 `a` 탐색 후 1 출력
