package com.mm.greenstep.domain.plogging.repository;

import com.mm.greenstep.domain.plogging.entity.Trash;
import com.mm.greenstep.domain.plogging.entity.TrashBox;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrashBoxRepository extends JpaRepository<TrashBox, Long> {

}
