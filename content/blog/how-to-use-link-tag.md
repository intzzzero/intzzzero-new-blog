---
title: "React-router-dom에서 Link 태그를 사용하는 법"
date: "2020-08-08"
update: "2020-08-08"
draft: false
category: "React"
path: "/blog/how-to-use-link-tag"
---

## Link !== a
최근 Next.js도 많이 사용한다고는 하지만, 난 아직 리액트 꼬꼬마이기에 React-router-dom을 주로 사용하여 라우팅을 하고 있다. 그런데, 오늘에서야 `Link` 태그의 제대로 된 사용법을 알았다. 그동안에도 계속 쓰긴 했지만, `a`태그와의 큰 차이점을 느끼지 못했고, 무엇보다도 최근에 들어서야 유닛테스트를 하기 시작했기 때문에 나의 `Link` 태그 사용법에 문제가 있는지조차 알지 못했다.

## 유닛테스트의 순기능
내가 `Link` 태그를 잘못 사용하고 있다는 사실을 알게 된 것은 전적으로 유닛테스트 덕분이다. 평소와 같은 방법으로 `Header.js` 컴포넌트에 `Link` 태그를 사용하여 각 페이지로 이동할 수 있도록 링크를 걸고 각 페이지에 `Header.js` 컴포넌트를 삽입했었다. 렌더링도 제대로 되었다. 그런데, 테스트를 돌렸더니 아래와 같은 에러가 등장했다.

![error](https://github.com/codeAmeba/amebalab/blob/master/src/images/router-error.png?raw=true)

` Invariant failed: You should not use <Link> outside a <Router>`
이게 갑자기 무슨 소리인가. `Router` 외부에서 `Link`를 쓰지 말라니.
그래서 나는 다양한 시도를 해보기 시작했다. 다음은 내가 시도했던 몇 가지 방법이다.

1. `Header.js` 컴포넌트에 `BrowserRouter` 모듈을 불러와 각 `Link`태그를 감싼다.
2. `Header.js` 컴포넌트를 제거하고, `Routes.js` 내부에 `Header`를 만든다.
3. `Routes.js`에 `Header.js`를 불러와 `BrowserRouter` 태그 하위에 넣는다.

결과적으로는 3번의 방법이 정답이었다. 또한, `Routes.js`는 프로그램 전역에 적용되기 때문에 각 페이지마다 삽입했던 `Header` 태그는 삭제하였다. 무엇보다도 아래와 같이 기분좋게 테스트에 통과할 수 있었다.

![error](https://github.com/codeAmeba/amebalab/blob/master/src/images/router-error-fix.png?raw=true)

`Routes.js`는 아래와 같은 모습이다.

```js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Components/Header';

function Routes() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/products' component={Products} />
        <Route exact path='/cart' component={Cart} />
      </Switch>
      <GlobalStyles />
    </Router>
  );
}
```

## Link 태그와 a 태그의 차이
이번 기회를 통해 수차례 테스트를 진행하며 알게된 것 중에는 `Link` 태그와 `a` 태그의 차이도 있다. 지금이니까 하는 말이지만 왜 이토록 큰 차이가 있는데 여태 눈치 채지 못 했을까 싶다. 프레임워크나 라이브러리를 사용하는 가장 큰 이유인데 말이다.
`a` 태그를 사용했을 경우에는 리액트 내부라고 하더라도 페이지 이동 시 화면이 깜빡이며 새로고침이 된다. 하지만, `Link` 태그를 제대로 사용하면 그러한 현상 없이 부드러운 페이지 전환이 가능하다. 이걸 여태 놓치고 있었다니 부끄럽지만, 지금이라도 알게 된 것에 안도감을 느낀다.
