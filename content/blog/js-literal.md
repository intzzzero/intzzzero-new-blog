---
title: "리터럴(Literal)의 이해"
date: "2020-05-17"
update: "2020-05-17"
draft: false
category: "JavaScript"
path: "/blog/what-is-literal"
---

![javascript](https://blog.martinwork.co.kr/images/javascript/javascript.png)

## 리터럴(Literal)
리터털(Literal)은 소스 코드 내에 직접 타이핑하여 만들어낸 값 자체를 의미한다. 자칫 값(value)와 혼동하기 쉬운데, **리터럴은 값이 될 수 있지만, 값은 리터럴이 될 수 없다.** 즉, 리터럴은 평가(Evaluation)되기 이전의 표현식을 구성하는 것이라고 할 수 있다.  

```js
7 // 리터럴 표기법으로 작성한 숫자 리터럴
5 + 10 // 표현식의 일부로 작성된 리터럴 5와 리터럴 10
true // 불리언 리터럴
‘Hello!’ // 문자열 리터럴
{ id: 1, name: 'Kirin ichiban', drunk: true } // 객체 리터럴
```

위와 같이 자바스크립트의 소스 코드를 이루는 요소 하나 하나가 모두 리터럴이다.
또한, 리터럴은 값이 될 수 있지만, 값은 리터럴이 될 수 있다는 말은 아래의 예시를 통해 이해할 수 있다.

```js
var a = 10;
var b = 2 + 8;
```

a와 b는 동일하게 10으로 평가된 값을 갖는다. 표현식인 2 + 8이 값을 평가될 때에는 둘의 합으로 평가되어 변수 b에 할당되기 때문이다. 하지만, 리터럴로 놓고 봤을 때 둘은 다르다. a는 10이라는 리터럴이 평가된 값을 갖고, b는 리터럴 2와 리터럴8 그리고, 연산자로 이루어진 표현식이 평가된 값을 갖는다.

**참고:**
- [위키피디아 | 리터럴](https://ko.wikipedia.org/wiki/%EB%A6%AC%ED%84%B0%EB%9F%B4)
- [MDN | Literals](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Obsolete_Pages/Core_JavaScript_1.5_Guide/Literals)