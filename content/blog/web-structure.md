---
title: 웹 사이트의 구조와 웹 접근성
date: "2020-05-30"
update: "2020-05-30"
draft: false
category: "HTML"
path: "/blog/web-structure"
---

![neon sign](https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)

## 웹 사이트의 구조

웹 사이트는 다음과 같은 세 개의 언어로 이루어진다.

- **HTML** : Hyper Text Markup Language를 뜻하며, 웹 페이지의 틀을 잡는 문서 형태의 언어. HTML은 아래와 같은 형태를 지닌다.

```html
<!DOCTYPE html>
<html lang="ko-KR">
  <head>
    <meta charset="UTF-8" />
    <title>HTML의 기본 형태</title>
  </head>
  <body>
    <h1>HTML</h1>
    <p>여는 태그와 닫는 태그 사이에 내용을 넣는 형태가 일반적</p>
  </body>
</html>
```

- **CSS** : Cascading Style Sheets를 뜻하며, HTML에 종속(Cascade)되어 웹 문서를 꾸며주는 역할을 한다. CSS아래와 같은 형태를 지닌다. HTML의 `<head></head>`가 끝나기 전에 `<style></style>`로 삽입하거나 `<link rel="stylesheet" href="style.css">`처럼 CSS파일을 별도로 만들어 링크를 하기도 한다. 효율성 측면에서 후자를 많이 쓴다.

```css
h1 {
  color: deeppink;
  font-size: 1.5rem;
  font-weight: 800;
}
p {
  color: darkslategray;
  font-style: italic;
}
```

- **JavaScript** : HTML과 CSS로만 이루어진 웹 페이지를 ‘정적 페이지’라고 부르며, 여기에 JavaScript가 더해져 ‘동적 페이지’가 된다. 참고로, JAVA와는 아무 관련이 없다. 아래와 같은 형태를 취하며, `<head></head>` 혹은 `<body></body>`에 위치할 수 있지만, 위에서 아래로 한 줄씩 실행되기 때문에 보통 `<body></body>`의 가장 아래에 위치한다. CSS와 마찬가지로 별도의 파일을 만들어 링크할 수 있다.

```js
console.log("Hello World!"); //Hello World! 알림창
```

## 웹 표준(Web Standard)

웹 사이트는 **W3C\(World Wide Web Consortium\)** 가 정한 ‘웹 표준’을 준수하여 제작되어야 하며, 이것은 브라우저의 종류 및 버전에 따른 호환이 가능하도록 제시된 표준 지침으로, 특정 플랫폼이나 기기에 치우치지 않고 동일하게 구현되도록 최적화 하는 것에 의의가 있다. 웹 표준을 준수해야 하는 가장 큰 근거는 ‘웹 접근성(Web Accessibility)’에 있다.

> 웹 표준 관련 참고 도서: 제프리 젤드만(Jeffrey zeldman)의 **웹 표준 가이드**

## 웹 접근성(Web Accessibility)

WWW(World Wide Web)의 창시자 **팀 버너스 리\(Tim Berners-Lee\)**는, “웹이란, 장애에 구애 받지 않고 모든 사람이 손쉽게 정보를 공유할 수 있는 공간”이라고 정의 하였으며, 이에 기초하여 내부적, 외부적 장애 요인에 무관하게 누구나 이용 가능할 수 있도록 웹 사이트를 설계하는 것이 ‘웹 접근성’을 고려한 설계이다. > 관련 포스팅: [웹 접근성과 웹의 본질 - codeAmeba](https://intzzzero.netlify.app/web-accessibility)
