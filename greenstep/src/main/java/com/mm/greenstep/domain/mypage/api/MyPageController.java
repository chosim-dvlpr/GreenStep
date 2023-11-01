package com.mm.greenstep.domain.mypage.api;

import com.mm.greenstep.domain.mypage.dto.response.MyPageAllPloggingResponseDto;
import com.mm.greenstep.domain.mypage.dto.response.MyPageDetailHeaderResponseDto;
import com.mm.greenstep.domain.mypage.dto.response.MyPageDetailStreakResponseDto;
import com.mm.greenstep.domain.mypage.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/my-page")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;

    // 마이페이지 헤더 조회 (nickname, level, exp)
    @GetMapping
    public ResponseEntity<?> getDetailUserHeader(HttpServletRequest request) {
        MyPageDetailHeaderResponseDto dto = myPageService.getDetailUserHeader(request);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    // 플로깅 내역 조회
    @GetMapping("/my-plogging")
    public ResponseEntity<?> getAllUserPlogging(HttpServletRequest request) {
        MyPageAllPloggingResponseDto dto = myPageService.getAllUserPlogging(request);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    // 스트릭 조회
    @GetMapping("/{year}/streak")
    public ResponseEntity<?> getDetailStreak(HttpServletRequest request, @PathVariable Integer year) {
        List<MyPageDetailStreakResponseDto> dtoList = myPageService.getDetailStreak(request, year);
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }
}
