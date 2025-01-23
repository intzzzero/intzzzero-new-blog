---
title: "React에서 유닛테스트(unit test)를 하고 싶었던 나는"
date: "2020-07-30"
update: "2020-07-30"
draft: false
category: "React"
path: "/blog/i-want-tdd"
---

![test](https://images.unsplash.com/photo-1518349619113-03114f06ac3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60)

최근 [켄트 벡의 테스트 주도 개발](http://www.yes24.com/Product/Goods/12246033)을 읽고 있다. 처음부터 끝까지 테스트의 중요성을 강하게 역설하는 책이라서 그런지 몰라도 어느 순간 TDD를 해야겠다는 생각에 사로잡혔다. 그러나 주변에 가르침을 청할 사람이 없어 어떻게 시작해야 할지 막막했다. 그러나 나는 하고 싶은 것은 어떻게든 해야 직성이 풀리는 사람이기에 찾아볼 수 있는 범위 내에서 모든 자료를 찾아봤다. 내가 React에서 TDD를 하기 위해 지난 열흘간 참고한 자료 중 유의미했던 것은 다음과 같다.

1. [벨로퍼트와 함께 하는 리액트 테스팅](https://velog.io/@velopert/react-testing)
2. [인프런 - 견고한 JS 소프트웨어 만들기](https://inf.run/YUMe)
3. [How to use React Testing Library Tutorial](https://www.robinwieruch.de/react-testing-library)
4. [React Testing Library Docs](https://testing-library.com/)
5. [Jest Docs](https://jestjs.io/en/)
6. [Jest-dom](https://github.com/testing-library/jest-dom#tohavestyle)

TDD는 커녕 유닛테스트를 해본 적도 없고, 심지어 얼마 전까지 프론트엔드는 바로바로 렌더링 결과를 볼 수 있기 때문에 굳이 테스트 코드를 작성할 필요가 없다고 알고 있었다. 그만큼 어떻게 테스트 코드를 작성해야 할지 감을 잡을 수 없었기 때문에 양질의 자료가 있어도 충분히 소화하기 어려웠고, 따라서 기본 개념부터 바로 잡고 차근차근 익힐 수 있는 나름의 계획이 필요했다.

내가 세운 계획은 이랬다. 우선, 벨로퍼트님의 포스팅을 보고, 예제 코드를 따라 치며 프론트엔드에서 현재 가장 많이 쓰인다는 테스팅 프레임워크 Jest, 테스트 라이브러리인 Enzyme과 RTL(React Testing Library)의 대략적인 흐름을 파악했다.

그리고, 인프런에 존재하는 몇 안 되는 TDD 강의 중 가장 기본기를 중심으로 이루어지는 강의라고 생각되는 김정환님의 견고한 JS 소프트웨어 만들기를 시청했다. 여기서는 또 다른 테스팅 프레임워크인 [Jasmine](https://jasmine.github.io/index.html)으로 진행되는데 Jest가 Jasmine을 기반으로 만들어졌으며, 실제로 사용하는 메서드에 큰 차이가 없으므로 문제가 없다고 판단했다.

위의 과정을 거치는 데 들인 시간이 약 열흘이었으며, 틈틈이 Jest와 RTL의 공식문서도 참고했다.

> 아직까지는 Jest + Enzyme 조합이 가장 많이 쓰인다고는 하는데, RTL의 상승세가 가파르며, 내부 동작 코드보다 DOM을 위주로 테스트 하는 방식이라는 점이 View에 집중하는 React의 철학과 맞아떨어지기에 RTL을 선택했다. 또한, React 공식문서와 벨로퍼트님도 RTL을 사용한 테스팅을 권장하고있다.

테스트 코드 없이는 구현하지 않는다는 TDD 원칙에 입각하여 평소 즐겨 보는 [북저널리즘](https://www.bookjournalism.com/) 홈페이지를 클로닝 해보기로 마음 먹었고, 이러 저러한 시행착오 끝에 미약하지만 첫 화면을 렌더링시킬 수 있었다.

현재까지 작성한 테스트 코드는 메인 페이지와 헤더, 그리고 메뉴 버튼을 클릭 시 좌측에서 등장하는 슬라이드 메뉴까지이며, 구현 코드 또한 동일한 수준까지만 작성했다.

특히, 오늘 작성한 테스트 코드는 나를 무척 고생시켰는데, 내용인즉, 메뉴 버튼을 클릭했을 때 슬라이드 메뉴 컴포넌트가 DOM에 마운트되고, 메뉴 컴포넌트에 존재하는 닫힘 버튼을 누르면 메뉴 컴포넌트가 언마운트되는 것이다.

사실 위의 내용을 구현하는 것은 상당히 간단한 일이다. 문제는 이 간단한 내용을 테스트 코드로 어떻게 검증하느냐는 것이다.

처음에 시도했던 방법은 햄버거아이콘을 클릭했을 때 등장하는 `<Menu />` 컴포넌트가 DOM 상에 존재하는 지 여부를 확인하는 것이었다. 물론 결과적으로 맞는 방법이었다고 생각한다. 그런데, 테스트 코드 작성 과정에서는 우여곡절이 있었다. 햄버거아이콘을 클릭한 후 `<Menu />` 컴포넌트의 유무를 확인했을 때에는 괜찮았지만, 그 이후에 닫힘버튼을 누른 후가 문제였다. 이미 DOM에는 `<Menu />` 컴포넌트가 존재하지 않기에 무엇을 기준으로 확인해야할 지 감이 오지 않았고 몇 시간 동안 빨간 FAIL을 봐야만 했다.

```js
describe("Main", () => {
  it("rendered Main component", () => {
    const { getByTestId } = render(<Main />)
    expect(getByTestId("MainContainer")).toBeInTheDocument()
  })

  it("toggle event to open and close menu", () => {
    const { getByTestId } = render(<Main />)
    const openMenuIcon = getByTestId("menuIcon")

    fireEvent.click(openMenuIcon)
    expect(getByTestId("Menu")).toBeInTheDocument()
    console.log("open menu")

    const closeMenuIcon = getByTestId("closeIcon")
    fireEvent.click(closeMenuIcon)
    console.log("close menu")

    expect(screen.queryByTestId("Menu")).not.toBeInTheDocument()
  })
})
```

그래서 내가 택한 방법은, 컴포넌트가 아닌 이벤트의 작동 유무를 확인하는 쪽이었다. 햄버거아이콘을 클릭했을 때에는 'open menu'가 콘솔에 찍히게 하고, 닫힘아이콘을 클릭했을 때에는 'close menu'가 콘솔에 찍히게 하는 것이다.
물론, 각각 별개의 아이콘으로 구분만 했을 뿐이지 하나의 `state`를 공유하는 하나의 메서드이기 때문에 메서드에 `console.log()`를 넣어도 확인은 가능하겠지만, 위와 같이 각각 다른 메시지로 구분할 수는 없었기 때문이다.

위의 방법을 통해 마침내 녹색의 PASS를 볼 수 있게 되었다.

![pass](https://github.com/codeAmeba/amebalab/blob/master/src/images/testpass.png?raw=true)

그리고, 현재까지 TDD를 하며 구현한 화면의 모습은 아래와 같다.

![bookjournalism clone](https://github.com/codeAmeba/amebalab/blob/master/src/images/bookjournalism.gif?raw=true)
