package com.mm.greenstep.domain.plogging.repository;

import com.mm.greenstep.domain.plogging.entity.Coordinate;
import com.mm.greenstep.domain.plogging.entity.Plogging;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoordinateRepository extends JpaRepository<Coordinate, Long> {

    List<Coordinate> findAllByPlogging(Plogging plogging);
}
