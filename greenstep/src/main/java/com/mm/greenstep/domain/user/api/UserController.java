package com.mm.greenstep.domain.user.api;

import com.mm.greenstep.domain.common.lib.Helper;
import com.mm.greenstep.domain.common.util.SecurityUtil;
import com.mm.greenstep.domain.user.dto.request.UserReqDto;
import com.mm.greenstep.domain.user.dto.response.Response;
import com.mm.greenstep.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/user")
@RestController
public class UserController {

    private final UserService userService;
    private final Response response;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@Validated @RequestBody UserReqDto.SignUp signUp, Errors errors) {
        // validation check
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return userService.signUp(signUp);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Validated @RequestBody UserReqDto.Login login, Errors errors) {

        // validation check
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return userService.login(login);
    }

    // 토큰 재발급
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@Validated @RequestBody UserReqDto.Reissue reissue, Errors errors) {
        // validation check
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return userService.reissue(reissue);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@Validated @RequestBody UserReqDto.Logout logout, Errors errors) {
        // validation check
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return userService.logout(logout);
    }

    @GetMapping("/authority")
    public ResponseEntity<?> authority() {
        log.info("ADD ROLE_ADMIN");
        return userService.authority();
    }

    @GetMapping("/userTest")
    public ResponseEntity<?> userTest() {
        log.info("ROLE_USER TEST");
        System.out.println(SecurityUtil.getCurrentUserName());
        return response.success();
    }

    @GetMapping("/adminTest")
    public ResponseEntity<?> adminTest() {
        log.info("ROLE_ADMIN TEST");
        return response.success();
    }

    @GetMapping("/idTest")
    public ResponseEntity<?> idTest() {
        log.info("id TEST");
        System.out.println(SecurityUtil.getCurrentUserName());
        System.out.println(SecurityUtil.getCurrentUserId());
        System.out.println(SecurityUtil.getCurrentUser());
        return response.success();
    }
}
