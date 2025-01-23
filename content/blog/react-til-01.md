---
title: "React TIL 01"
date: "2020-06-05"
update: "2020-06-05"
draft: false
category: "React"
path: "/blog/react-til-01"
---

## React TIL 01
- 리액트는 Virtual DOM
	- [번역 리액트에 대해서 그 누구도 제대로 설명하기 어려운 것  – 왜 Virtual DOM 인가? | VELOPERT.LOG](https://velopert.com/3236)
- JSX라는 리액트만의 문법이 존재함.
	- JS와 HTML이 섞인 듯한 느낌
	- 두 단어 이상의 결합은 모두 카멜케이스(ex: className, backgroundColor)
- 한 파일에 여러 컴포넌트가 들어올 수도 있음.

```js
function Potato() {
  return <h3>I love potato</h3>
}

function App() {
  return (
    <div>
      <h1>Hello</h1>
      <Potato />
    </div>
  );
}
```

- props
	- [누구든지 하는 리액트 4편: props 와 state | VELOPERT.LOG](https://velopert.com/3629)
- 자바스크립트의 문법을 대부분 그대로 쓸 수 있음

```js
import React from 'react';

function Beer({ name }) {
  return <h1>I love { name }</h1>
}

const BeerBox = [
  {
    name: 'Terra'
  },
  {
    name: 'Cass'
  },
  {
    name: 'Hite'
  },
  {
    name: 'Fitz'
  }
]

function App() {
  return (
    <div>
      {BeerBox.map(item => (
        <Beer name={item.name} />
      ))}
    </div>
  );
}

export default App;
```