package com.mm.greenstep.domain.avatar.repository;

import com.mm.greenstep.domain.avatar.entity.Avatar;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AvatarRepository extends JpaRepository<Avatar, Long> {

    Avatar findByBoxId(Long boxId);

    @Query("SELECT a FROM Avatar a ORDER BY RAND()")
    List<Avatar> findAllOrderByRandom(Pageable pageable);

    default Avatar findRandomAvatar() {
        List<Avatar> avatars = findAllOrderByRandom(PageRequest.of(0, 1));
        if (!avatars.isEmpty()) {
            return avatars.get(0);
        }
        return null; // 또는 기본 아바타 반환
    }
}
