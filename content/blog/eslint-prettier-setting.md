---
title: "프로젝트 시작 시 필수, ESLint와 Prettier 세팅"
date: "2020-06-20"
update: "2020-06-20"
draft: false
category: "etc"
path: "/blog/eslint-prettier-setting"
---

**ESLint 와 Prettier 확장 프로그램을 이미 설치했다는 가정 하에 포스팅을 진행한다.**

## ESLint

`CRA`를 통해 프로젝트를 생성하면 프로젝트의 `root`에 `.elintrc.json`이라는 이름으로 파일을 만든다. 그리고, 해당 파일을 열어 아래와 같이 내용을 추가한다.

```json
{
  "extends": "react-app"
}
```

위와 같이 설정을 하고 저장하면, 해당 폴더 내부의 `js`나 `jsx`에서 노란 밑줄이나 빨간 밑줄 등을 볼 수 있을 것이다.

## Prettier

함께 프로젝트를 진행하는 구성원끼리 코드 컨벤션을 통일해야 하는 것은 당연한 일이다. 하지만 사람이 일일이 매번 규칙을 되새기며 컨벤션을 맞추기란 결코 쉬운 일이 아니다. 따라서 적절한 도구의 도움을 받는 것이 좋은데, 대표적으로 ESLint와 더불어 Prettier가 있다. ESLint가 단순히 잘못된 부분에 대한 지적을 하는 것에 그치는 반면, Prettier는 친절하게도(때론 강압적으로) 직접 코드를 고쳐주기까지 한다.

이처럼 ESLint와 Prettier는 따로 놓고 보면 조금씩 아쉬운 친구들이지만, 같이 썼을 때에는 그 시너지가 굉장하다.

### Prettier 설치

확장 프로그램을 설치했더라도 해당 프로젝트에서 Prettier를 쓰려면 별도로 패키지를 설치해야 한다. 더불어 기본적인 Prettier의 컨벤션이 아닌 ESLint에 설정한 컨벤션으로 자동수정이 되도록 하기 위해 ESLint 패키지도 함께 설치한다.

```bash
npm i prettier eslint-config-prettier eslint-plugin-prettier -D
```

설치가 완료되면, 앞서 생성했던 `.eslintrc.json`을 다시 열어 내용을 추가한다.

```json
{
  "extends": ["react-app", "plugin:prettier/recommended"]
}
```

### Prettier 설정

이어서 VSCode의 설정을 열어 Prettier의 설정을 한다. 이때, JSON 설정 파일에 직접 추가하는 것이 편하고 빠르므로 Command Palette에서 settings라고 입력한다. 그리고 등장하는 관련 항목 중 **기본 설정: 설정 열기(JSON)** 이라는 항목을 선택한다.

> Command Palette 단축키: MacOS: ⇧⌘P / windowOS: ctrl+shift+p]

설정 JSON에 아래와 같은 항목들을 추가한다.

```json
"editor.formatOnSave": true,
"[javascript]": {
  "editor.formatOnSave": false
},
"eslint.autoFixOnSave": true,
"eslint.alwaysShowStatus": true,
"prettier.disableLanguages": ["js"],
"files.autoSave": "onFocusChange"
```

위의 설정은 VSCode 자체 설정이며, 특정 프로젝트에 다른 규칙을 적용하기 위해서는 `.prettierrc.json`을 생성하고 아래와 같이 별도의 설정을 추가한다.

```json
{
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

**참고:**

- [27. 리액트 개발 할 때 사용하면 편리한 도구들 - Prettier, ESLint, Snippet · GitBook](https://react.vlpt.us/basic/27-useful-tools.html)
