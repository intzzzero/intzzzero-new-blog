---
title: "로컬호스트가 열려있다니?"
date: "2021-08-07"
update: "2021-08-07"
draft: false
category: "etc"
path: "/blog/kill-localhost"
---

업무를 하던 중 평소와 같이 로컬서버를 실행했는데, 이미 `localhost:3000`이 열려있다는 게 아닌가.
분명히 종료했는데, 백그라운드 어딘가에 살아있었나보다.
흔치는 않더라도 왠지 또 겪을 문제 같아서 로컬호스트를 확실히 죽이는 방법에 대해 적어둔다.

## 1. 터미널에서 현재 열려있는 포트 목록을 확인한다.

```bash
sudo lsof -PiTCP -sTCP:LISTEN
```

## 2. 위의 목록에 보통 PID가 같이 나오지만 확인 못한 경우에는 해당 포트의 PID만 불러낸다.

```bash
sudo lsof -i :3000
```

## 3. 알아낸 PID로 열려있는 해당 포트를 닫는다.

```bash
sudo kill -9 PID
```
