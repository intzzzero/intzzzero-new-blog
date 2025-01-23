---
title: "알아두면 정신건강에 이로운 Emmet"
date: "2020-06-19"
update: "2021-12-20"
draft: false
category: "etc"
path: "/blog/how-to-use-emmet"
---

## Emmet

Emmet(자동완성)을 처음 알게 되었을 때의 그 감동을 잊을 수가 없다.
Emmet을 알기 전까지는 당연하겠지만 IDE를 실행 시키면 `<!DOCTYPE HTML><html><head><meta charset="utf-8"><title></title></head><body></body></html>`를 기계적으로 작성하곤 했다. 매번 이렇게 직접 타이핑 하는 것이 교육적 측면에서는 좋다고 생각하지만, 뭔가 스마트하지는 않다고 느끼던 차에 Emmet의 존재를 알게 된 것이다. 앞에서 작성했던 HTML 기본 양식을 Emmet을 사용하면, **!** 혹은, **html:5** 만으로 완성할 수가 있다. 조금 집중해서 한다면 0.5초도 걸리지 않을 것이라 확신한다.

그 외에도 다양한 단축키를 제공하고 있는데, 예를 들어 아래와 같은 리스트를 작성해야 하는 경우,

```html
<article>
  <h1>인트제로의 구매 예정 도서</h1>
  <ul>
    <li>코드 컴플리트</li>
    <li>클린코드</li>
    <li>리팩토링</li>
    <li>실용주의 프로그래머</li>
    <li>프로그래밍 심리학</li>
  </ul>
</article>
```

예시 코드를 최선을 다해 타이핑 했는데도 3분 가량 소요되었다. 하지만, 같은 코드를 Emmet으로 작성한다면?

```html
article>h1{인트제로의 구매 예정 도서}+ul>li*5
```

이게 끝이다. 30초도 안 걸렸다. 물론, `<li></li>`의 내용은 추가로 작성해야하지만, 이것만으로도 소요시간을 대폭 줄일 수가 있다. 이런 Emmet 공식은 종류가 무척 다양하며 아래의 링크에서 확인할 수 있다. VSCode의 경우 기본적으로 탑재되어 있는 기능인데, 만약 없다면 확장프로그램을 검색해보자.

**참고:**

- [VSCode에서의 Emmet 사용법](https://code.visualstudio.com/docs/editor/emmet)
- [Emmet 단축키 모음](https://docs.emmet.io/cheat-sheet/)
