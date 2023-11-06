package com.mm.greenstep.domain.plogging.repository;

import com.mm.greenstep.domain.plogging.entity.Plogging;
import com.mm.greenstep.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PloggingRepository extends JpaRepository<Plogging, Long> {

    Plogging findByPloggingId(Long ploggingId);

    List<Plogging> findAllByUser(User user);

    // 데이터베이스에서 랜덤으로 pageable개의 Plogging 레코드를 가져온 후 랜덤한 순서로 정렬하고 LIMIT를 사용하여 결과를 제한
    @Query(value = "SELECT * FROM Plogging WHERE is_visibled = true ORDER BY RAND() LIMIT :count", nativeQuery = true)
    List<Plogging> findRandomVisiblePloggingRecords(@Param("count") int count);


    @Query("SELECT p FROM Plogging p WHERE FUNCTION('YEAR', p.createdAt) = :year AND p.user = :user")
    List<Plogging> findByUserAndYear(@Param("user") User user, @Param("year") int year);
}
