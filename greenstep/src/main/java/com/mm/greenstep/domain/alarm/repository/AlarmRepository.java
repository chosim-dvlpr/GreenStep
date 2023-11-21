package com.mm.greenstep.domain.alarm.repository;

import com.mm.greenstep.domain.alarm.entity.Alarm;
import com.mm.greenstep.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {

    List<Alarm> findAllByUserAndIsConfirmFalse(User user);
}
