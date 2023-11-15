package com.mm.greenstep.domain.plogging.repository;

import com.mm.greenstep.domain.plogging.entity.Festival;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FestivalRepository extends JpaRepository<Festival, Long> {
    Optional<Festival> findByFestivalNameAndFestivalUrl(String linkText, String linkHref);
}
