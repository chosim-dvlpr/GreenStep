package com.mm.greenstep.domain.achieve.repository;

import com.mm.greenstep.domain.achieve.entity.Achieve;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AchieveRepository extends JpaRepository<Achieve, Long> {

    List<Achieve> findAllByAchieveType(Byte achieveType);
}
