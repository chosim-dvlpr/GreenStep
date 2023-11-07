package com.mm.greenstep.domain.avatar.repository;

import com.mm.greenstep.domain.avatar.entity.UserAvatar;
import com.mm.greenstep.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAvatarRepository extends JpaRepository<UserAvatar, Long> {
    UserAvatar findByUser(User user);

    List<UserAvatar> findAllByUser(User user);

    UserAvatar findByUserAndAvatarId(User user, Long avatarId);

    UserAvatar findByUserAndIsSelected(User user, boolean b);
}
