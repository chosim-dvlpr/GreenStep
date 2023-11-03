package com.mm.greenstep.domain.achieve.api;

import com.mm.greenstep.domain.achieve.dto.response.AchieveDetailResDto;
import com.mm.greenstep.domain.achieve.service.AchieveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/achieve")
@RequiredArgsConstructor
public class AchieveController {

    private final AchieveService achieveService;

    // 업적 조회
    @GetMapping("/{achieveType}")
    public ResponseEntity<?> getDetailAchieve(HttpServletRequest request, @PathVariable Byte achieveType) {
        List<AchieveDetailResDto> dtoList = achieveService.getDetailAchieve(request, achieveType);
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }
}
