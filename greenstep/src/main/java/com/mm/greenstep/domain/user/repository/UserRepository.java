package com.mm.greenstep.domain.user.repository;

import com.mm.greenstep.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserId(Long user_pk);
}
