---
title: "CRA를 통한 프로젝트 초기 환경 설정"
date: "2020-06-13"
update: "2020-06-13"
draft: false
category: "React"
path: "/blog/react-init-setting"
---

## 사전 준비
리액트는 `cra`라는 무척 편리한 도구를 제공하고 있다. 이는 `create-react-app`의 줄임말로써 리액트 공식문서에서는 **새로운 싱글 페이지 앱을 만들기 위한 툴(tool)** 로 칭하고 있다.

`cra`를 통해 프로젝트를 시작하기에 앞서 반드시 선행되어야 하는 작업이 있는데, `node`와 `npm`을 설치하는 것이다.

```bash
node -v
npm -v
```

위와 같이 버전 체크를 먼저 해보고, 만약 버전이 출력되지 않는다면 설치하도록 하자. 공식 사이트에서 다운로드하여 설치할 수도 있고, `homebrew`가 설치되어 있다면 아래와 같이 터미널에서 바로 설치도 가능하다.

```bash
brew install node
```

`node`가 설치되면 node package manager 즉, `npm`은 자동으로 설치가 된다. 개인적으로는 `npm`보다  `yarn`을 더 좋아한다. 로고가 고양이이기 때문이다. 내 생각에 동의한다면 아래와 같이 `yarn`도 설치해두자.

```bash
brew install yarn
```


## create-react-app
이제 `cra`를 위한 준비가 되었다. 프로젝트 폴더를 만들고자 하는 위치에서 `create-react-app`을 써보자. 이때, 새로운 폴더와 함께 필요한 자원들이 만들어지기 때문에 굳이 폴더를 미리 만들 필요는 없다. 아래와 같이 입력한다.

```bash
npx create-react-app my-app
```

`my-app`은 임의로 지정할 수 있는 폴더명이다.


## 초기 설정
초기 설정의 경우 함께 프로젝트를 진행하는 구성원들과 논의하여 동일하게 맞춰야 하는 부분인 만큼 딱 정해진 방식은 없으나, 대동소이 하므로 본 포스팅에서는 wecode 컨벤션에 따른다.

### 라이브러리 설치
막 만들어진 프로젝트에는 이미 여러 자원들이 존재하지만, 그 중에는 굳이 필요 없는 것도 있고, 추가로 필요한 것들도 있다. 대표적인 서드파티 라이브러리로 **React Router** 와 **Sass** 혹은 **Styled Components** 등이 있다. 이름만 다를 뿐 설치 방법은 동일하다.

```bash
npm install react-router-dom --save
npm install node-sass --save
```

명령어 뒤에 `--save`는 옵션이긴 한데, 이렇게 하면 `package.json`에 설치와 동시에 `dependencies`로 등록이 되므로 편리하다.

> 프로젝트 실행에 필요한 자원들은 `node_modules`에 모여있는데, 워낙 방대하여 일반적으로는 `.gitignore`에  등록하여 스테이징을 하지 않는다. 따라서 해당 프로젝트를 공유 받는 경우에는 `npm install`을 통해 `node_modules`를 별도로 받아야 하는데 이때, `dependencies`에 등록된 라이브러리는 자동으로 설치가 된다.

### 폴더 구성
주로 작업이 이루어지는 파일들은 `src` 폴더에 자리하고 있으며, 이곳에서 프로젝트에 필요한 자원의 용도나 성격에 따라 다시 폴더를 나눈다. 기본적으로는 아래와 같이 나눌 수 있겠다.

**Components**
- 여러 페이지에 공통적으로 사용되는 컴포넌트를 관리
- ex: Nav, Footer 등

**Pages**
- 하나의 페이지를 구성하는 틀의 역할을 하는 컴포넌트를 관리
- ex: Login, Main, MyPage 등

**Styles**
- 공통적으로 적용되는 스타일을 관리
- ex: reset.scss - `box-sizing: border-box;`

**Images**
- 각 컴포넌트에 사용되는 이미지를 통합 관리

**Routes.js**
- 페이지 간 이동을 관리하는 라우트 파일

**public**
- `<div id="root"></div>`가 담긴 index.html이 위치하고 있으며 mock data가 필요할 경우 이곳에 data 폴더 생성 후 관리한다.
