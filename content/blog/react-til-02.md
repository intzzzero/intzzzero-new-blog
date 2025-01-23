---
title: "React TIL 02"
date: "2020-06-06"
update: "2020-06-06"
draft: false
category: "React"
path: "/blog/react-til-02"
---

## React TIL 02

![](https://github.com/codeAmeba/amebalab/blob/master/src/images/key_prop_warning.png?raw=true)

- props를 전달할 때 고유값을 전달하지 않으면 위와 같이 경고가 뜬다.
- 따라서 props에 ID를 만들고 아래와 같이 key로 넘겨야 함.

```js
{BeerBox.map(beer => (
  <Beers key={beer.id} name={beer.name} picture={beer.image} />
))}
```

- `npm i prop-types`
  - props가 잘못 전달 되었을 때 이를 알려주는 도구
  - 아래와 같이 각 필요한 데이터의 타입을 명시해준다

```js
Beers.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
}
```

#### propTypes 참고
- [proptypes](https://reactjs-kr.firebaseapp.com/docs/typechecking-with-proptypes.html)