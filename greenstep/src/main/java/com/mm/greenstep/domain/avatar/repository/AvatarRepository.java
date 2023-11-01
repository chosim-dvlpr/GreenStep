package com.mm.greenstep.domain.avatar.repository;

import com.mm.greenstep.domain.avatar.entity.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvatarRepository extends JpaRepository<Avatar, Long> {

    Avatar findByBoxId(Long boxId);
}
