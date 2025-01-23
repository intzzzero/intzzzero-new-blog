---
title: "클린 코드(Clean Code), 클린 코더(Clean Coder)"
date: "2020-07-05"
update: "2020-07-05"
draft: false
category: "book"
path: "/blog/clean-code-clean-coder"
---

<br /><div style="clear:left;text-align:left;"><div style="float:left;margin:0 15px 5px 0;"><a href="http://www.yes24.com/Product/Goods/11681152" style="display:inline-block;overflow:hidden;border:solid 1px #ccc;" target="_blank"><img style="margin:-1px;vertical-align:top;" src="http://image.yes24.com/goods/11681152/M" border="0" alt="Clean Code 클린 코드 "></a></div><div><p style="line-height:1.2em;font-size:14px;font-weight:bold;">Clean Code 클린 코드 </p><p style="margin-top:5px;line-height:1.2em;"><a href="http://www.yes24.com/SearchCorner/Result?domain=ALL&author_yn=Y&query=&auth_no=233810" target="_blank">로버트 C. 마틴</a> 저/<a href="http://www.yes24.com/SearchCorner/Result?domain=ALL&author_yn=Y&query=&auth_no=233699" target="_blank">박재호</a>, <a href="http://www.yes24.com/SearchCorner/Result?domain=ALL&author_yn=Y&query=&auth_no=233811" target="_blank">이해영</a> 역</p><p style="margin-top:14px;line-height:1.5em;text-align:justify;">애자일 소프트웨어의 혁명적인 패러다임을 제시하는 책이다. 저자 로버트 마틴은 오브젝트 멘토(Object Mentor)의 동료들과 힘을 모아 ‘개발하며’ 클린 코드를 만드는 최상의 애자일 기법을 정제하여『Clean Code 클린 코드』에 담았다. 아주 많은 코드를 읽고 그 코드의 무엇이 옳은지, 그른지 생각하며 전문가로서 자신...</p></div></div><br />

<div style="clear:left;text-align:left;"><div style="float:left;margin:0 15px 5px 0;"><a href="http://www.yes24.com/Product/Goods/29241448" style="display:inline-block;overflow:hidden;border:solid 1px #ccc;" target="_blank"><img style="margin:-1px;vertical-align:top;" src="http://image.yes24.com/goods/29241448/M" border="0" alt="클린 코더  "></a></div><div><p style="line-height:1.2em;font-size:14px;font-weight:bold;">클린 코더  </p><p style="margin-top:5px;line-height:1.2em;"><a href="http://www.yes24.com/SearchCorner/Result?domain=ALL&author_yn=Y&query=%b7%ce%b9%f6%c6%ae+%b8%b6%c6%be" target="_blank">로버트 마틴</a> 저 / <a href="http://www.yes24.com/SearchCorner/Result?domain=ALL&author_yn=Y&query=%c1%a4%c8%f1%c1%be" target="_blank">정희종</a> 역</p><p style="margin-top:14px;line-height:1.5em;text-align:justify;">세계적으로 유명한 프로그래머 &#39;밥 아저씨&#39; 로버트 마틴이 쓴 책으로, 프로 개발자가 되는 길을 알려준다. 수십 년의 경험을 바탕으로 장인 정신, 실천 기법, 도구뿐만 아니라 프로가 가져야 할 마음가짐과 태도를 알려준다. 빡빡한 일정으로 인한 압박을 견디고 비이성적인 사람들과 대화하고 진창에 빠져 오도가...</p></div></div><br /><br />

## Clean Code, Clean Coder
![clean code, clean coder](https://images.unsplash.com/photo-1461773518188-b3e86f98242f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=60)

밥 아저씨의 저서인 클린 코드와 클린 코더를 연달아 읽었다. 클린 코드가 장인정신을 갖고 깔끔한 코드를 작성해야 하는 이유와 방법 그리고, 사례들을 소개한다면, 클린 코더는 프로페셔널 프로그래머로서 갖추어야 할 태도와 마음가짐 등을 밥 아저씨 본인의 이야기를 통해 소개하고 있다.
개인적으로는 클린 코더가 클린 코드에 비해 읽기에 수월했는데, 비단 프로그래머 뿐만 아니라 어디서나 통용 될법한 프로다운 태도에 대한 이야기이기 때문이라 생각한다. 실제로 클린 코드의 경우, 중반부까지는 큰 어려움 없이 읽을 수 있었으나 후반부로 갈수록 실제 자바 코드를 예시로 들며 밥 아저씨가 직접 리팩토링의 과정을 보여주고 있다. 그런데 그 양이 적게는 한 페이지에서 많게는 열 페이지에 이르기까지 코드만 뺵빽하게 나열되어 있다보니 현재 나의 수준으로는 모든 내용을 받아들이기에 어려움이 있었다.
그럼에도 불구하고 모든 내용의 10%만 이해하더라도 충분히 가치가 있는 책이라는 생각이 든다. 이 가치 있는 10%만이라도 잊지 않도록 이번 포스팅에 기록해두려 한다.

## 클린 코드 작성 규칙
### 1. 변수명은 서술적이고 구체적일수록 좋다.
요즘 IDE는 변수명을 빠르게 검색할 수 있으며, 아무리 긴 변수명이라도 앞의 두 세 글자만 적어도 자동완성 목록이 등장한다. 따라서 이러한 이점을 십분 활용하면서도 변수명을 처음 보는 사람이라도 어떤 역할을 지닌 변수인지 알 수 있도록 서술적이고 구체적인 변수명을 짓는 편이 좋다. 물론 btn이나 img와 같이 관용적으로 쓰이는 줄임말은 사용해도 좋다.

### 2. 함수는 짧을수록 좋고, 인수는 적을수록 좋다.
기본적으로 하나의 함수는 하나의 기능만 잘 수행하도록 만드는 게 좋다. 아무리 작은 기능이라도 하나의 함수에 넣기보다는 둘로 나누는 것이 좋다. 그리고, 함수에 전달하는 인수는 가능하다면 없는 것이 가장 좋고, 3개를 마지노선이라고 생각해야 한다. 그 이상 늘어나면 실수할 확률이 높아진다.

![hammer](https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)

### 3. 단일 책임 원칙(Single Responsibility Principle)
클래스는 하나의 책임만 가져야 하며, 그 책임을 완전히 캡슐화해야 한다. 또한, 상위 클래스는 하위 클래스를 포괄할 수 있도록 충분히 추상화되어야 한다. 다만, 너무 과한 추상화는 되려 독이 됨을 명심해야 한다.

### 4. 중복을 최대한 줄여라
리팩토링은 거창한 것이 아니다. 불필요한 중복을 최대한 줄여나가는 과정이다.

### 5. 주석이 없이도 이해 가능한 코드를 짜라
주석이 있다는 것은 곧, 변수명과 함수명이 해당 기능을 충분히 설명하지 못 하고 있다는 것이다. 또한, 어중간한 주석은 되려 혼란을 가중시킨다.

### 6. 다시 한 번 말하지만 컨벤션을 지켜라
컨벤션을 지키는 이유에는 가독성의 측면이 가장 크겠지만, 그 외에도 코드 간의 개념적 유사성이나 관계를 나타낼 수도 있다. 종속적인 개념을 지닌 함수의 인자의 경우 괄호를 붙이고, if문의 괄호는 띄어 쓰는 것이 대표적인 예다. 또한, 관련 있는 기능을 수행하는 함수들은 그룹핑하는 것이 좋다.

### 7. 깨진 유리창 이론(broken windows theory)을 기억하라
깨끗한 코드는 모두가 깨끗하게 유지하려 노력하지만, 지저분한 코드는 모두가 더욱 지저분하게 만들려 한다.
[위키피디아 | 깨진 유리창 이론](https://ko.wikipedia.org/wiki/%EA%B9%A8%EC%A7%84_%EC%9C%A0%EB%A6%AC%EC%B0%BD_%EC%9D%B4%EB%A1%A0)

### 8. 테스트 하라, 또 테스트 하라, 그리고 다시 테스트 하라
자바스크립트와 같은 인터프리터 언어라면 컴파일 언어에 비해 테스트의 결과를 훨씬 빠르게 받아볼 수 있다. 넘겨 짚고 대충 넘어가지 말고 수시로 `console.log()`를 통해서라도 어떤 데이터가 움직이는지 눈으로 확인하라.

![test](https://images.unsplash.com/photo-1518349619113-03114f06ac3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)

### 9. 결합도를 최대한 줄여라
특정 컴포넌트를 제거하거나 다른 컴포넌트로 바꾸더라도 이상 없이 동작할 수 있도록 컴포넌트 간의 결합도를 최대한 줄여라.

### 10. 처음부터 완벽한 코드는 없다.
이 부분은 클린 코드를 읽으며 가장 기억에 남았던 내용이다. 밥 아저씨 또한 여느 프로그래머들처럼 코드 초안은 의식의 흐름대로 작성되어 완벽과는 거리가 멀다고 밝혔다. 실제로 코드 초안을 리펙토링 하며 나아지는 예제를 보여주기도 한다. 마치 소설가가 초안을 작성하고 퇴고를 수십 수백번 하듯 프로그래머 역시 수시로 코드를 들여다 보며 깨끗하게 가꾸어야 한다고 말하고 있다.

![writer](https://images.unsplash.com/photo-1517817748493-49ec54a32465?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)

## 나의 현 수준을 파악할 수 있는 책
프로그래머 추천 도서 목록에서 항상 상위권을 차지하는 클린 코드이기에 호기심 반, 의무감 반으로 읽었다. 읽기 전부터 어느 정도 예상은 했으나 역시나 지금 내 수준으로 모든 내용을 이해하기에는 무리가 있었으며, 위의 10가지 정도만이 현재의 내 코드에 간신히 적용해볼 수 있는 내용들이라 생각한다. 과연, 6개월 뒤, 1년 뒤에 다시 클린 코드를 읽는다면 얼마나 더 이해할 수 있게 될지 조금 기대가 된다.

***

**다른 북리뷰:**
- [프로그래밍 심리학](https://codeameba.netlify.app/blog/phychology-of-programming)
- [프로그래머의 길, 멘토에게 묻다](https://codeameba.netlify.app/blog/apprenticeship-patterns)
- [조엘 온 소프트웨어](https://codeameba.netlify.app/blog/joel-on-software)