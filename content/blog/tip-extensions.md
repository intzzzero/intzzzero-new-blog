---
title: "쾌적한 자바스크립트 코딩을 위한 VSCode 확장 프로그램 추천"
date: "2020-06-10"
update: "2020-06-10"
draft: false
category: "etc"
path: "/blog/vscode-extensions"
---

## [번역] 쾌적한 자바스크립트 코딩을 위한 VSCode 확장 프로그램 추천

[원문 | Top JavaScript VSCode Extensions for Faster Development](https://codeburst.io/top-javascript-vscode-extensions-for-faster-development-c687c39596f5)

VSCode는 현재 가장 많은 프로그래머들이 사랑하는 IDE입니다. 매우 빠르고, 확장 프로그램이 풍부하며, 자유로운 커스터마이징이 가능하죠. 그 외에도 뛰어난 기능들을 다수 지니고 있습니다. 만약 아직도 사용해보지 않았다면, 꼭 한 번 써보시길 바랍니다.

VSCode에는 수천 개의 확장 프로그램이 존재합니다. 그 중에서 개인적으로 애용하는 몇 가지 확장 프로그램을 추천해볼까 합니다.

## Quokka.js

Quokka.js는 자바스크립트(JavaScript)와 타입스크립트(TypeScript)를 위한 매우 빠른 프로토타입 놀이터와 같습니다. 이 말은 곧, **사용자가 입력하는 즉시 코드를 실행한다는 의미**입니다. 여기서 한 단계 더 나아가 실행 결과를 미리 보여주기도 합니다

Quokka.js를 설치한 후 Ctrl / Cmd (⌘) + Shift + P를 눌러 명령 팔레트를 오픈하고 Quokka를 입력하면, 사용 가능한 명령어 목록을 볼 수 있습니다. 그 중에서 New JavaScript File을 선택하거나 ⌘ + K + J 키를 누르면 즉시 실행이 가능합니다.
![quokka.js](https://cdn-images-1.medium.com/max/1600/1*ukcsChGYEreBhhAksiYceA.gif)

## Bracket Pair Colorizer

괄호와 괄호의 나열은 프로그래밍에서 빠질 수 없는 요소입니다. 여러 개의 괄호가 지속적으로 중첩되다 보면 괄호가 하나 빠진 부분이 있더라도 쉽게 발견할 수가 없죠. Bracket Pair Colorizer 는 괄호의 색상을 모두 다르게 만들어 이러한 고충을 덜게 해줍니다. 물론, 여는 괄호와 닫는 괄호로 이루어진 한 쌍은 동일한 색상을 지닙니다.
![Bracket Pair Colorizer](https://cdn-images-1.medium.com/max/1600/1*fmd009UJSyiC3ZtsOgN3qA.png)

## Snippets

Snippet은 IDE에서 사용되는 축약어입니다. 예를 들어 `import React from ‘react’;` 같은 경우에는 단지 `imr`이라고 타이핑 하고 Tab 키를 누르면 자동 완성이 됩니다. `clg` 같은 축약어는 특히 자주 사용 되는데요. 이건 `console.log`입니다.

## Todo Highlighter

종종 우리는 코딩을 한 뒤, ‘이것 보다 더 좋은 방법이 있지 않을까?’하는 생각을 하게 됩니다. 그런 경우에 추후 리펙토링을 하기 위해 주석을 달곤 하는데요. 주의 깊게 보지 않으면 눈에 띄지 않기 때문에 잊어버리고는 그대로 마스터 브랜치에 푸쉬를 해버리는 불상사가 일어나기도 합니다. 하지만 Todo Highlighter와 함께라면 그런 일은 더 이상 없을 것입니다. 당신의 코드에 숨은 주석들을 밝은 형광색으로 항상 눈에 띄게 하기 때문이죠.
![Todo Highlighter](https://cdn-images-1.medium.com/max/1600/1*F5s06_EuXWZIg281ajKN9g.png)

## Import Cost

이 확장 프로그램은 import하려는 모듈의 크기를 미리 볼 수 있게 합니다. 덕분에 Webpack같은 번들러를 사용할 때 큰 도움이 되죠. 이를 통해 전체 라이브러리를 가져오는지 아니면 특정 유틸리티만 가져오는지 확인할 수가 있습니다.
![Import Cost](https://cdn-images-1.medium.com/max/1600/1*LbfI4D9XXiZYS1Slwsys5g.gif)

## REST Client

웹 개발자로서 우리는 종종 REST APIs를 통해 협력을 해야 합니다. URL을 검사하고 응답을 확인하기 위해 Postman과 같은 툴을 사용하죠. 하지만 IDE에서 동일한 작업이 가능하다면 굳이 다른 프로그램을 실행할 필요는 없을 것입니다. 그렇기 때문에 REST Client를 반길 수밖에 없습니다. 이를 통해 VSCode에서 HTTP 요청을 보내고 즉시 응답을 확인할 수가 있습니다.
![REST Client](https://cdn-images-1.medium.com/max/1600/1*Nsl7NFn1PPAcbJa4TApBhw.gif)

## Auto Close Tag and Auto RenameTag

React의 출현으로 말미암아 지난 몇 년간 지속된 웹 개발 업계의 호황 이후, JSX 형태의 HTML 구문이 다시금 유행하고 있습니다. 그래서 우리는 다시 자바스크립트로 태그를 코딩해야 합니다. 대다수의 웹개발자는 태그를 입력하는 것을 그다지 반길 것 같지 않은데요. 그렇기 때문에 우리는 태그는 물론 자식 태그까지 빠르고 쉽게 만들 수 있는 도구가 필요합니다. 그런 점에서 Emmet이 VSCode에 이미 내장되어 있다는 점은 훌륭한 예입니다. 하지만, 때때로 이보다 간결하고 단순한 도구가 필요할 때가 있죠. 바로, Auto Close Tag와 Auto RenameTag처럼 말입니다. 이를 통해 여는 태그만 작성해도 닫는 태그까지 동시에 완성이 되고, 둘 중 하나의 태그만 수정하더라도 둘 다 자동으로 수정이 됩니다.
**또한, JSX, XML, PHP, Vue, JavaScript, TSX와 같이 다양한 언어에서 정상적으로 작동을 합니다.**
![Auto Close Tag and Auto RenameTag](https://cdn-images-1.medium.com/max/1600/1*ME0oAmIJdO6zaaYwL1DPwA.gif)
![Auto Close Tag and Auto RenameTag](https://cdn-images-1.medium.com/max/1600/1*EbGIozYQA3qS3nXpNtSDeg.gif)

## GitLens

GitLens의 제작자가 밝혔듯이, GitLens는 VSCode에 내장된 Git의 기능을 한층 더 강화 해줍니다. **코드 렌즈, 커밋 검색, 히스토리, Gitlens 탐색기 등 놀라운 기능들이 담겨있습니다.** 깃을 사용한다면 필수 확장 프로그램이라고 말할 수 있습니다.
자세한 설명은 [여기](https://github.com/eamodio/vscode-gitlens)에서 확인할 수 있습니다.
![GitLens](https://cdn-images-1.medium.com/max/1600/1*DS2aWPI70ydDx4WHkkiJVQ.gif)

## Git ProjectManager

GPM(Git Project Manager)을 사용하면 VSCode에서 직접 Git 저장소 새창으로 열 수 있습니다. 기본적으로 VSCode를 종료하지 않고도 다른 저장소를 여는 것이 가능합니다.
이 확장 프로그램을 설치한 후에 `gitProjectManager.baseProjectsFolders`는 저장소가 포함된 URL 목록으로 설정해야 합니다. 예시는 아래와 같습니다.

```js
{
    "gitProjectManager.baseProjectsFolders": [
        "/home/user/nodeProjects",
        "/home/user/personal/pocs"
    ]
}
```

![Git ProjectManager](https://cdn-images-1.medium.com/max/1600/1*PvDRDxbdNKnnVhJ1HS4fjQ.gif)

## Indenticator

현재 들여쓰기가 어느 정도 되어 있는지 시각적으로 강조됩니다. 각기 다른 깊이로 들여쓰기된 여러 블록들을 쉽게 구분할 수 있게 합니다.
![Indenticator](https://cdn-images-1.medium.com/max/1600/1*ZY3eFPZ1-PmBhS5cQAZHAg.gif)

## VSCode Icons

당신의 IDE를 보다 멋지게 만들기 위한 아이콘!
![VSCode Icons](https://cdn-images-1.medium.com/max/1600/1*69vby7KoGBO5D6XDs2vdIg.gif)

## Dracula (Theme)

그냥 개인적으로 가장 좋아하는 테마입니다.
※역자 주: 저는 material theme을 좋아합니다 :)
![Dracula Theme](https://cdn-images-1.medium.com/max/1600/1*VXgT4EFpAKtPfXTgi00BqA.png)
