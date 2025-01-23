---
title: "React TIL 06"
date: "2020-06-10"
update: "2020-06-10"
draft: false
category: "React"
path: "/blog/react-til-06"
---

## React TIL 06
## Cutting the summary
- 텍스트의 크기를 배경에 맞추기 위해 자바스크립트에서 가공해야 함
- 이때 Array 메서드를 사용하는데, 문자열은 배열과 마찬가지로 iterable이기 때문.
- 예를 들어 아래와 같다.

```js
const example = 'This is string';
example.length; // 14
example.slice(0, 5); // "This "
```

- 배열과 같이 length를 구할 수 있으며 slice 등의 메서드를 활용하여 가공이 가능하다.
- [String.prototype.slice() - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
- 따라서 이를 통해 아래와 같이 활용이 가능하다.

```js
<p className="movie_summary">{summary.slice(0,140)}</p>
```

## Deploying to Github Pages
### gh-pages 설치
- `npm i gh-pages`
- gh-pages를 통해 GitHub-page 도메인에 보여지도록 할 수 있다.

### package.JSON 설정
- 이때 홈페이지 주소는 해당 레포 이름
- script에 deploy와 predeploy 항목을 추가
	- deploy에는  `npm run build`를 한 다음 build 폴더를 업로드
		- `"gh-pages -d build`
	- predeploy에는 `npm run build`를 설정하여 deploy를 호출할 때마다 build가 되도록 함

```json
{
"name":"movie_app_2019",
"version":"0.1.0",
"private":true,
"dependencies":{
"axios":"^0.19.0",
"gh-pages":"^2.1.1",
"prop-types":"^15.7.2",
"react":"^16.9.0",
"react-dom":"^16.9.0",
"react-scripts":"3.1.0"
},
"scripts":{
"start":"react-scriptsstart",
"build":"react-scriptsbuild",
"deploy":"gh-pages-dbuild",
"predeploy":"npmrunbuild"
},
"eslintConfig":{
"extends":"react-app"
},
"browserslist":{
"production":[
">0.2%",
"notdead",
"notop_miniall"
],
"development":[
"last1chromeversion",
"last1firefoxversion",
"last1safariversion"
]
},
"homepage":"http://www.codeameba.com/react-basic-with-nomadcoders"
}
```

### deploy
- `npm run deploy`를 하면 배포가 되는 것을 확인 할 수 있음
- 수정 후에는 deploy도 다시 해야 함
- [NOMFLIX](http://codeameba.github.io/react-basic-with-nomadcoders/)