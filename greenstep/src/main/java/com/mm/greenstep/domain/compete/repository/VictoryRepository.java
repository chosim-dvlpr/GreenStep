package com.mm.greenstep.domain.compete.repository;

import com.mm.greenstep.domain.compete.entity.Victory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Optional;

public interface VictoryRepository extends JpaRepository<Victory, Integer> {

    Optional<Victory> findByVictoryMonth(LocalDate victoryMonth);


}
