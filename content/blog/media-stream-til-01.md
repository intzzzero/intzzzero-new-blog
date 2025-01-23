---
title: "영상 콘텐츠 서비스 레퍼런스 스터디"
date: "2022-10-13"
update: "2022-10-14"
draft: false
category: "dev"
path: "/blog/media-stream-til-01"
---

![미디어스트림 아키텍쳐](https://d1.awsstatic.com/products/cloudfront/VOD%20Architecture%20CloudFront.aa3cb2ec3a8660b42f90072c60672a52d9c357a6.png)
<br /><br /><br />
#### 참조

- [자습서: S3 Batch Operations, AWS Lambda 및 AWS Elemental MediaConvert를 통해 비디오 일괄 트랜스코딩 - Amazon Simple Storage Service](https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/tutorial-s3-batchops-lambda-mediaconvert-video.html)
- [CloudFront를 사용한 온디맨드 비디오(VOD) 제공 - Amazon CloudFront](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/on-demand-video.html)
- [자습서: Amazon S3, Amazon CloudFront 및 Amazon Route 53로 온디맨드 스트리밍 비디오 호스팅 - Amazon Simple Storage Service](https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/tutorial-s3-cloudfront-route53-video-streaming.html)

---

## 주요 기술스택 및 용어

### S3(Simple Storage Service)

데이터를 구성하고 관리하는 데 사용할 수 있는 다양한 기능을 제공한다. 데이터는 버킷(bucket)이라는 리소스에 객체로 저장되며, 한 객체의 크기는 최대 5테라바이트까지 가능하다. S3 기능에는 객체에 메타데이터 태그 추가, S3 스토리지 클래스에서 데이터 이동 및 저장, 데이터 액세스 제어 구성 및 적용, 무단 사용자로부터 데이터 보호, 빅 데이터 분석 실행, 객체와 버킷 수준에서 데이터를 모니터링하고 조직 전체의 스토리지 사용량 및 활동 추세를 보는 등의 기능이 포함된다. 객체는 S3 액세스 포인트를 통해서 액세스하거나 버킷 호스트 이름을 통해 직접 액세스할 수 있다.
<br /><br /><br />

#### 이용
사용자가 앱에서 업로드한 동영상파일 원본과 해당 동영상파일이 인코딩된 후 결과물이 각각의 버킷에 저장될 것이다.
<br /><br /><br />
#### 참조
- [Amazon S3란 무엇인가요? - Amazon Simple Storage Service](https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/Welcome.html)
- [Amazon S3 기능 - Amazon Web Services](https://aws.amazon.com/ko/s3/features/)

---

### CDN(Content Delivery Network)

데이터 사용량이 많은 서비스의 경우 모든 요청에 대해 메인 서버가 모든 응답을 처리하게 되면 부하가 걸리거나 사용자 입장에서는 로딩 속도에 불편함을 느낄 수 있다. 따라서 여러 지역에 위치한 CDN서버에 데이터를 미리 저장해두고 사용자의 요청 시 해당 사용자와 지리적으로 가까운 CDN서버에서 우선적으로 응답하여 통신 지연을 최소화하는 기술이다.

이를 통하여 얻는 이점으로는 아래와 같은 것들이 있다.
**첫째, 페이지 로드 시간 단축.** 페이지 로드 시간이 너무 느릴 경우 사용자는 불편함을 느끼고 결국 트래픽이 감소할 수 있다.
**둘째, 대역폭 비용 절감.** 모든 요청과 그에 따른 응답은 곧 데이터 통신이며 이는 돈과 직결된다. CDN을 사용하면 캐싱 및 기타 최적화를 통해 불필요하게 휘발되는 데이터의 양을 줄여 비용을 절감할 수 있다.
**셋째, 콘텐츠 가용성 제고.** 동시접속자가 너무 많거나 하드웨어에 문제가 생기면 서비스가 중단될 수 있다. 하지만 CDN을 사용한다면 메인 서버에 문제가 생기더라도 CDN서버로 대체하여 서비스 중단을 피할 수 있다.
**넷째, 웹 사이트 보안 강화.** DDoS 공격은 대량의 가짜 트래픽을 발생시켜 서비스의 중단을 야기한다. CDN은 여러 중간 서버 간에 로드를 분산하여 이러한 공격에 의한 영향을 줄인다.
<br /><br /><br />
#### 참조

- [CDN이란 무엇인가요? - CDN 설명 - AWS](https://aws.amazon.com/ko/what-is/cdn/)
- [Caching - Content Distribution Network (CDN)](https://aws.amazon.com/ko/caching/cdn/?nc1=h_ls)

---

### CloudFront

CloudFront는 .html, .css, .js 및 이미지 파일과 같은 정적 및 동적 웹 콘텐츠를 사용자에게 더 빨리 배포하도록 지원하는 AWS의 CDN 서비스다. 엣지 로케이션이라고 하는 데이터 센터의 전 세계 네트워크를 통해 데이터가 전달되며 사용자가 데이터를 요청하면 지연 시간이 가장 낮은 엣지 로케이션으로 요청이 라우팅된다.
리전 엣지 캐시는 모든 유형의 콘텐츠, 특히 시간이 지나면서 점차 사용되지 않게 되는 콘텐츠에 유용하다. 이러한 콘텐츠의 예로는 동영상, 사진 또는 아트웍과 같은 사용자 생성 콘텐츠, 제품 사진 및 동영상과 같은 전자 상거래 자산, 갑자기 사용자가 많아질 수 있는 뉴스 및 이벤트 관련 콘텐츠 등이 있다.

![CloudFront process](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/images/how-cloudfront-delivers-content.png)

>1. 사용자가 웹 사이트 또는 애플리케이션에 액세스하고 이미지 파일 및 HTML 파일 같은 하나 이상의 객체에 대한 요청을 보냅니다.
>2. DNS가 요청을 최적으로 서비스할 수 있는 CloudFront POP(엣지 로케이션)로 요청을 라우팅합니다. 이 위치는 일반적으로 지연 시간과 관련해 가장 가까운 CloudFront POP이며, 요청을 엣지 로케이션으로 라우팅합니다.
>3. CloudFront는 해당 캐시에 요청된 객체가 있는지 확인합니다. 객체가 캐시에 있으면 CloudFront는 객체를 사용자에게 반환합니다. 객체가 캐시에 없으면 CloudFront가 다음을 수행합니다.<br /><br />
>  a. CloudFront는 배포의 사양과 요청을 비교하고 요청을 해당하는 객체로 사용자의 원본 서버(예: Amazon S3 버킷 또는 HTTP 서버)에 전달합니다.<br />
>  b. 원본 서버는 객체를 다시 엣지 로케이션으로 보냅니다.<br />
>  c. 오리진에서 첫 번째 바이트가 도착하면 CloudFront가 객체를 사용자에게 전달하기 시작합니다. CloudFront는 다음에 다른 사용자가 객체를 요청할 때 캐시에 해당 객체를 추가합니다.

<br /><br /><br />
#### 이용

동영상 파일 특성상 용량이 크기 때문에 자칫 네트워크 상황에 따라 사용자 경험을 크게 손상시킬 수 있다. 따라서 CDN을 이용하여 지역에 따른 지연시간을 최소화 한다.
<br /><br /><br />
#### 참조

- [Amazon CloudFront란 무엇입니까? - Amazon CloudFront](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)

---

### Lambda

서버를 프로비저닝하거나 관리하지 않고도 코드를 실행할 수 있게 해주는 AWS의 컴퓨팅 서비스다. Lambda는 고가용성 컴퓨팅 인프라에서 코드를 실행하고 서버와 운영 체제 유지 관리, 용량 프로비저닝 및 자동 조정, 코드 및 보안 패치 배포, 로깅 등 모든 컴퓨팅 리소스 관리를 수행한다.
<br /><br /><br />
#### 이용

사용자가 S3에 동영상을 업로드할 때 Lambda에 미리 생성한 트리거가 발동되어 MediaConvert로 동영상 파일을 인코딩하도록 할 것이다. 또한 인코딩이 완료되었을 때 또한 Lambda를 통해 다른 S3 버킷에 인코딩된 동영상 파일을 저장하도록 한다.
<br /><br /><br />
#### 참조

- [AWS Lambda란 무엇입니까? - AWS Lambda](https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/welcome.html)

---

### MediaConvert

![MediaConvert process](https://d1.awsstatic.com/awselemental/v2diagrams/Product-Page-Diagram_AWS-Elemental-MediaConvert.d664435e05244e230e741fa8ee40b1b84ea08486.png)
AWS가 제공하는 파일 기반 비디오 처리 서비스로 다양한 소스에 대응하여 입력이 가능하고 ABS 패키징 출력 형식이 가능하다.
<br /><br /><br />
#### 이용

사용자로부터 S3 원본 버킷에 업로드된 동영상을 MediaConvert를 이용하여 모두 동일하게 HLS 포맷으로 인코딩할 것이다.
<br /><br /><br />
#### 참조

- [AWS Elemental MediaConvert란 무엇입니까? - MediaConvert](https://docs.aws.amazon.com/ko_kr/mediaconvert/latest/ug/what-is.html)

---

### ABS(Adaptive Bitrate Streaming)

![ABS overview](https://upload.wikimedia.org/wikipedia/commons/4/4b/Adaptive_streaming_overview_daseddon_2011_07_28.png)
사용자의 대역폭과 CPU 사용률을 실시간으로 감지하고 이에 따라 미디어 스트림 품질을 자동으로 조정한다. 이러한 기술이 가능한 것은 동영상 파일과 같은 소스 미디어가 여러 비트레이트로 쪼개진 상태로 인코딩되었을 때이다.
<br /><br /><br />
#### 이용

AWS MediaConvert를 통해 비트레이트 단위로 저장되는 HLS 포맷으로 인코딩하여 S3에 저장할 것이다. 이를 통해 가변 비트레이트 스트리밍이 가능할 것으로 기대한다.
<br /><br /><br />
#### 참조

- [가변 비트레이트 스트리밍(Adaptive Bitrate Streaming)이란 무엇일까? :: Cloud Computing On Demand](https://ondemand.tistory.com/177)
- [What is adaptive bitrate streaming?  | Cloudflare](https://www.cloudflare.com/ko-kr/learning/video/what-is-adaptive-bitrate-streaming/)
- [적응 비트레이트 스트리밍 - 위키백과](https://ko.wikipedia.org/wiki/%EC%A0%81%EC%9D%91_%EB%B9%84%ED%8A%B8%EB%A0%88%EC%9D%B4%ED%8A%B8_%EC%8A%A4%ED%8A%B8%EB%A6%AC%EB%B0%8D)

---

### HLS(HTTP Live Streaming)

![HLS process](https://d2.naver.com/content/images/2015/06/helloworld-7122-1.png)

HLS(HTTP Live Streaming)는 Apple에서 iOS 3.0과 QuickTime X를 위해 2009년에 내놓은 프로토콜이다. 이 프로토콜에서는 스트리밍 데이터를 MPEG-2 Transport Stream에 담아 시간 단위로 잘게 쪼개서 전송한다. 그리고 어떤 파일을 재생해야 하는 지에 대한 정보는 m3u8 파일을 이용하여 플레이어에 전달한다.
HLS는 iPhone과 iPad의 사용자 수가 늘어남으로써 자연스럽게 그 수요가 늘어나게 되었다. 또한, 규격 자체의 단순함과 IETF(Internet Engineering Task Force)를 통한 표준화 작업 등을 통해 다른 업체들도 쉽게 HLS를 지원할 수 있게 했다.
그 결과로, Adobe는 Flash Media Server 4.0에서, Microsoft는 IIS Media Server 4.0에서 HLS를 정식으로 지원하며, 모바일 운영체제에서 상대 진영이라 할 수 있는 Google의 Android에서도 3.0 버전인 Honeycomb부터 HLS를 지원하기 시작했다.
HTTP를 전송 채널로 이용하기 때문에 웹 서비스를 위한 캐시 구조를 그대로 사용할 수 있고, 기존에 구축되어 있는 CDN(Content Delivery Network)도 특별히 변경하지 않고 그대로 이용할 수 있다는 것이 장점이다.
<br /><br /><br />
#### 이용

IOS와 Android 두 환경에서 동일한 동영상 파일이 재생되어야하므로 안정적인. HLS 포맷으로 동영상 파일을 인코딩 할 것이다.
<br /><br /><br />
#### 참조

- [NAVER D2](https://d2.naver.com/helloworld/7122)
- [HTTP 라이브 스트리밍 - 위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/HTTP_%EB%9D%BC%EC%9D%B4%EB%B8%8C_%EC%8A%A4%ED%8A%B8%EB%A6%AC%EB%B0%8D)
