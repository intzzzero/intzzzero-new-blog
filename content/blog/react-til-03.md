---
title: "React TIL 03"
date: "2020-06-07"
update: "2020-06-07"
draft: false
category: "React"
path: "/blog/react-til-03"
---

## React TIL 03
- 컴포넌트에서 다루는 데이터는 두 종류
	- props : 부모 컴포넌트가 자식 컴포넌트에게 주는 값
	- state : 컴포넌트 내부에서 선언하고 내부에서 값을 변경할 수 있음.
- 받아온 props 값은 this로 조회 가능함
- 함수형 컴포넌트와 클래스형 컴포넌트의 주요 차이점
	- 함수형에는 state와 life cycle이 빠져있음
	- 함수형은 초기 마운트 속도가 약간 빠르고 불필요한 부분이 없어서 메모리를 덜 차지함

### 클래스형 컴포넌트
  - render() 필수

```js
class MyName extends Component {
  static defaultProps = {
    name: 'codeAmeba'
  }
  render() {
    return (
      <div>
        hello. My Name is {this.props.name}
      </div>
    )
  }
}
```

### 함수형 컴포넌트

```js
const MyName = ({name}) => {
  return <div>Hello. My Name is {name}</div>;
};

MyName.defaultProps = {
  name: 'codeAmeba'
};
```

- 동적인 데이터를 다룰 때에는 state를 사용함(ex: counter)
  - state는 클래스형 컴포넌트에서만 가능했으나 현재는 Hooks를 통해 함수형 컴포넌트에서도 상태관리 가능

```js
class App extends React.Component {
  state = {
    count: 0
  };
  plus = () => {
    this.setState({
      count: this.state.count + 1
    });
  };
  minus = () => {
    this.setState({
      count: this.state.count - 1
    });
  };
  render() {
    return (
      <div>
        <h1>The number is {this.state.count}</h1>
        <button onClick={this.plus}>Plus</button>
        <button onClick={this.minus}>Minus</button>
      </div>
    );
  }
}
```

- 위의 경우는 state를 변경하기 때문에 좋은 방법은 아님,
- 아래와 같이 current의 사용을 권함

```js
  plus = () => {
    this.setState(current => ({ count: current.count + 1 }));
  };
  minus = () => {
    this.setState(current => ({ count: current.count - 1 }));
  };
```

## (중요)setState를 호출할 때마다 react는 새로운 state로 render를 다시 한다.
