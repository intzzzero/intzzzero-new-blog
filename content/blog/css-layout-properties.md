---
title: "CSS 레이아웃의 기본 display, position, float"
date: "2020-05-26"
update: "2020-05-26"
draft: false
category: "CSS"
path: "/blog/layout-properties"
---

![CSS](https://media.vlpt.us/images/daybreak/post/1c7df7ec-65ee-4617-8b97-31dddd944dc3/css.jpg)

## 웹 페이지의 레이아웃(layout)

웹 페이지의 레이아웃을 구성하는데 유용한 CSS의 프로퍼티에는 크게 `display`, `position`, `float`가 있으며, 이 세 가지 프로퍼티를 활용함에 있어서는 기본적으로 **박스모델** 에 대한 이해가 필요하다.

[CSS 박스 모델(Box Model)을 알아보자](https://intzzzero.netlify.app/box-model)

## display

`display`는 해당 요소를 블록(block)과 인라인(inline) 둘 중 어떤 방식으로 자리를 차지하게 할지 정하는 프로퍼티다. 이를 통해 `<div>`, `<p>` 등의 블록 요소를 인라인으로 바꿀 수도 있고, `<span>`고 같은 인라인 요소를 블록으로 바꿀 수도 있다. 그 외에도 `flow`, `flex`, `grid`처럼 반응형 웹에 적절하게 사용 가능한 속성도 있다.

### block

블록 요소는 가장 기본적인 형태로써 `<div>`, `<p>`, `<form>` 등이 있으며, 해당 요소가 위치한 가로줄을 모두 차지한다는 특징이 있다.

### inline

블록과 함께 가장 기본적인 형태인 인라인은 대표적으로 `<span>`, `<a>` 태그가 있다. 인라인 요소는 태그에 포함된 내용 만큼의 자리만 차지하는 것이 특징이다. 별도의 `width`, `height`를 지정하더라도 적용되지 않는다.

### inline-block

블록과 인라인의 장점을 하나로 합친 듯한 프로퍼티로써 일정한 사이즈를 유지하는 동시에 줄 바꿈은 원치 않을 때 사용할 수 있다. `inline-block`을 기본값을 갖는 대표적인 태그로는 `<button>`이 있다.

### none

말 그대로 화면에서 해당 요소를 보이지 않게 만든다. 자칫 `visibility: hidden`과 혼동할 수 있으나, `visibility: hidden`은 요소를 보이지만 않게 만들고 자리는 여전히 차지하는 반면에 `display: none`으로 설정하면 보이지도 않고, 자리도 차지하지 않는다.

### flex

화면의 비율을 기준으로 레이아웃을 구성할 수 있는 속성이다. 반응형 웹 제작에 유용하며, 과거와 달리 이제는 98.65%([Can I use… Support tables for HTML5, CSS3, etc](https://caniuse.com/#search=flex))의 브라우저 호환성을 지녔기에 충분히 사용 가능하다고 본다.

**flex 연습 사이트** -> [Flexbox Froggy - A game for learning CSS flexbox](https://flexboxfroggy.com/#ko)

**예시**
[](https://codeameba.github.io/front-end-practice/layout-practice/display.html)

```html
  <style>
    * {
      box-sizing: border-box;
    }
    .block{
      background-color: blue;
      width: 150px;
      height: 150px;
      margin: 10px auto;
    }
    .inline {
      background-color: green;
      margin: 10px;

    }
    .inline-block {
      display: inline-block;
      background-color: red;
      width: 150px;
      height: 150px;
      margin: 10px;
    }
    .flex {
      display: flex;
      justify-content: center;
    }
    .flex div {
      background-color: yellow;
      width: 150px;
      height: 150px;
      margin: 10px;
    }
  </style>
</head>
<body>
  <div class="block">I am block</div>

  <span class="inline">I am inline</span>

  <div class="inline-block">I am inline-block</div>
  <div class="inline-block">I am inline-block</div>

  <div class="flex">
    <div>I am flex</div>
    <div>I am flex</div>
    <div>I am flex</div>
  </div>
</body>
```

**참고:**

- [CSS 레이아웃 기초 • Captain Pangyo](https://joshua1988.github.io/web-development/css/layout-basic/#display-%EC%86%8D%EC%84%B1)
- [CSS - “display” 프로퍼티](http://ko.learnlayout.com/display.html)
- [CSS3 Display | PoiemaWeb](https://poiemaweb.com/css3-display)
- [CSS3 Flexbox Layout | PoiemaWeb](https://poiemaweb.com/css3-flexbox)
- [display | CSS-Tricks](https://css-tricks.com/almanac/properties/d/display/)

## position

`position`는 해당 요소가 페이지에서 어떻게 위치할지 지정하는 프로퍼티로써 설정할 수 있는 속성에는 다섯 가지가 있다.

### static

`static` 은 기본값으로, 별도의 `position`을 지정하지 않은 요소는 모두 `static`이라고 볼 수 있다.

### relative

`relative`는 기본적으로 `static`과 동일하지만, `top`, `left`, `bottom`, `right` 값으로 위치를 조정할 수 있다는 점이 다르다. 그리고, 조정된 위치는 다음 요소의 위치에 영향을 주지 않는다.

### fixed

간혹 상단이나 측면 혹은 어딘가에 고정되어 스크롤을 내려도 계속 따라오는 요소를 발견할 때가 있는데, 이러한 요소들이 바로 `position: fixed`로 설정된 요소들이라고 할 수 있다.
`fixed`는 뷰포트(viewport)에 대하여 상대적으로 위치가 고정되기 때문에 스크롤과 무관하게 같은 위치한다. `relative`와 마찬가지로 위치를 조정할 수 있다.

### absolute

`absolute`는 `fixed`와 유사하게 지정한 위치에 고정할 수 있는 값이지만, 그 기준이 `position` 값을 지닌 가장 근접한 부모 요소라는 점에 다르다. 만약, 부모 요소 중에 `position` 값을 지닌 요소가 하나도 없다면, 문서(document body)를 기준으로 위치가 고정된다. 따라서 `absolute`를 사용하기 전에 반드시 기준으로 삼을 요소에 `position: relative`를 설정하자.

**예시**
[](https://codeameba.github.io/front-end-practice/layout-practice/position.html)

```html
  <style>
    * {
      box-sizing: border-box;
    }
    div {
      margin: 10px;
      width: 150px;
      height: 150px;
    }
    .static {
      background-color: blue;
      color: white;
    }
    .relative {
      background-color: green;
      position: relative;
      left: 50%;
    }
    .fixed {
      background-color: red;
      position: fixed;
      bottom: 0;
      right: 0;
    }
    .parent-of-absolute {
      background-color: pink;
      width: 500px;
      height: 800px;
      position: relative;
    }
    .absolute {
      background-color: yellow;
      position: absolute;
      left: 0;
      bottom: 50%;
    }
  </style>
</head>
<body>
  <div class="static">I am static</div>

  <div class="relative">I am relative</div>

  <div class="fixed">I am fixed</div>

  <div class="parent-of-absolute">
    <div class="absolute">I am absolute</div>
  </div>

</body>
```

**참고:**

- [CSS - position](https://ko.learnlayout.com/position.html)
- [position - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/ko/docs/Web/CSS/position)
- [position | CSS-Tricks](https://css-tricks.com/almanac/properties/p/position/)

## float

신문 혹은 웹의 다양한 아티클을 읽다보면 이미지 주위를 텍스트가 감싸고 있는 형태를 쉽게 볼 수 있다. `float`는 이러한 형태의 레이아웃을 구성할 때 사용하기 좋은 프로퍼티다.

`float: left`와 같은 형태로 값을 지정하며, 설정 가능한 값으로는 `left`, `right`, `none`, `inherit`이 있다.

`float`를 쓰면, 이름 그대로 **부유 하듯이** 다음 요소의 위로 붕 뜨게 된다. 그러나 `float`를 사용한 요소의 다음 요소의 크기가 더 작을 경우 `float`가 적용된 요소 뒤에 가려져 안 보이는 문제가 있다. 이럴 때에는 `clear` 프로퍼티를 사용하여 문제를 해결할 수가 있다.

**예시**
[](https://codeameba.github.io/front-end-practice/layout-practice/float.html)

```html
<style>
    h2 {
      display: inline;
      border-bottom: 3px solid black;
    }

    img {
      width: 200px;
    }

   .container {
      margin: 50px auto;
    }

    .first-article img {
      float: left;
      margin: 5px 10px 5px 0;
    }

    .second-article img {
      float: right;
      margin: 5px 0 10px 10px;
    }

    .box {
      background-color: blue;
      width: 100px;
      height: 100px;
      color: white;
      float: left;
      opacity: 0.5;
    }

    section {
      background-color: green;
      height: 50px;
    }

    .clearfix {
      clear: both;
    }

    .header {
      background-color: yellow;
      height: 50px;
    }
    .main {
      background-color: green;
      height: 150px;
      width: 70%;
      float: left;
    }
    .nav {
      background-color: red;
      height: 150px;
      width: 30%;
      float: right;
    }
    .footer {
      background-color: blue;
      height: 50px;
      color: white;
    }


  </style>
</head>
<body>
  <h2>Normal float</h2>
  <div class="container">
    <div class="first-article">
      <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fopenmatt.org%2Fwp-content%2Fuploads%2F2015%2F11%2Foctocat_kenobi.jpg&f=1&nofb=1" alt="octocat magician">
      <p>
        Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta gravida at eget metus.
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nulla vitae elit libero, a pharetra augue. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
        Donec id elit non mi porta gravida at eget metus. Curabitur blandit tempus porttitor. Donec ullamcorper nulla non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      </p>
    </div>

    <div class="second-article">
      <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fxaharts.org%2Ffunny%2Fi%2Fgitopuss%2Fgithub-octocat_yes-we-code.jpg&f=1&nofb=1" alt="octocat propaganda">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Sed posuere consectetur est at lobortis.
        Maecenas faucibus mollis interdum. Maecenas faucibus mollis interdum. Sed posuere consectetur est at lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
        Maecenas sed diam eget risus varius blandit sit amet non magna. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
      </p>
    </div>
  </div>

  <h2>Float with clear</h2>
  <div class="container">
    <div class="box">I am float</div>
    <section>I am not clear</section>

    <div class="box">I am float</div>
    <section class="clearfix">I am clear</section>
  </div>

  <h2>for example</h2>
  <div class="container">
    <div class="header">I am header</div>
    <div class="main">I am main</div>
    <div class="nav">I am nav</div>
    <div class="footer clearfix">I am footer</div>
  </div>
</body>
```

**참고:**

- [CSS - float](https://ko.learnlayout.com/float.html)
- [float | CSS-Tricks](https://css-tricks.com/almanac/properties/f/float/)
