package com.mm.greenstep.domain.board.api;

import com.mm.greenstep.domain.board.dto.request.BoardReqDto;
import com.mm.greenstep.domain.board.dto.response.BoardResDto;
import com.mm.greenstep.domain.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

private final BoardService boardService;

    @GetMapping("/")
    public ResponseEntity<List<BoardResDto>> getAllBoards() {
        List<BoardResDto> allBoards = boardService.getAllBoards();
        return ResponseEntity.ok(allBoards);
    }

    // 특정 사용자 ID에 해당하는 게시판을 조회하는 API
    @GetMapping("/myList")
    public ResponseEntity<List<BoardResDto>> getAllMyBoards() {
        List<BoardResDto> userBoards = boardService.getAllMyBoards();
        return new ResponseEntity<>(userBoards, HttpStatus.OK);
    }

    //게시글 작성
    @PostMapping("/create")
    public ResponseEntity<?> createBoard(@RequestBody BoardReqDto dto){
        BoardResDto responseDto = boardService.createBoard(dto);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // 대경, 수정, 삭제
    // 게시글 상세 조회
    @GetMapping("/detail/{boardId}")
    public ResponseEntity<?> detailBoard(
            @PathVariable(value = "boardId", required = false) Long boardId
            ){
        BoardResDto detailBoard = boardService.getBoardDetail(boardId);
        return new ResponseEntity<>(detailBoard, HttpStatus.OK);
    }

    // 게시글 삭제
    @PatchMapping("/{boardId}")
    public ResponseEntity<?> deleteBoard(
            @PathVariable Long boardId
    ){
        Boolean Yn = boardService.deleteBoard(boardId);
        if (Yn == true) {
            return new ResponseEntity<>("삭제 성공", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("삭제 실패", HttpStatus.BAD_REQUEST);
        }

    }


    @GetMapping("/attend/list")
    public ResponseEntity<?> getAllAttendList(){
        return boardService.getAllBoardList();
    }


    @GetMapping("/search/{word}")
    public ResponseEntity<?>  findAllBoardByLocation(@PathVariable String word){
        System.out.println(word);
        return boardService.getAllBoardByfindLocation(word);
    }

}