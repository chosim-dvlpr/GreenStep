# 프로젝트 구조

프로젝트 - confing

                  domain - api, dto, entity, repository, service

                  util

# EndPoint

pathvariable → 카멜 → /user/{userId}

endpoint는 → 케밥 → /system-orders

# **함수**

**Controller, Service**

- 생성관련 ex) createMember
- 조회관련 ex) getAllMember
- 상세조회관련 ex) getDetailMember
- 삭제관련 ex) deleteMember
- 수정관련 ex) updateMember

```java
@PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequestDto userLoginRequestDto) {
        return new ResponseEntity<>(userService.login(userLoginRequestDto), HttpStatus.OK);
    }
```

**Optional 통일**

# **Dto**

ex) memberDetailReqDto, memberAllResDto

#
