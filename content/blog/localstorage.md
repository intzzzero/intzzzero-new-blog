---
title: "로컬 스토리지(Local Storage)와 세션 스토리지(Session Storage)"
date: "2020-05-28"
update: "2020-05-28"
draft: false
category: "JavaScript"
path: "/blog/localstorage-and-sessionstorage"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

개발자 도구의 Application 탭을 보면, Storage 그룹에서 로컬 스토리지, 세션 스토리지를 확인할 수 있다. 이번 포스팅을 통해 각각의 기능과 차이점을 정리한다.

## 로컬 스토리지(Local Storage)와 세션 스토리지(Session Storage)
로컬 스토리지와 세션 스토리지는 HTML5에서 추가된 저장소로써, `key : value` 형태의 데이터를 담고 있다. 이 둘의 차이점 **영구성** 에 있다. 로컬 스토리지에 저장된 데이터는 사용자가 직접적으로 삭제하지 않는 이상 영구적인 보관이 가능하지만, 세션 스토리지는 브라우저의 창을 닫으면 삭제된다.

여러모로 유용하게 사용할 수 있지만, 클라이언트에 저장되는 만큼 개인정보와 같이 보안이 필요한 데이터를 저장하기에는 적절치 않다. 로컬 스토리지는 `window` 객체에 포함되어있으며, 로컬 스토리지와 세션 스토리지는 동일한 메소드를 갖는다. 데이터를 저장할 때에는 `setItem()`, 불러올 때에는 `getItem()` 사용법은 아래와 같다.

```js
localStorage.setItem('name', 'codeAmeba');
localStorage.getItem('name'); // "codeAmeba"

localStorage.setItem('currentYear', 2020);
localStorage.getItem('currentYear'); "2020"
```

위와 같이 첫 번째 인자로 **key**, 두 번째 인자로 **value**를 전달하면 로컬 스토리지에 저장이 되며, 불러올 때에는 key만 넣는다. 그리고, 어떤 데이터타입을 넣더라도 문자열로 저장된다.

이외에도 특정 데이터를 삭제하는 `removeItem()`, 전체 데이터를 삭제하는 `clear()`가 있다. 만약, value에 객체를 넣어야 할 때에는 `JSON.stringify()`메서드를 활용하여 문자열로 변환 후 저장해야 한다. 그렇지 않으면 객체를 통째로 넣을 수가 없다. 그리고, 그렇게 저장된 데이터를 꺼내올 때에도 역시 `JSON.parse()`를 통해 객체로 변환해야 한다.

```js
localStorage.setItem('robot', JSON.stringify({name: 'coderoid', serialNumber: 1542, author: 'Sooyoung Jeong'}));

JSON.parse(localStorage.getItem('robot'));
// {name: "coderoid", serialNumber: 1542, author: "Sooyoung Jeong"}

// 꺼내올 때 JSON.parse를 하지 않으면 문자열로 나온다.
localStorage.getItem('robot');
// "{"name":"coderoid","serialNumber":1542,"author":"Sooyoung Jeong"}"

// JSON으로 변환하지 않으면 아래와 같이 된다.
localStorage.setItem('obj', {a: 1, b: 2, c: 3});
localStorage.getItem('obj'); // "[object Object]"
```

**참고:**
- [(HTML&DOM) 로컬스토리지, 세션스토리지 - 그리고 쿠키 - ZeroCho Blog](https://www.zerocho.com/category/HTML&DOM/post/5918515b1ed39f00182d3048)
- [What is the difference between sessionstorage, localstorage and Cookies? - Quora](https://www.quora.com/What-is-the-difference-between-sessionstorage-localstorage-and-Cookies)
- [html - Local Storage vs Cookies - Stack Overflow](https://stackoverflow.com/questions/3220660/local-storage-vs-cookies/3220802#3220802)
