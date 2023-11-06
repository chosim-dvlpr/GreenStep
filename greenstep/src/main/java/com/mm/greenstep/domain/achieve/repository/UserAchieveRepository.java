package com.mm.greenstep.domain.achieve.repository;

import com.mm.greenstep.domain.achieve.entity.UserAchieve;
import com.mm.greenstep.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAchieveRepository extends JpaRepository<UserAchieve, Long> {
    List<UserAchieve> findAllByUserAndIsBreakedFalse(User user);
    List<UserAchieve> findAllByUserAndAchieve_AchieveType(User user, Byte achieveType);

    List<UserAchieve> findAllByUserAndIsBreakedTrue(User user);
}
