---
title: "리액트에서의 map()의 활용"
date: "2020-06-17"
update: "2020-06-17"
draft: false
category: "React"
path: "/blog/react-using-map-method"
---

## map()이 유용한 순간

```jsx
import React from "react";

class Story extends React.Component {
  render() {
    return (
      <article className="Story">
        <ul>
          {this.props.stories.map(story => (
            <li key={story.id}>
              <div className="img-wrapper">
                <img src={story.src} alt={story.name} />
              </div>
              <p>{story.name}</p>
            </li>
          ))}
        </ul>
      </article>
    );
  }
}

export default Story;
```

위의 예시 코드는 필자가 인스타그램 클론을 만들 당시 인스타그램 스토리즈를 구현했던 코드다. 콜백으로 배열을 받아 각 요소에 동일한 작업을 한 후 배열을 리턴하는 `map()` 메서드를 활용하기에 좋은 상황이라고 할 수 있다.

[자바스크립트의 반복 배열 메서드](https://intzzzero.netlify.app/array-method-iteration)

## key

그리고, 위와 같이 `map()`을 사용하여 여러 요소들을 생성할 때 절대 빠뜨리면 안 되는 어트리뷰트가 있는데, 바로 `key`다.

`key`는 동일한 형태를 지닌 여러 요소들을 구분할 수 있게 하는 고유값이다. 따라서 어떤 값을 할당할 것인가 깊게 고민해야 할 필요가 있는데, 대부분의 API에는 이미 고유한 ID값이 존재하므로, 해당 ID값을 할당하는 것이 가장 적절하지 않을까 생각한다.

`map()`의 두 번째 parameter인 index값을 넣을 수도 있겠지만, index는 변할 가능성이 있으므로 좋은 선택은 아니라고 할 수 있다.

그리고, 아쉽게도 `key`는 리액트만 알 필요가 있는 값이기 때문에 이를 이용하여 우리가 무언가를 할 수는 없다. 따라서 특정 요소를 선택하여 무언가를 해야 할 때에는 `value={story.id}`와 같이 별도의 어트리뷰트를 지정할 필요가 있다.
