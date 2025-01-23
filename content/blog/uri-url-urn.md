---
title: "What is the difference between a URI, a URL and a URN?"
date: "2020-06-02"
update: "2020-06-02"
draft: false
category: "Network"
path: "/blog/what-is-uri"
---

![stackoverflow logo](https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-logo.svg?v=a010291124bf)

_Stackoverflow에 올라온 URI, URL, URN의 차이를 묻는 질문에 대한 답변 중 개인적으로 가장 이해하기 쉬웠던 답변을 번역함. 의역 포함.(원문 링크 - [https://stackoverflow.com/questions/176264/what-is-the-difference-between-a-uri-a-url-and-a-urn/1984225#1984225](https://stackoverflow.com/questions/176264/what-is-the-difference-between-a-uri-a-url-and-a-urn/1984225#1984225))_

## Q. URI와 URL 그리고 URN의 차이가 무엇인가요?

사람들은 URI와 URL 그리고 URN을 각기 다른 것처럼 이야기 하는데, 내 눈에는 다 똑같아 보입니다. 이것들을 구분할 수 있는 차이점이 무엇인가요?

## A. URI(Uniform Resource Identifier)는 식별정보(Identify)를 지니고, URL(Uniform Resource Locator)은 위치정보(Locate)를 지닙니다. 위치정보 역시 하나의 식별정보이기 때문에 모든 URL은 URI이기도 합니다. 그러나, URI는 URL이 아닙니다.

## 예시

**_Roger Pate_**
이것은 내 이름입니다. 일종의 **식별자**로써 URI라고 할 수 있습니다. 하지만 URL은 아닙니다. 왜냐하면 이름만으로는 내 위치나 연락처에 대한 정보는 알 수 없기 때문이죠. 이런 경우, 식별자가 겹치는 사람이 미국에서만 적어도 5명은 될 겁니다.

**_4914 West Bay Street, Nassau, Bahamas_**
이것을 나의 현재 위치라고 가정하겠습니다. 물리적인 위치 식별자라고 볼 수 있죠. 식별자로써의 역할을 한다는 점은 URL이나 URI나 둘 다 같습니다만(모든 URL은 URI입니다), 이런 경우에는 간접적으로 나의 **거주지**를 식별할 수 있습니다. 이를 통해 나를 보다 정확하게 특정할 수 있겠죠. 물론, 저에게 룸메이트가 생긴다면 조금 달라질 테지만 말이죠.

## 혼동하기 쉬운 것

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 컴퓨팅에서 URL은 식별된 리소스가 사용 가능한 위치와 검색 매커니즘을 지정하는 URI의 하위 집합이다. **일반적인 사용이나 다수의 기술 문서, 토론 등에서 종종 URL은 URI의 동의어로 잘못 사용되기도 한다.**

이처럼 혼동하는 경우가 심심치 않게 있어서, 많은 제품과 문서에서는 한 가지 용어만 사용하거나, 뚜렷하게 구분이 되는 기준을 지정하거나 또는, 그 둘을 동의어로 간주하기도 합니다.

## URN(Uniform Resource Name)

내 이름인 **_Roger Pate_** 를 URN이라고 볼 수도 있습니다. 하지만 실제 URN은 그보다 훨씬 더 엄격한 규제 안에서 존재하며, 장소와 시간을 특정할 수 있습니다.
내 이름이 URN이 될 수 없는 이유는 다음과 같습니다.

- 첫째, 충분히 동명이인이 존재할 수 있습니다.
- 둘째, 내 이름은 증조할아버지의 이름을 따 지었기 때문에 고유하다고 할 수 없습니다.
- 셋째, 만약 내 후손 중에 누군가가 내 이름을 쓸 수 있는 가능성이 있습니다.
  이와 같은 이유들로 내 이름은 URN이 되기에 적절치 않습니다.

URN은 이처럼 매우 엄격한 제약 조건이 따르기에 URL과는 엄연히 다르며, URN과 URL은 둘 다 URI의 한 종류입니다.

<br />
<br />
## 역자주
내가 이해한 URI, URL, URN의 차이는 다음과 같다. 도서관에서 책을 찾는 상황으로 생각해보면 좋다고 생각한다.

![uri urn url](https://danielmiessler.com/images/uri-urn-url-miessler-2019-1024x969.png)

- URI는 해당 책의 제목, 저자, 출판사, 위치, ISBN 등 특정한 책을 찾을 때 필요한 모든 가용정보를 포함한다.
- URL은 도서관이나 서점 등에서 따르는 도서분류규칙에 의거하여 특정 위치에 특정 도서가 있는 것이다. 이 경우 실제 콘텐츠인 책이 규칙을 벗어나 다른 위치로 옮겨지면 찾을 수 없을 텐데 이를 404 Error로 생각할 수 있다.
- URN은 특정 책의 고유번호인 ISBN으로 볼 수 있다. 이를 통해 해당 콘텐츠에 직접적으로 접근이 가능한 것이다.

![library](https://images.unsplash.com/photo-1553714198-c9d2ecdfe675?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)

**참고:**

- [https://danielmiessler.com/study/url-uri/](https://danielmiessler.com/study/url-uri/)
- [https://stackoverflow.com/questions/176264/what-is-the-difference-between-a-uri-a-url-and-a-urn/1984225#1984225](https://stackoverflow.com/questions/176264/what-is-the-difference-between-a-uri-a-url-and-a-urn/1984225#1984225)
- [https://en.wikipedia.org/wiki/Uniform_Resource_Name](https://en.wikipedia.org/wiki/Uniform_Resource_Name)
