package com.mm.greenstep.domain.compete.repository;

import com.mm.greenstep.domain.compete.entity.Victory;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Optional;

public interface VictoryRepository extends JpaRepository<Victory, Integer> {

    @Query("SELECT v FROM Victory v WHERE YEAR(v.victoryMonth) = :year AND MONTH(v.victoryMonth) = :month")
    Optional<Victory> findByYearAndMonth(@Param("year") int year, @Param("month") int month);



}
