package com.mm.greenstep.domain.plogging.api;

import com.mm.greenstep.domain.plogging.dto.response.PloggingAllImgResDto;
import com.mm.greenstep.domain.plogging.dto.response.PloggingAllLogResDto;
import com.mm.greenstep.domain.plogging.dto.response.PloggingAllResDto;
import com.mm.greenstep.domain.plogging.service.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/main")
@RequiredArgsConstructor
public class MainController {
    private final MainService mainService;

    // 모든사람들의 플로깅 기록
    @GetMapping
    public ResponseEntity<?> getAllPloggingLog() {
        PloggingAllLogResDto dto = mainService.getAllPloggingLog();
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    // 플로깅 이미지 조회(피드)
    @GetMapping("/picture")
    public ResponseEntity<?> getAllPloggingImg() {
        List<PloggingAllImgResDto> ploggingImgList = mainService.getAllPloggingImg();
        return new ResponseEntity<>(ploggingImgList, HttpStatus.OK);
    }
}
