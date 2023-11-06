package com.mm.greenstep.domain.mypage.api;

import com.mm.greenstep.domain.mypage.dto.response.MyPageAllPloggingResDto;
import com.mm.greenstep.domain.mypage.dto.response.MyPageDetailHeaderResDto;
import com.mm.greenstep.domain.mypage.dto.response.MyPageDetailStreakResDto;
import com.mm.greenstep.domain.mypage.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;

    // 마이페이지 헤더 조회 (nickname, level, exp)
    @GetMapping
    public ResponseEntity<?> getDetailUserHeader(HttpServletRequest request) {
        MyPageDetailHeaderResDto dto = myPageService.getDetailUserHeader(request);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    // 플로깅 내역 조회
    @GetMapping("/my-plogging")
    public ResponseEntity<?> getAllUserPlogging(HttpServletRequest request) {
        MyPageAllPloggingResDto dto = myPageService.getAllUserPlogging(request);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    // 스트릭 조회
    @GetMapping("/{year}/streak")
    public ResponseEntity<?> getDetailStreak(HttpServletRequest request, @PathVariable Integer year) {
        Map<Integer, Integer> map = myPageService.getDetailStreak(request, year);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
