package com.mm.greenstep.domain.board.repository;

import com.mm.greenstep.domain.board.entity.Board;
import com.mm.greenstep.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface BoardRepository extends JpaRepository<Board, Long> {

    //UserId로 게시글 조회
    List<Board> findAllByUser(User user);
    //모든 게시글 조회
    List<Board> findAll();

    Board findByBoardId(Long boardId);

    List<Board> findAllByUserAndIsDeletedFalse(User user);


    List<Board> findAllByIsDeletedFalse();
}