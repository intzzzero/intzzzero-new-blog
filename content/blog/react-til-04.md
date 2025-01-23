---
title: "React TIL 04"
date: "2020-06-08"
update: "2020-06-08"
draft: false
category: "React"
path: "/blog/react-til-04"
---

## React TIL 04
- class component는 render 외에도 많은 것을 갖고 있다.
- 그 중의 하나가 life cycle method
  - life cycle method는 react가 component를 생성하고 없애는 방법
  - component가 생성될 때 render 이전에 호출되는 함수들이 있고, 이후에 호출되는 함수들이 있다.
  - mounting / unmounting
  - updating

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("this is constructor");
  }
  state = {
    count: 0
  };
  plus = () => {
    this.setState(current => ({ count: current.count + 1 }));
  };
  minus = () => {
    this.setState(current => ({ count: current.count - 1 }));
  };
  render() {
    console.log('this is render');
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

![](https://github.com/codeAmeba/amebalab/blob/master/src/images/constructor_first.png?raw=true)
- constructor는 render보다 먼저 호출된다.

```js
class App extends React.Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 3000);
  }
  render() {
    const { isLoading } = this.state;
    return <div>{isLoading ? 'Loading...' : 'We Are Ready!'}</div>;
  }
}
```

- componentDidMount는 render 이후에 호출된다.

**참고:**
- [lifecycle](https://reactjs-kr.firebaseapp.com/docs/state-and-lifecycle.html)
- [open api](https://yts.lt/api)

## Axios
- fetch처럼 데이터를 받아올 때 사용함
- async/await과 같이 사용 가능
  - ex) axios가 데이터를 다 받아올 때까지 기다려달라는 의미.

```js
  getMovies = async () => {
    const movies = await axios.get('https://yts.lt/api/v2/list_movies.json');  
  }
```