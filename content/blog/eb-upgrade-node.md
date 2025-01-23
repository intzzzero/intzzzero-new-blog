---
title: "엘라스틱 빈스톡(Elastic Beanstalk) 노드 업그레이드"
date: "2022-10-27"
update: "2022-10-27"
draft: false
category: "dev"
path: "/blog/eb-upgrade-node"
---

## 계기

기존에 엘라스틱 빈스톡(Elastic Beanstalk, 이하 EB)으로 구축되어 있던 서버의 Node.js 버전 이슈로 인해 환경을 새로 구축해야 하는 상황에 처했다.
기존 EB 환경은 Node.js 12버전을 쓰고 있었다. 그 동안 딱히 호환성 문제가 발생하지 않았기에 플랫폼 상태가 Deprecated가 되었음에도 그대로 사용하고 있었는데, 이번에 꼭 업데이트해야만 하는 패키지가 Node.js 14버전 이상에서만 동작하는 것이다. 로컬에서는 잘 돌아가는데 데브환경에 배포하면 서버가 503를 뱉으며 뻗어버리는 탓에 원인을 찾다가 알게 되었다.

이를 통해 앞으로는 배포 전에 해당 패키지의 package.json도 반드시 확인하자는 다짐을 하게 되었다.

```json
  "engines": {
    "node": ">=14"
  }
```

package.json에 위와 같이 요구되는 환경 버전이 기재되어 있다.

어찌되었든 원인을 알았으니, EB 환경의 Node.js 버전을 올려야만 한다. 기존 환경의 플랫폼을 업그레이드하면 되려나 싶었으나 그러면 구동중인 서버가 업그레이드 완료 시까지 셧다운 될 것이라 다른 방법을 찾던 도중
[Elastic Beanstalk에서 Node.js 솔루션 스택 버전 업데이트](https://aws.amazon.com/ko/premiumsupport/knowledge-center/elastic-beanstalk-nodejs-new-version/)를 읽게 되었다. 이 내용에 따르면 이미 단종된 Amazon Linux 1에서는 이미 생성된 환경을 업그레이드하는 게 가능했지만, Amazon Linux 2에서는 새환경을 생성해야 한다고 한다.

따라서 내 계획은 이렇다.

1. 기존 서버는 그대로 돌아가게 두고 새로운 환경을 생성
2. 새로운 환경을 Node.js 16버전으로 구성
3. 문제가 됐던 패키지가 설치된 버전을 새로운 환경에 배포 후 테스트
4. 기존 패키지들과의 호환성 테스트
5. 문제가 없을 시 앱과 연결 및 이전 환경 제거

<br /><br />

## 환경생성

![엘라스틱빈스톡 환경생성 2](https://raw.githubusercontent.com/intzzzero/amebalab/master/src/images/eb-02.png)
![엘라스틱빈스톡 환경생성 3](https://raw.githubusercontent.com/intzzzero/amebalab/master/src/images/eb-03.png)

EB에서 환경은 하나의 애플리케이션 하위에 여러 개가 존재할 수 있다. My-App이라는 서비스 하위에 '유저버전(production)'과 '개발버전(development)' 등을 각각 분리하여 구성할 수 있다는 것이며 필요에 따라 dev1, dev2, dev3 등등 환경을 얼마든지 더 늘릴 수도 있다.

애플리케이션 탭 내에서 '새 환경 생성'을 하면 기존의 다른 환경들의 설정을 손쉽게 가져올 수 있다.

![엘라스틱빈스톡 환경생성 4](https://raw.githubusercontent.com/intzzzero/amebalab/master/src/images/eb-04.png)
![엘라스틱빈스톡 환경생성 5](https://raw.githubusercontent.com/intzzzero/amebalab/master/src/images/eb-05.png)

환경 이름만 구분이 되도록 정하고,

![엘라스틱빈스톡 환경생성 6](https://raw.githubusercontent.com/intzzzero/amebalab/master/src/images/eb-06.png)

플랫폼과 Node.js 버전을 선택한다. 그리고, 환경 생성과 동시에 배포할 버전을 기존에 배포되었던 버전들 중에서 선택할 수 있다.
경우에 따라 '추가 옵션 구성'으로 진입하여 로드밸런서나 인스턴스 설정 등을 조정한 뒤 '환경 생성'을 하면 5~10분 뒤 환경 생성이 완료된다.

<br /><br />

### 참조

- [AWS Elastic Beanstalk란 무엇입니까? - AWS Elastic Beanstalk](https://docs.aws.amazon.com/ko_kr/elasticbeanstalk/latest/dg/Welcome.html)
- https://dev.classmethod.jp/articles/deploy-express-application-to-elastic-beanstalk/
- [Elastic Beanstalk에서 Node.js 솔루션 스택 버전 업데이트](https://aws.amazon.com/ko/premiumsupport/knowledge-center/elastic-beanstalk-nodejs-new-version/)
