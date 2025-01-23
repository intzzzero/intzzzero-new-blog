---
title: "CSS 박스 모델(Box Model)을 알아보자"
date: "2020-05-25"
update: "2020-05-25"
draft: false
category: "CSS"
path: "/blog/box-model"
---

![CSS](https://media.vlpt.us/images/daybreak/post/1c7df7ec-65ee-4617-8b97-31dddd944dc3/css.jpg)

## CSS의 기본이자 핵심은 BOX
CSS에서 가장 기본적이자 가장 중요한 개념은 단연 **박스 모델(Box model)**이라고 할 수 있겠다. 이것을 모르면 절대 웹 페이지의 레이아웃을 구성할 수가 없다. 박스 모델은 아래의 그림과 같다.

![box model](https://github.com/codeAmeba/amebalab/blob/master/src/images/css-box-model.jpg?raw=true)

Content는 내용, Padding은 안쪽 여백, Border는 테두리, Margin은 바깥 여백을 말한다. 이것들이 웹 페이지의 레이아웃을 정하는 가장 기본적인 요소들이라고 할 수 있다. 

아무 웹 페이지에서라도 개발자 도구를 실행 시키면 쉽게 확인할 수 있는데, 이를 통해 웹 페이지를 구성하는 모든 것이 결국 박스의 집합이라는 사실을 알 수 있다.

> **개발자 도구 실행 단축키**
> 윈도우: F12
> 맥: option + command + i


## BOX를 다루는 법
박스를 이루는 각각의 요소(padding, border, margin)는 크기 임의로 조정할 수 있다. CSS의 문법을 따르며 다음과 같이 작성한다. 물론, 기본적으로 HTML 문서에 종속(Cascade)되어 있기 때문에, HTML 문서 내의 `<style></style>` 태그 사이에 작성하거나 별도의 CSS 파일을 만들어 HTML 파일에 링크를 해야 한다. 링크된 HTML 문서에 `<div class="box"></div>`가 있다는 가정 하에 다음과 같이 padding과 border에 값을 지정해보겠다.

```css
.box {
    background: deeppink;
    padding: 15px;
    border: 3px solid black;
}
```

그러면, 다음과 같은 형태의 박스를 확인할 수 있다. 가로, 세로 값을 지정하지 않았기 때문에 `<div>`의 기본값인 block이 적용되어 화면 전체를 차지하며, 기본 margin이 적용되어 가장자리에 여백이 있는 것을 확인할 수 있다.

![box model](https://github.com/codeAmeba/amebalab/blob/master/src/images/class-box-02.jpg?raw=true)

마찬가지로 margin에도 임의의 값을 지정할 수 있으며, 기본으로 주어진 8px의 margin을 제거할 수도 있다.


## box-sizing
![box sizing](https://github.com/codeAmeba/amebalab/blob/master/src/images/box-sizing.jpg?raw=true)

위의 BOX 01과 BOX 02의 사이즈는 같은가 다른가? 놀랍게도 같은 크기다. 좀 더 자세히 말하자면, 눈에 보이는 사이즈는 다르지만, 실제 적용된 너비와 높이는 동일하다. 코드는 아래와 같다.

```html
    <style>
        div {
            width: 300px;
            height: 300px;
            margin: 30px auto;
            padding: 15px;
            text-align: center;
            font-size: 3rem;
            font-weight: 800;
            box-shadow: 3px 3px 15px gray;
            border: 3px solid black;
        }
        .box-01 {
            background: palevioletred;
            box-sizing: border-box;
        }
        .box-02 {
            background: paleturquoise;
        }
    </style>
```

차이점을 발견했는가? 그렇다. BOX 01에는 `box-sizing: border-box;`가 적용되어 있다. 이것은 **지정된 박스 크기(width, height)에 border와 padding이 포함된 형태**로 나타나며, 위의 예시에서 볼 수 있듯이 두 박스가 모두 `padding: 15px`을 갖고 있지만 보여지는 크기가 다르다.

쉽게 이해하려면, border와 padding의 값은 적용되지 않는다고 생각하면 좋다. 하지만, '내부에 포함되었을 뿐, 사라진 것은 아니라는 점을 명심하자.' 이러한 특성을 지닌 `border-box`를 사용하는 이유는 **테두리(border나 여백(padding)에 상관 없이 예측 가능한 크기의 박스를 얻기 위함**이다.

`border-box` 외에도 다음과 같은 속성값이 존재한다.
- `content-box`: 기본값
- `padding-box`: 박스의 크기(width, height)에 border와 margin을 제외한 padding까지만 포함한다.

각각의 차이점을 쉽게 이해할 수 있는 예시를 들어보겠다. 아래와 같은 박스가 있다고 쳤을 때,

```css
width: 300px;
height: 300px;
border: 5px solid black;
padding: 10px;
margin: 10px;
```

각 `box-sizing`값에 따라 실제로 차지하는 영역은 다음과 같다.
**content-box(기본값)**: width: 350px, height: 350px
**padding-box**: width: 320px, height: 320px
**border-box**: width: 330px, height: 330px

**참고:**
- [box-sizing - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/ko/docs/Web/CSS/box-sizing)  