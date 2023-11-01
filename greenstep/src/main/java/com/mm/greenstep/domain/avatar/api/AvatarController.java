package com.mm.greenstep.domain.avatar.api;

import com.mm.greenstep.domain.avatar.dto.response.AvatarAllResponseDto;
import com.mm.greenstep.domain.avatar.service.AvatarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/avatar")
@RequiredArgsConstructor
public class AvatarController {

    private final AvatarService myPageService;

    // 아바타 선택
    @PatchMapping("/{boxId}")
    public ResponseEntity<?> updateMyAvatar(HttpServletRequest request, @PathVariable Long boxId) {
        myPageService.updateAvatar(request, boxId);
        return new ResponseEntity<>(boxId, HttpStatus.OK);
    }

    // 아바타 전체 조회
    @GetMapping
    public ResponseEntity<?> getAllMyAvatar(HttpServletRequest request) {
        List<AvatarAllResponseDto> dtoList = myPageService.getAllMyAvatar(request);
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }
}
