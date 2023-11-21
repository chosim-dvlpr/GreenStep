package com.mm.greenstep.domain.plogging.api;

import com.mm.greenstep.domain.plogging.dto.request.PloggingReqDto;
import com.mm.greenstep.domain.plogging.dto.response.*;
import com.mm.greenstep.domain.plogging.service.PloggingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/plogging")
@RequiredArgsConstructor
public class PloggingController {

    private final PloggingService ploggingService;

    // 플로깅 종료
    @PostMapping("/end")
    public ResponseEntity<?> createPlogging(@RequestBody PloggingReqDto dto) {
        PloggingResDto responseDto = ploggingService.createPlogging(dto);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // 플로깅 사진 등록
    @PostMapping("/{ploggingId}/upload/img")
    public ResponseEntity<?> updatePloggingImg(
            @RequestPart(value = "file", required = false) MultipartFile file,
            @PathVariable(value = "ploggingId", required = false) Long ploggingId
    ) {
        ploggingService.updatePloggingImg(file, ploggingId);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    // 플로깅 사진 동의여부 설정
    @PatchMapping("/{ploggingId}/{isVisible}")
    public ResponseEntity<?> updateVisible(
            @PathVariable Boolean isVisible,
            @PathVariable Long ploggingId
    ) {
        ploggingService.updateVisible(isVisible, ploggingId);
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

    // 플로깅 AI 등록
    @PostMapping("/AI")
    public ResponseEntity<?> createAiImg(
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        log.info("input AIimage isEmpty : " + file.isEmpty());
        String type = ploggingService.createAiImg(file);
        return new ResponseEntity<>(type, HttpStatus.OK);
    }

    // 내 플로깅 전체 조회
    @GetMapping("/trashBox")
    public ResponseEntity<?> getAllTrashBox() {
        List<TrashBoxAllResDto> dtoList = ploggingService.getAllTrashBox();
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    // 데이터 지도
    @GetMapping("/map")
    public ResponseEntity<?> getAllTrashData() {
        List<TrashDataAllResDto> dtoList = ploggingService.getAllTrashData();
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    // 종료시 뿌려 줄 위치 데이터
    @GetMapping("/{ploggingId}/finishMap")
    public ResponseEntity<?> getAllCoordinate(@PathVariable Long ploggingId) {
        List<PloggingCoorResDto> dtoList = ploggingService.getAllCoordinate(ploggingId);
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    // 내 Avatar
    @GetMapping("/myAvatar")
    public ResponseEntity<?> getMyAvatar() {
        String myAvatarImg = ploggingService.getMyAvatar();
        if (myAvatarImg.equals("")) {
            return new ResponseEntity<>("선택된 아바타 없음", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(myAvatarImg, HttpStatus.OK);
    }
}
