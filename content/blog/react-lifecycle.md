---
title: "컴포넌트의 생명주기(Lifecycle)"
date: "2020-06-16"
update: "2020-06-16"
draft: false
category: "React"
path: "/blog/react-lifecycle"
---

리액트 프로젝트에 존재하는 모든 컴포넌트는 생명주기(Lifecycle)을 갖는다. 이것에도 역시 리액트의 철학 **오로지 View만 판다!** 정신이 담겨있는데, 특정 컴포넌트가 렌더링 되어 화면에 보여지기 시작하는 순간이 생명주기의 시작이며, 화면에서 사라지는 순간이 생명주기의 끝이다.

물론 엄밀히 따지면 본격적으로 화면에 보여지기 이전, 준비과정에 있을 때부터가 진정한 생명주기의 시작이라고 볼 수 있는데, 이 배경에는 리액트의 **라이프사이클 메서드\(Lifecycle method\)** 가 존재한다.

## 컴포넌트의 라이프사이클
컴포넌트의 라이프사이클을 이해하기 위한 배경에는 **마운트\(mount\), 언마운트\(unmount\), 업데이트\(update\)** 가 있다.
> 리액트에서는 컴포넌트를 기반으로 DOM이 생성되고 화면에 나타나는 것을 **마운트\(mount\)** 라고 부르며, 마운트 중인 컴포넌트에 변화가 생겨 다시 렌더링 하는 것을 **업데이트\(update\)** , 화면에서 사라지는 것을 **언마운트\(unmount\)** 라고 한다.

![lifecycle](https://cdn.filestackcontent.com/ApNH7030SAG1wAycdj3H)

그리고, 컴포넌트가 마운트될 때 해당 컴포넌트에 존재하는 여러 메서드들은 순차적으로 호출되는데, 클래스형 컴포넌트를 기준으로 다음과 같다.

1. 컴포넌트 마운트
2. constructor : 컴포넌트를 새로 만들 때마다 호출되는 생성자 메서드, 초기 state 값을 설정한다.
3. getDerivedStateFromProps : props의 값을 state에 넣을 때 사용하는 메서드(optional)
4. render : 렌더링하는 메서드
5. componentDidMount : 컴포넌트의 렌더링이 끝난 뒤 호출되는 메서드

컴포넌트가 업데이트 될 경우에는 다시 렌더링이 이루어지게 되는데, 업데이트의 요인에는 세 가지가 있다.

### props가 바뀔 때
부모 컴포넌트에서 자식 컴포넌트로 전달하는 props의 값이 바뀌면 해당 컴포넌트는 리렌더링 된다.

### state가 바뀔 때
현재 컴포넌트가 지닌 state의 값이 바뀔 경우 해당 컴포넌트는 리렌더링 된다.

### 부모 컴포넌트가 다시 렌더링 될 때
부모 컴포넌트로부터 받은 props나 자신이 가진 state의 값이 바뀌지 않더라도 부모 컴포넌트가 리렌더링 되면 자식 컴포넌트도 리렌더링 된다.

## 라이프사이클 메서드의 특징

![lifecycle](https://jaeyeophan.github.io/images/react_component_life_cycle.png)

포스팅을 작성하는 현재를 기준으로 리액트의 라이프사이클 메서드는 모두 9종류가 있으며, 이 중에서 가장 흔하게 사용되는 것으로는 아래의 3정류가 있다.

### componentDidMount

```jsx
componentDidMount() {
  fetch('api url')
    .then(res => res.json())
    .then(json => this.setState({ data: json }));
}
```

컴포넌트의 첫 **렌더링이 끝난 뒤에 단 한번 실행** 되기 때문에 렌더링에 블록(block)을 일으킬 염려가 없다. 따라서 이곳에서 API 요청이나, setTimeout, setInterval 등의 비동기 작업을 하면 좋다.

### componentDidUpdate

```jsx
componentDidUpdate(prevProps, prevState, snapshot) {
  //...something
}
```

정보가 업데이트되어 리렌더링이 된 이후에 실행되는 메서드로 위와 같이 parameter로 업데이트 이전의 props와 state를 받을 수 있다.

### componentWillUnmount

```jsx
componentWillUnmount() {
  clearInterval(countDown);
}
```

컴포넌트가 할일을 마친 뒤 실행되는 메서드로 위와 같이 더 이상 반복할 필요가 없는 작업이나 사용하지 않는 라이브러리 등을 이곳에서 해제하면 좋다.

## 실행 순서를 알 수 있는 예시 코드

간단히 리액트 컴포넌트들의 실행 순서를 알아볼 수 있는 코드를 작성해봤다. 아래의 코드를 실행 후, 그리고 버튼을 눌렀을 때, 콘솔에는 어떤 순서로 내용이 나오는지 살펴보자.
버튼은 세 번 클릭했다.

```jsx
class App extends React.Component {
  state = {
    counter: 1
  };
  constructor(props) {
    super(props);

    console.log('constructor');
  }
  componentDidMount() {
    console.log('componentDidMount');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }
  handleClick = () => {
    console.log('click func');
    this.setState({
      counter: this.state.counter + 1
    });
  };
  render() {
    console.log('render');
    return (
      <div>
        <MyComponent value={this.state.counter} />
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}
```

![컴포넌트의 실행 순서](https://github.com/codeAmeba/amebalab/blob/master/src/images/react-exe-process.png?raw=true)

**참고:**
- [누구든지 하는 리액트 | LifeCycle API](https://react-anyone.vlpt.us/05.html)
- [React | State and Lifecycle](https://ko.reactjs.org/docs/state-and-lifecycle.html)