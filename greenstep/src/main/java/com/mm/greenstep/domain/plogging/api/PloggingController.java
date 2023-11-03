package com.mm.greenstep.domain.plogging.api;

import com.mm.greenstep.domain.plogging.dto.request.PloggingReqDto;
import com.mm.greenstep.domain.plogging.dto.response.PloggingAllResDto;
import com.mm.greenstep.domain.plogging.dto.response.PloggingDetailResDto;
import com.mm.greenstep.domain.plogging.dto.response.PloggingResDto;
import com.mm.greenstep.domain.plogging.service.PloggingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/plogging")
@RequiredArgsConstructor
public class PloggingController {

    private final PloggingService ploggingService;

    // 플로깅 종료
    @PostMapping("/end")
    public ResponseEntity<?> createPlogging(HttpServletRequest request, PloggingReqDto dto) {
        PloggingResDto responseDto = ploggingService.createPlogging(request, dto);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // 플로깅 사진 등록
    @PostMapping("/{ploggingId}/upload/img")
    public ResponseEntity<?> updatePloggingImg(
            @RequestPart(value = "file", required = false) MultipartFile file,
            @PathVariable(value = "projectId", required = false) Long ploggingId
    ) {
        ploggingService.updatePloggingImg(file, ploggingId);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    // 내 플로깅 전체 조회
    @GetMapping
    public ResponseEntity<?> getAllPlogging(HttpServletRequest request) {
        List<PloggingAllResDto> dtoList = ploggingService.getAllPlogging(request);
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    //  플로깅 상세 조회
    @GetMapping("/{ploggingId}/detail")
    public ResponseEntity<?> getDetailPlogging(@PathVariable Long ploggingId) {
        PloggingDetailResDto dto = ploggingService.getDetailPlogging(ploggingId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
