package com.mm.greenstep.domain.board.repository;

import com.mm.greenstep.domain.board.entity.Board;
import com.mm.greenstep.domain.board.entity.Attend;
import com.mm.greenstep.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendRepository extends JpaRepository<Attend, Long> {

    List<Attend> findAllByBoard(Board board);

    Attend findByUserAndBoard(User currentUser, Board board);

    List<Attend> findAllByUser(User currentUser);
}
