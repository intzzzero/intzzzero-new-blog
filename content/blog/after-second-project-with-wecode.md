---
title: "위코드 2차 프로젝트(카트라이더 TMI 클론) 후기"
date: "2020-07-20"
update: "2020-07-20"
draft: false
category: "think"
path: "/blog/after-second-project-with-wecode"
---

1차 프로젝트를 끝낸 바로 다음주 7월 6일부터 시작했던 2차 프로젝트를 7월 17일부로 마쳤다. 1차 프로젝트 이후에 여러모로 자신감도 얻고, 부족한 부분에 대한 반성도 했는데도 불구하고 1차 프로젝트에 비해 넘사벽의 완성도를 얻지는 못했다. 물론, 그렇다고 해서 2차 프로젝트가 처음부터 끝까지 불만족스럽기만 했던 것은 아니다. 오히려 마음 맞는 동료들과 즐겁게 작업할 수 있었던 시간이었다.

<br />

우선, 2차 프로젝트의 개요를 보고 자세한 후기를 적어보겠다.

***

## 5Dragon Project Front-End
- 넥슨(NEXON)의 온라인 레이싱 게임 카트라이더(Kart Rider)의 전적 검색 서비스인 **카트라이더 TMI** 를 클로닝하는 프로젝트
- 프로젝트팀 구성원이 모두 '용'과 관련이 있어서 프로젝트명을 **오룡\(5Dragon\)** 이라 명명함.
- [카트라이더 TMI 공식 홈페이지 링크](https://tmi.nexon.com/kart)

## 개발 인원 및 기간
- 개발 인원: 프론트엔드 2명, 백엔드 3명
- 개발 기간: 2020/07/06 - 2020/07/17
- [프론트엔드 github 링크](https://github.com/codeAmeba/kartrider-tmi-clone)
- [백엔드 github 링크](https://github.com/wecode-bootcamp-korea/9-5dragon-backend)

## 목적
전적 검색 서비스인 만큼 다양한 데이터가 누적되어 있으며, 이를 통해 데이터 시각화를 경험하는 것이 가능할 것으로 생각했다. 또한, 1차 프로젝트와는 달리 함수형 컴포넌트와 Hooks, Styled-components를 사용하고 싶었기 때문에 다양한 시각적 효과와 상태관리를 고루 경험하며 새로운 툴의 숙련도를 높이고자 했다.

## 데모 영상(이미지 클릭)
[![Kart rider tmi](https://github.com/codeAmeba/kartrider-tmi-clone/raw/master/video-thumbnail.png)](https://youtu.be/PbSX27sZF-4)

## 적용 기술
### Front-End
- JavaScript(ES6)
- React.js
- Hooks
- Styled-components
- Sass
- React-router-dom
- Redux
- Redux-thunk
- React-kakao-login
- Chart.js
- React-circular-progressbar
- Fontawesome

### Back-End
- Python
- Django
- Beautifulsoup
- Selenium
- Requests
- Pandas
- Crontab
- Design Pattern : Abstract factory
- Bcrypt
- JWT
- Social Login : KAKAO
- Mysql
- CORS headers
- AWS : EC2, RDS, S3

### 커뮤니케이션 및 버전관리
- Postman
- Slack
- Trello
- Git / Github(git-rebase)

## 구현 기능
- SNS(Kakao) 로그인
- 카트라이더 닉네임 연동
- 데이터 시각화(승률, 리타이어율, 최근 전적 등)
- 화려한 애니메이션

## 미구현 기능
- 구글 로그인
- 카트 페이지(능력치를 보여주는 오각형 범위 그래프)
- 유저 검색 기능

***

## 만족하는 부분
1차 프로젝트에서 3명의 프론트가 협업했던 것과는 달리 2차에서는 나를 포함한 단 두 명의 프론트가 존재했다. 이에 따른 장단점이 물론 있었지만, 장점부터 이야기 하자면, 커뮤니케이션 바운더리(Boundary)가 좁아진 만큼 보다 자주, 긴밀한 대화가 가능했다는 것이다. 또한, 현업에서는 동일한 기술 스택으로 프로젝트를 진행해야 하겠지만, 다양한 기술들을 습득해야 하는 학생이기 때문에 각각 다른 기술 스택으로 하나의 프로젝트를 구현해야 했다. 나는 Hooks와 Styled-components, Chart.js를 이용했고, 다른 프론트는 Redux, Sass, Kakao-login 등의 기술을 사용했다. 덕분에 직접 구현한 것 만큼은 아니겠지만, 곁에서 지켜보고, 코드를 뜯어보며 내가 사용하지 않은 기술에 대해서도 공부할 수 있는 시간이었다.

![coworking](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60)

그리고, 2차 프로젝트에서 가장 인상 깊은 부분을 이야기 하지 않을 수 없다. 마음이 맞고 대화가 통하는 팀원들과 함께 협업하는 즐거움을 느낄 수 있는 시간이었다. 자칫 스스로의 부족함을 자책하고, 기대에 못 미치는 타인을 비난하게 되는, 협업이라 부르기에도 민망한 그런 협업을 일찍이 마케터로 일하던 당시에 경험해봤다. 그랬던 나에게 이번 2차 프로젝트는 즐거운 협업이 단순히 즐겁고만 마는 것에서 그치는 것이 아니라 구성원 한 사람 한 사람의 잠재력까지도 끌어낼 수 있다는 사실을 알게 해준 고마운 시간이었다.

![team](https://images.unsplash.com/photo-1499540633125-484965b60031?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60)

## 아쉬운 부분
아쉽다기 보다는 어느 정도 예상했던 부분이긴 한데, 기간 내에 깔끔하게 마무리 짓지 못 했다는 점이 조금 아쉽다. 물론 완성보다는 새로운 기술을 익히는 것의 우선순위가 더욱 높기는 했지만, 아쉬운 건 아쉬운 거니까. 그리고, 최근 들어 유닛테스트에 부쩍 관심이 생겨 이것 저것 자료들을 찾아보고 있는데, 보다 일찍 알았더라면 2차 프로젝트에 조금이라도 적용해봤을 텐데... 하는 아쉬움도 남는다.

![bye](https://images.unsplash.com/photo-1529268209110-62be1d87fe75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60)