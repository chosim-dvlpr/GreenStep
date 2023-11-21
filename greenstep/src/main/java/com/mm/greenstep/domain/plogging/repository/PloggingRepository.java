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


//    @Query(value = "SELECT * FROM plogging WHERE is_visibled = true ORDER BY RAND() LIMIT :count", nativeQuery = true)
//    List<Plogging> findRandomVisiblePloggingRecords(@Param("count") int count);

    @Query(value = "SELECT * FROM plogging WHERE is_visibled = true AND travel_picture IS NOT NULL ORDER BY RAND() LIMIT :count", nativeQuery = true)
    List<Plogging> findRandomVisiblePloggingRecordsExcludeNullImageUrl(@Param("count") int count);


    @Query("SELECT p FROM Plogging p WHERE FUNCTION('YEAR', p.createdAt) = :year AND p.user = :user")
    List<Plogging> findByUserAndYear(@Param("user") User user, @Param("year") int year);
}
