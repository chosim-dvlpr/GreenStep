package com.mm.greenstep.domain.plogging.repository;

import com.mm.greenstep.domain.plogging.entity.Plogging;
import com.mm.greenstep.domain.plogging.entity.Trash;
import com.mm.greenstep.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrashRepository extends JpaRepository<Trash, Long> {

}
