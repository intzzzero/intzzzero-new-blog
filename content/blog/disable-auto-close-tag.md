---
title: "[TS] 제네릭에서 태그를 왜 닫아"
date: "2021-03-29"
update: "2021-03-29"
draft: false
category: "JavaScript"
path: "/blog/disable-auto-close-tag"
---

최근 타입스크립트를 익히고 있다. 한 집안 식구인 만큼 워낙 vscode가 타입스크립트 친화적이라 큰 불편함은 없는데, 딱 하나, 마음에 안 들던 것이 제네릭 사용 시 vscode의 확장프로그램 중 auto-close-tag가 작동한다는 점이었다. 예를 들어 다음과 같은 경우다.

```typescript
const arr: Array<number></number> = [1, 2, 3];
```

![](https://ohfun.net/contents/article/images/2019/0701/1561976612478376.jpg)

<br />
아니 왜 여기서 태그를 닫아?

불편함을 느낀 즉시 해답을 찾아봤어야 했는데 여태 자동완성된 닫는 태그는 손수 제거해주며 제네릭을 사용했다. 참 나쁜 습관이다. 그나마 이제라도 근본적인 원인해결에 나섰으니 다행이라고 생각해야 하나.

처음엔 해당 확장프로그램을 그냥 삭제해버릴까 싶었지만, 제네릭에서 뜬금 없이 태그를 닫는 현상 외에는 여러모로 편리한 확장프로그램이라 예외처리 방법을 찾아보았다. 그리고, 역시나 내가 만나는 모든 문제는 이미 누군가가 스택오버플로우에 물어본 질문이었다.

다음과 같이 setting.json에 몇 줄만 추가해주면 그것으로 끝이었다. 내용을 보아하니 auto-close-tag를 사용할 파일 형식을 넣어주면 그 외의 파일에서는 작동하지 않는 것 같다.

```json
{
  "auto-close-tag.activationOnLanguage": [
    "html",
    "xml",
    "javascript",
    "javascriptreact",
    "typescriptreact"
  ]
}
```
