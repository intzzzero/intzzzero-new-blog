---
title: "[Database TIL 04] MySQL에 emoji 저장하기"
date: "2022-04-20"
update: "2022-04-20"
draft: false
category: "Database"
path: "/blog/database-til-04"
---

## emoji를 저장하기 위해서는
- AWS RDS 사용 시 파라미터그룹 편집이 필요함
- 편집 없이 그대로 저장 시 `???` <- 이와 같이 제대로 파싱되지 않은 채 저장됨
	- MySQL character set 기본값이 이모지를 파싱할 수 없는 utf8로 되어있기 때문
	- MySQL 5.5.3 버전 이후부터는 utf8mb4를 제공하여 이를 통해 이모지 파싱 및 저장이 가능
	- utf8은 한 글자당 최대 3bytes까지 지원하는데, 이모지의 경우 최대 4bytes가 필요하기 때문에 생기는 문제, 따라서 4bytes 문자열 저장이 가능한 utf8mb4를 사용하는 것
- `SHOW GLOBAL VARIABLES WHERE Variable_name LIKE ‘character\_set\_%’ OR Variable_name LIKE ‘collation%’`  <- 현재 데이터베이스의 charater set 설정값을 모두 확인하는 쿼리
- 먼저 rds에서 파라미터 그룹 편집

```
character_set_client  : utf8mb4
character_set_connection : utf8mb4
character_set_database : utf8mb4
character_set_results : utf8mb4
character_set_server : utf8mb4

collation_connection : utf8mb4_unicode_ci
collation_server : utf8mb4_unicode_ci
```

- 설정값 변경 이후 생성되는 테이블만 기본값으로 적용되기 때문에 변경 이전에 생성된 테이블은 따로 charater set 변경이 필요
	- `ALTER TABLE table_name CHARACTER SET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`


## error case

1. `mysql row size too large. the maximum row size for the used table type not counting blobs is 65535`
	- varchar -> text로 타입 변경하면 해결 가능

2. `Illegal mix of collations (utf8_unicode ci, IMPLICIT) and (utf8 general_ci, IMPLICIT) for operation ‘=‘`
	- 일부 테이블만 utf8mb4로 변경하거나 collation이 통일되지 않은 경우 character set이나 collation이 다른 table끼리 비교나 join을 할때 출력되는 에러 -> 연관되는 테이블끼리는 설정을 통일해주면 해결 가능