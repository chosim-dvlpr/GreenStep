package com.mm.greenstep.domain.board.service;

import com.mm.greenstep.domain.avatar.repository.UserAvatarRepository;
import com.mm.greenstep.domain.board.dto.response.AttendResDto;
import com.mm.greenstep.domain.board.entity.Board;
import com.mm.greenstep.domain.board.entity.Attend;
import com.mm.greenstep.domain.board.repository.BoardRepository;
import com.mm.greenstep.domain.board.repository.AttendRepository;
import com.mm.greenstep.domain.common.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AttendService {
    private final AttendRepository attendRepository;
    private final BoardRepository boardRepository;
    private final UserAvatarRepository userAvatarRepository;

    @Transactional
    public ResponseEntity<?> createAttend(Long boardId){
        Board board = boardRepository.findByBoardId(boardId);
        List<Attend> attendList = attendRepository.findAllByBoard(board);

        if(attendList.size() < board.getMaxParticipants()){
            Attend attend = Attend.builder()
                            .user(SecurityUtil.getCurrentUser())
                            .board(board)
                            .build();
            attendRepository.save(attend);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }else{
            log.error("최대 인원 끝남");
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }


    @Transactional
    public ResponseEntity<?> deleteAttend(Long boardId){
        Board board = boardRepository.findByBoardId(boardId);
        Attend attend = attendRepository.findByUserAndBoard(SecurityUtil.getCurrentUser(), board);

        if(attend != null){
            attendRepository.delete(attend);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }


    public ResponseEntity<?> getAllAttend(Long boardId){
        Board board = boardRepository.findByBoardId(boardId);
        List<Attend> attendList = attendRepository.findAllByBoard(board);
        System.out.println(attendList.size());
        List<AttendResDto> result = new ArrayList<>();
        if(!attendList.isEmpty()){
            for(Attend attend : attendList){
                AttendResDto attendResDto = AttendResDto.builder()
                        .nickname(attend.getUser().getNickName())
                        .userId(attend.getUser().getUserId())
                        .avatarImg(userAvatarRepository.findByUserAndIsSelected(attend.getUser(), true).getAvatar().getAvatarImg())
                        .build();
                result.add(attendResDto);
            }
            return new ResponseEntity<>(result,HttpStatus.OK);
        } else {
            return new ResponseEntity<>(result,HttpStatus.BAD_REQUEST);
        }
    }
}
