---
title: "JSX와 Component"
date: "2020-06-14"
update: "2020-06-14"
draft: false
category: "React"
path: "/blog/react-jsx-and-component"
---

## JSX
리액트는 JavaScript 같기도 하고 HTML 같기도 한 특이하고 고유한 문법을 사용한다. 이를 **JSX** 라고 하는데, 공식문서에서는 **JavaScript 확장 문법** 이라고 밝히고 있다.

```jsx
const greeting = <h1>Hello</h1>;
```

타 프레임워크, 라이브러리가 MVC, MVVM 등 웹앱의 겉과 속을 나누는 식의 철학을 갖고 있는 반면, 오로지 View에만 집중하는 리액트의 철학을 고려한다면, 데이터와 UI가 직접적으로 연결되어 있는 듯한 JSX는 그러한 리액트의 지향점이 잘 녹아있는 형태의 문법이라고 생각된다.

물론 JSX는 브라우저에 직접적으로 적용될 수 없다. 오직 리액트 프로젝트 내부에서만 존재할 수 있는 문법이며, 배포 전 번들링 과정에서 babel을 통해 JavaScript로 컴파일 되는 과정을 거친다. 처음에는 꽤 낯선 형태의 문법이지만 몇 가지 규칙을 숙지하고 몇 차례 작성하다 보면 금방 친숙해지는 것이 JSX이기도 하다.
다음은 JSX에서 **반드시 지켜야 하는 규칙** 들이다.

### 1. HTML, CSS 속성은 camelCase로 작성하라
JSX에서는 HTML과 CSS의 속성도 지정할 수 있는데, 한 가지 다른 점이라면 `camelCase`로 변경해야 한다는 것이다. 이는 권장 사항이 아니라 강제 사항이라 어길 경우 해당 속성에 값이 적용되지 않는다.

```jsx
const nameBox = <div style={ backgroundColor: 'black' }>{name}</div>
```

### 2. 태그는 꼭 닫아라
JSX에서 모든 태그는 `/`를 사용하여 꼭 닫아야만 한다. 이 규칙은 태그가 쌍을 이루지 않는 **셀프 클로징 태그** 에도 동일하게 적용된다.

```jsx
<img src={this.props.src} alt={this.props.name} />
```

### 3. 모든 요소를 감싸는 최상단의 태그

```jsx
render() {
  return (
    <h1>hello</h1>
    <h2>my name is {name}</h2>
  );
}
```

위의 코드는 컴파일 과정에서 오류를 발생시킨다. 왜냐하면 JSX의 모든 요소는 최상단의 부모 태그가 감싸고 있어야만 하기 때문이다. 따라서 아래와 같이 수정해야 컴파일이 무사히 완료될 것이다.

```jsx
  return (
    <div>
        <h1>hello</h1>
        <h2>my name is {name}</h2>
    </div>
  );
```

이와 같이 최상단의 부모 태그가 필수적인 이유는, 리액트의 핵심 기술이라고 할 수 있는 Virtual DOM이 컴포넌트의 변화를 감지하고 기존과 달라진 부분을 비교할 수 있도록 **단 하나의 꼭지점을 지닌 DOM Tree 구조를 이루고 있어야 하기 때문이다.**

**참고:**
- [React | JSX](https://ko.reactjs.org/docs/introducing-jsx.html)

## Component
컴포넌트는 재사용이 가능한 UI라고 볼 수 있으며, 리액트의 핵심 개념이다. 컴포넌트를 만드는 방법으로는 두 가지가 있다. **첫째, 클래스\(class\)형 컴포넌트** , **둘째, 함수형 컴포넌트** 가 그것이다.

### 클래스형 컴포넌트

```jsx
import React from 'react';

class Greeting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count = 0
    };
  }
  render() {
    const name = 'codeAmeba';
    return (
      <div>
        <h1>Hello</h1>
        <h2>my name is {name}</h2>
      </div>
    );
  }
}

export default Greeting;
```

클래스형 컴포넌트는 위와 같이 ES6에서 등장한 class의 형태를 지니고 있으며, `render() {}`가 반드시 포함되어야 한다.

Hooks가 등장하기 전까지는 오직 클래스형 컴포넌트에서만 state와 라이프사이클 API를 통한 상태관리가 가능했지만, 현재는 Hooks의 등장으로 말미암아 함수형 컴포넌트도 클래스형 컴포넌트의 기능을 동일하게 사용 가능하다.

### 함수형 컴포넌트

```jsx
import React from 'react';

function Greeting(props) {
  return <h1>Hello {props.name}</h1>;
}

export default Greeting;
```

함수형 컴포넌트는 기본적으로 위와 같은 형태를 지녔으며, 아래와 같이 화살표 함수를 사용할 수도 있다.

```jsx
const Greeting = (props) => {
  return <h1>Hello {props.name}</h1>;
}
```

**참고:**
- [React | Component](https://ko.reactjs.org/docs/components-and-props.html)