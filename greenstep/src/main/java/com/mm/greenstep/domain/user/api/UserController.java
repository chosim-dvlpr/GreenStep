package com.mm.greenstep.domain.user.api;

import com.mm.greenstep.domain.common.jwt.JwtToken;
import com.mm.greenstep.domain.user.dto.request.SignUpReqDto;
import com.mm.greenstep.domain.user.dto.request.LoginReqDto;
import com.mm.greenstep.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/test")
    public String testEndpoint() {
            return "Hello from the test endpoint!";
        }

    @PostMapping("/login")
    public ResponseEntity<?> loginSuccess(@RequestBody LoginReqDto loginReqDto) {
        JwtToken token = userService.login(loginReqDto);
        return ResponseEntity.ok(token);
    }

    @PostMapping("/signup")
    public Long signup(@RequestBody SignUpReqDto signUpReqDto) {
        return userService.signup(signUpReqDto);
    }

    @GetMapping("/signup/check/{userId}/exists")
    public ResponseEntity<?> checkEmailDuplicate(@PathVariable String kakaoId) {
        return ResponseEntity.ok(userService.checkkakaoIdExists(kakaoId));
    }
}
