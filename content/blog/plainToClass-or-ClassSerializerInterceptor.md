---
title: "plainToClass와 ClassSerializerInterceptor 중 무엇을 써야하나"
date: "2025-01-21"
update: "2025-01-21"
draft: false
category: "NestJS"
path: "/blog/plainToClass-or-ClassSerializerInterceptor"
---

둘 다 응답객체를 제어할 때 사용 가능하다. 각각 장단점이 있지만 일반적으로 ClassSerializerInterceptor를 사용하는 것이 더 권장된다.

### plainToClass

```typescript
// users.controller.ts
@Controller("users")
export class UsersController {
  @Get()
  async findAll() {
    const users = await this.usersService.findAll()
    return plainToClass(UserResponseDto, users, {
      excludeExtraneousValues: true,
    })
  }
}
```

**장점:**

- 명시적이고 직관적
- 특정 엔드포인트에만 선택적으로 적용 가능
- 변환 옵션을 세밀하게 제어 가능

**단점:**

- 코드 중복 발생
- 실수로 적용을 빼먹을 수 있음
- 컨트롤러 코드가 변환 로직으로 복잡해짐

### ClassSerializerInterceptor

```typescript
//main.ts
// 전역 설정
app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
```

```typescript
// users.controller.ts
@Controller("users")
export class UsersController {
  @Get()
  async findAll() {
    return this.usersService.findAll() // 더 깔끔한 코드
  }
}
```

**장점:**

- 코드가 더 깔끔하고 간결
- 일관성 있는 응답 처리
- 실수로 빼먹을 가능성이 없음
- AOP(관점 지향 프로그래밍) 원칙에 부합

**단점:**

- 전역 설정이므로 모든 응답에 영향
- 세밀한 제어가 필요한 경우 추가 설정 필요

### 권장사항

1. 기본적으로는 Interceptor 사용

```typescript
// main.ts
app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
```

2. 특별한 케이스에만 plainToClass 사용

```typescript
// users.controller.ts
@Controller("users")
export class UsersController {
  // 특별한 변환이 필요한 경우에만
  @Get("special")
  async getSpecialFormat() {
    const users = await this.usersService.findAll()
    return plainToClass(SpecialUserDto, users, {
      excludeExtraneousValues: true,
      groups: ["special"],
    })
  }

  // 일반적인 경우는 심플하게
  @Get()
  async findAll() {
    return this.usersService.findAll()
  }
}
```

3. 혼합 사용 시 주의사항

```typescript
// user-response.dto.ts
export class UserResponseDto {
  @Expose()
  id: number

  @Expose()
  username: string

  @Exclude()
  password: string

  // 특정 그룹에만 노출
  @Expose({ groups: ["admin"] })
  secretData: string

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial)
  }
}
```

결론적으로, 일관성과 유지보수성을 위해 ClassSerializerInterceptor를 기본으로 사용하고, 특별한 변환이 필요한 경우에만 선택적으로 plainToClass를 사용하는 것이 좋다.
