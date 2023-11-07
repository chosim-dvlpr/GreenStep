package com.mm.greenstep.domain.avatar.api;

import com.mm.greenstep.domain.avatar.dto.response.AvatarAllResDto;
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
    public ResponseEntity<?> updateMyAvatar(@PathVariable Long boxId) {
        String response = myPageService.updateAvatar(boxId);
        if(response.equals("success")) return new ResponseEntity<>(response, HttpStatus.OK);
        else return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // 아바타 전체 조회
    @GetMapping
    public ResponseEntity<?> getAllMyAvatar() {
        List<AvatarAllResDto> dtoList = myPageService.getAllMyAvatar();
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

//    // 아바타 랜덤 뽑기
//    @GetMapping
//    public ResponseEntity<?> getAllMyAvatar() {
//        List<AvatarAllResDto> dtoList = myPageService.getAllMyAvatar();
//        return new ResponseEntity<>(dtoList, HttpStatus.OK);
//    }
}
