---
title: "Styled components에서 keyframe 사용하는 법"
date: "2020-07-08"
update: "2020-07-08"
draft: false
category: "React"
path: "/blog/styled-components-animation"
---

## 2차 프로젝트 시작
지난 2주 동안 진행했던 위코드 1차 프로젝트를 마치자마자 2차 프로젝트가 시작되었다. 이번에도 역시 2주간 진행되는데, 1차 프로젝트를 경험했기에 조금 더 수월할 거라 생각했지만, 뜻밖의 핸디캡이 생겨서 꼭 그렇지만도 않을 것 같다.
1차 프로젝트에서는 클래스형 컴포넌트와 Sass를 사용했던 것과는 달리 2차 프로젝트에서는 함수형 컴포넌트와 Styled components를 사용하기로 했기 때문이다. 어딘가 익숙한 듯 하면서도 다른 친구들이라 첫날부터 오늘(3일차)에 이르기까지 삽질과 검색을 반복하며 더듬더듬 만들 수밖에 없었다.
특히, 이번에 클로닝을 진행하는 사이트는 [카트라이더 TMI](https://tmi.nexon.com/kart) 라는 카트라이더 전적 검색 서비스인데, 롤에서 유명한 OP.GG와 유사한 서비스라고 볼 수 있다.
내가 1차적으로 맡은 페이지는 **랭킹** 페이지로, 카트라이더의 각 주행모드에 따른 유저들의 순위가 나열되는 페이지이며, 특정 유저를 클릭했을 때에는 해당 유저의 세부 정보 페이지로 이동한다. 여기까지는 별 문제가 없어 보였다. 언뜻 보기에 심플한 구성이기도 했기에 조금 방심했다고도 할 수 있다. 그런데, 막상 만들기 위해 구석 구석을 살펴 보니 온갖 애니메이션 효과와 그래프가 눈에 띄어 정신이 혼미해졌다.

## 애니메이션 지옥
나를 가장 당황케 했던 것은 CSS나 Sass에서는 간단(...까지는 아니지만 비교적 큰 어려움 없이)하게 적용할 수 있었던 애니메이션 효과를 Styled components에서 그대로 했더니 전혀 먹히지 않았다는 점이다.
그래도 언제나 그렇듯 간절히 원하면 결국엔 방법이 보이는 법. 혹시나 싶었던 import에 답이 있었다. 방법을 알고 나니 애니메이션을 추가하는 작업은 일사천리로 진행되었다. 그러나 인간은 망각의 동물이니 나는 또 잊고 말 것이 뻔하기에 기록을 남겨둔다.

## Styled components에서 keyframe 사용하는 법
Styled components에서의 keyframe 사용법은 아래와 같다. 우선, styled와 더불어 keyframe 모듈을 import 한다.

```js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Rank = () => {
  return (
    <>
      <OtherUsersContainer />
    </>
  );
};

const OtherUserCardAnimation = keyframes`
  0% {
    opacity: 0;
    top: 50px;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
    top: -50px;
  }
`;

const OtherUsersContainer = styled.article`
  width: 70%;
  height: auto;
  margin: 0 auto;
  position: relative;
  top: -50px;
  animation: ${OtherUserCardAnimation} 0.8s ease-in-out forwards;
  animation-delay: 0.5s;
`;
```

그리고, 위와 같이 keyframe component를 생성하고, 해당 keyframe을 사용할 styled component의 animation 속성에 추가한다. 이때, 반드시 `${}` 플레이스 홀더로 감싸주어야 한다.

또한, keyframe을 적용할 styled component를 꼭 keyfram component보다 나중에 선언해야 오류가 나지 않는다.

이와 같은 keyframe component를 적용하여 현재(3일차)까지 작업된 랭킹 페이지는 아래와 같은 모습이다.

![kart rider tmi clone 3일차](https://github.com/codeAmeba/amebalab/blob/master/src/images/kart01.gif?raw=true)