---
title: "state와 props 그리고 event"
date: "2020-06-15"
update: "2020-06-15"
draft: false
category: "React"
path: "/blog/react-state-props-event"
---

## state
리액트에서 state는 컴포넌트 내부에서 바뀔 수 있는 값을 의미하며, 이를 통해 컴포넌트 내부의 상태를 관리한다. 아래의 예시 코드를 보자.

```jsx
import React from 'react';
import LikesCounter from './LikesCounter';

class FeedText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      count: 0
    };
  }

  inputText = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  clickedCounter = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div className="input-container">
        <LikesCounter onClick={this.clickedCounter} currentCount={this.state.count} />
        <input type="text" value={this.state.text} onChage={this.inputText} />
      </div>
    );
  }
}

export default FeedText;
```

state에 지정한 값을 변경하고 싶을 때에는 **반드시 `setState\(\)`를 이용하여 변경해야 한다.**

그리고, state를 사용함에 있어서 또 한 가지 주의해야 할 점은, **state의 사용이 필수는 아니라는 것** 이다. 만약 현재 작업 중인 페이지가 정적인 페이지이며, 값이 변하더라도 렌더링은 필요하지 않을 경우에는 굳이 state를 쓰지 않아도 충분하다.

**참고:**
- [React적으로 생각하기](https://ko.reactjs.org/docs/thinking-in-react.html)
- [state와 props의 차이점](https://ko.reactjs.org/docs/faq-state.html#what-is-the-difference-between-state-and-props)

## props
props(properties의 줄임말)는 컴포넌트가 사용되는 과정에서 부모 컴포넌트가 설정하는 값으로, props를 전달받은 자식 컴포넌트의 입장에서는 **read only** 인 값이다. 따라서 만약 해당 값을 변경하고 싶을 때 자식 컴포넌트가 할 수 있는 일은 단지 이벤트 등을 일으켜 부모 컴포넌트에게 값이 변해야 함을 전달하는 것 뿐이며, 부모 컴포넌트에서 해당 값을 변경해주면 자식 컴포넌트에도 반영이 된다.

아래의 예시 코드를 보면 보도록 하자. 앞서 등장한 state의 예시 코드와 이어지는 자식 컴포넌트다.

```jsx
import React from 'react';

class LikesCounter extends React.Component {
  render() {
    return (
      <div>
        <p
        onClick={this.props.onClick}>
        좋아요 {this.props.currentCount} 개
        </p>
      </div>
    );
  }
}

export default LikesCounter;
```

위와 같이 자식 컴포넌트는 이벤트를 발생 시키는 주체가 될 수는 있어도 부모 컴포넌트의 state를 직접적으로 변경할 수는 없다.

**참고:**
- [Component와 Props](https://ko.reactjs.org/docs/components-and-props.html)

## event
리액트에서 이벤트는 모두 camelCase를 사용한다. 또한, DOM 조작은 모두 리액트에 위임하기 때문에 Vanilla JavaScript에서처럼 일일이 `addEventListener`를 호출할 필요도 없다. 여타 attribute처럼 이벤트를 사용하면 된다. 아래의 예시 코드를 참고하시라.

```jsx
import React from 'react';

class Counter extends React.Component {
  constuctor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  increaseNumber = () => {
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <div>
      <h2>{this.state.count}</h2>
      <button
        type="button"
        onClick={this.increaseNumber}>
        Click Here!
      </button>
      </div>
    );
  }
}

export default Counter;
```

**참고:**
- [Event handling](https://ko.reactjs.org/docs/handling-events.html)