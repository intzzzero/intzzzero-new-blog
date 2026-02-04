---
title: "Database TIL 03"
date: "2021-01-04"
update: "2021-01-04"
draft: false
category: "Database"
path: "/blog/database-til-03"
---

## InnoDB와 MyISAM의 차이

**트랜잭션\(Transaction\)** 이란, 하나의 논리적인 프로세스에서 쿼리의 개수에 상관 없이 논리적인 프로세스가 100% 적용되거나 혹은 전혀 적용되지 않음을 보장해주는 것이다.
이러한 관점에서 InnoDB와 MyISAM 두 엔진의 차이를 보자면,

```sql
CREATE TABLE tbl_myisam (idx INT NOT NULL, PRIMARY KEY (idx)) ENGINE=MyISAM;
INSERT INTO tbl_myisam (idx) VALUES (3);

CREATE TABLE tbl_innodb (idx INT NOT NULL, PRIMARY KEY (idx)) ENGINE=INNODB;
INSERT INTO tbl_innodb (idx) VALUES (3);
```

위와 같이 각각의 엔진으로 별도의 테이블을 만든 뒤, idx 3을 추가한다.

```sql
INSERT INTO tbl_myisam (idx) VALUES (1), (2), (3);
INSERT INTO tbl_innodb (idx) VALUES (1), (2), (3);
```

그리고, 위와 같이 idx 1, 2, 3을 추가했을 때 idx는 PK이기 때문에 당연히 idx=3에 대해 중복 오류가 출력될 것이다. 여기까지는 InnoDB와 MyISAM이 동일하게 작동한다. 하지만, 쿼리 실행 후 테이블을 확인해보면 둘의 차이가 드러난다.

```sql
SELECT * FROM tbl_myisam;
+------+
| idx  |
+------|
|    1 |
|    2 |
|    3 |
+------+

SELECT * FROM tbl_innodb;
+------+
| idx  |
+------|
|    3 |
+------+
```

위에서 볼 수 있듯 MyISAM은 오류가 발생하기 전까지의 프로세스를 실행하여 3에서 중복이 있었음에도 1, 2가 저장되었다. 반면에 InnoDB에서는 쿼리 중 일부에서 오류가 발생하면 전체 쿼리의 실행을 취소하여 이전의 상태로 복구한다.

트랜잭션 원칙 측면으로 보자면 InnoDB가 부합하고 있으며, MyISAM과 같이 쿼리의 일부에 오류가 있더라도 부분적으로 적용되는 현상을 **부분 업데이트\(Partial Update\)** 라고 부르며, 테이블 데이터의 정합성을 맞추는 데 문제를 야기할 수 있다.
