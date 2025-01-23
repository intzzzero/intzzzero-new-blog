---
title: "CRA에서 TypeScript와 Unit Test를 위한 초기 설정"
date: "2020-07-23"
update: "2020-07-23"
draft: false
category: "React"
path: "/blog/cra-typescript-unittest-start-setting"
---

애초부터 12주가 결코 길지 않은 시간이라는 것을 알고는 있었지만, 그 예상보다도 더 빠르게 시간이 지난 듯 하다.
위코드에서 보낼 수 있는 시간도 어느덧 4주가 채 남지 않았다. 남은 기간 동안 무엇을 익힐 것인지는 오롯이 나에게 달려 있기 때문에 더욱 부담감이 들고 짧게 느껴진다.
고민에 고민을 거듭한 결과 TypeScript와 유닛 테스트를 중점적으로 파기로 마음 먹었고, 대략 3일 정도를 초기 설정만 붙잡고 씨름하며 CRA를 설치했다 지웠다만 수차례. 마침내 초기 설정을 마쳤다.
물론, 나는 내 기억력을 믿지 않기 때문에 블로그에 기록해두고자 한다.

## create-react-app
CRA는 무척 편리한 도구다. 동시에 안정적이다. 잠시나마 React Native를 경험해보니 새삼 CRA라는 도구가 있음에 더욱 감사하게 되었다.

CRA와 동시에 타입스크립트를 설치하려면 아래와 같이 입력하면 된다.

```bash
npx create-react-app my-app --template typescript
```

만약 타입스크립트가 적용되지 않은 기존 프로젝트에 추가하고 싶다면, 아래와 같이 입력하면 된다.

```bash
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

리액트에서 타입스트립트를 사용하면 좋은 점은, 별도의 컴파일 과정을 거치지 않고 바로 `npm start`를 할 수 있다는 것이다.
제대로 작동하는 화면을 띄워 확인해보자.

## Enzyme 설치
테스팅 프레임워크 Jest는 CRA를 하면 기본적으로 설치가 되기 때문에 별도로 설치할 필요가 없으나, 테스팅 라이브러리 Enzyme은 따로 설치해야 한다.
Enzyme은 아래와 같이 입력하여 설치할 수 있다.

```bash
npm install -D enzyme @types/enzyme enzyme-adapter-react-16 @types/enzyme-adapter-react-16 react-addons-test-utils
```

Enzyme이 없더라도 테스트는 가능하지만, `shallow`나 `mount`와 같이 Enzyme에서만 제공하는 몇가지 메서드가 상당히 유용하기 때문에 기왕이면 Jest와 Enzyme은 세트로 사용하는 것이 좋다.

자세한 내용은 아래 공식문서 링크에서 확인해보자.

## @types/
이미 눈치챘겠지만 모듈이나 라이브러리를 설치할 때마다 `@types/`를 앞에 붙이는 것을 볼 수 있다. 이는 IDE가 지원하는 편의기능을 타입스크립트를 쓰면서도 제대로 지원 받기 위함이다.
마찬가지로 Styled components와 같이 추가적인 라이브러리를 설치하려 한다면, 앞에 `@types/`를 붙이면 된다.

```bash
npm install --save styled-components @types/styled-components
```

## React Testing Library
또 다른 테스팅 라이브러리로 React Testing Library가 있다. 줄여서 RTL이라고 부르기도 하는데, CRA로 프로젝트를 생성하면 기본적으로 설치가 되어 있으므로 별도로 추가 설치는 필요 없다.
RTL은 기본적으로 Enzyme에 비해 DOM을 위주로 테스트를 진행하며, UI의 라이프사이클이 곧 컴포넌트의 라이프사이클이라는 리액트의 철학과 보다 가깝다. 그리고, Enzyme에 비해 가볍다는 장점도 있다.
관련 자료를 찾아보면 이러저러한 라이브러리를 설치하라고 하는 경우가 더러 있는데, 해당 자료들의 약 1년 전 자료라는 점과 내가 경험해본바에 의하면 현재는 CRA 포함되기 때문에 추가 설치가 필요 없다.

### 참고 자료
- [타입스크립트 공식문서](https://www.typescriptlang.org/docs/handbook/react.html)
- [벨로퍼트님 포스팅](https://velog.io/@velopert/series/react-testing)
- [김정환님 포스팅](http://jeonghwan-kim.github.io/dev/2019/06/25/react-ts.html)
- [CRA 공식문서](https://create-react-app.dev/docs/adding-typescript/)
- [Jest 공식문서](https://jestjs.io/en/)
- [Enzyme 공식문서](https://enzymejs.github.io/enzyme/)