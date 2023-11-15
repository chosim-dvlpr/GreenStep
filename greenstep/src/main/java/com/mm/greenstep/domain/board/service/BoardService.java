package com.mm.greenstep.domain.board.service;

import com.mm.greenstep.domain.avatar.entity.UserAvatar;
import com.mm.greenstep.domain.avatar.repository.UserAvatarRepository;
import com.mm.greenstep.domain.board.dto.request.BoardReqDto;
import com.mm.greenstep.domain.board.dto.response.BoardResDto;
import com.mm.greenstep.domain.board.entity.Attend;
import com.mm.greenstep.domain.board.entity.Board;
import com.mm.greenstep.domain.board.repository.AttendRepository;
import com.mm.greenstep.domain.board.repository.BoardRepository;
import com.mm.greenstep.domain.common.util.SecurityUtil;
import com.mm.greenstep.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final AttendRepository attendRepository;
    private final UserAvatarRepository userAvatarRepository;

    @Transactional(readOnly = true)
    public List<BoardResDto> getAllBoards() {
        List<Board> boards = boardRepository.findAllByIsDeletedFalse();
        return boards.stream()
                .map(this::convertToBoardResDto)
                .collect(Collectors.toList());
    }


    private BoardResDto convertToBoardResDto(Board board) {
        Attend attend = attendRepository.findByUserAndBoard(SecurityUtil.getCurrentUser(), board);
        UserAvatar userAvatar = userAvatarRepository.findByUserAndIsSelected(board.getUser(), true);

        return BoardResDto.builder()
                .boardId(board.getBoardId())
                .nickname(board.getUser().getNickName()) // 사용자 닉네임 설정
                .boardTitle(board.getBoardTitle())
                .boardContent(board.getBoardContent())
                .scheduleTime(board.getScheduleTime().toString()) // LocalDateTime을 String으로 변환
                .scheduleLocation(board.getScheduleLocation())
                .maxParticipants(board.getMaxParticipants())
                .createdAt(board.getCreatedAt())
                .isAttended(attend != null)
                .avatarImg(userAvatar.getAvatar().getAvatarImg())
                .build();
    }

    @Transactional(readOnly = true)
    public List<BoardResDto> getAllMyBoards() {
        User user= SecurityUtil.getCurrentUser();
        UserAvatar userAvatar = userAvatarRepository.findByUserAndIsSelected(user, true);

        List<Board> userBoardList = boardRepository.findAllByUserAndIsDeletedFalse(user);
        List<BoardResDto> list = new ArrayList<>();
        for(Board board : userBoardList){
            Attend attend = attendRepository.findByUserAndBoard(user,board);
            BoardResDto dto = BoardResDto.builder()
                    .nickname(board.getUser().getNickName()) // 사용자 닉네임 설정
                    .boardId(board.getBoardId())
                    .boardTitle(board.getBoardTitle())
                    .boardContent(board.getBoardContent())
                    .scheduleTime(board.getScheduleTime().toString()) // LocalDateTime을 String으로 변환
                    .scheduleLocation(board.getScheduleLocation())
                    .maxParticipants(board.getMaxParticipants())
                    .createdAt(board.getCreatedAt())
                    .isAttended(attend != null)
                    .avatarImg(userAvatar.getAvatar().getAvatarImg())
                    .build();
            list.add(dto);
        }
        return list;
    }
    public BoardResDto getBoardDetail(Long boardId){
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new EntityNotFoundException("Board not found with id: " + boardId));

        UserAvatar userAvatar = userAvatarRepository.findByUserAndIsSelected(board.getUser(), true);

        Attend attend = attendRepository.findByUserAndBoard(SecurityUtil.getCurrentUser(), board);

            BoardResDto dto = BoardResDto.builder()
                    .nickname(board.getUser().getNickName()) // 사용자 닉네임 설정
                    .boardTitle(board.getBoardTitle())
                    .boardId(board.getBoardId())
                    .boardContent(board.getBoardContent())
                    .scheduleTime(board.getScheduleTime().toString())
                    .scheduleLocation(board.getScheduleLocation())
                    .maxParticipants(board.getMaxParticipants())
                    .createdAt(board.getCreatedAt())
                    .isAttended(attend != null)
                    .avatarImg(userAvatar.getAvatar().getAvatarImg())
                    .build();
        return dto;
    }

    public BoardResDto createBoard(BoardReqDto dto) {
        User user = SecurityUtil.getCurrentUser();
        //현재시간을 한국시간으로 설정
        LocalDateTime createTime = LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        Board board = Board.builder()
                .createdAt(createTime)
                .user(user)
                .boardTitle(dto.getBoardTitle())
                .boardContent(dto.getBoardContent())
                .scheduleLocation(dto.getScheduleLocation())
                .scheduleTime(dto.getScheduleTime())
                .maxParticipants(dto.getMaxParticipants())
                .build();

        board = boardRepository.save(board);
        return convertToBoardResDto(board);
    }

    public Boolean deleteBoard(Long boardId) {
        Board board = boardRepository.findByBoardId(boardId);
        User user = SecurityUtil.getCurrentUser();

        if (board.getUser().getUserId() == user.getUserId()) {
            board.deleteState();
            boardRepository.save(board);
            return true;
        } else {
            return false;
        }
    }

    public ResponseEntity<?> getAllBoardList(){
        List<Attend> attendList = attendRepository.findAllByUser(SecurityUtil.getCurrentUser());
        List<Board> boardList = new ArrayList<>();

        for(Attend attend : attendList){
            boardList.add(attend.getBoard());
        }

        return new ResponseEntity<>(boardList.stream()
                .map(this::convertToBoardResDto)
                .collect(Collectors.toList()), HttpStatus.OK) ;
    }
}