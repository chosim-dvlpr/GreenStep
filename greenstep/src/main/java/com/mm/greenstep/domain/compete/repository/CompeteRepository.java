package com.mm.greenstep.domain.compete.repository;

import com.mm.greenstep.domain.compete.entity.Compete;
import com.mm.greenstep.domain.compete.entity.Victory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompeteRepository extends JpaRepository<Compete, Long> {

    List<Compete> findAllByVictory(Victory currentVictory);

}
