//package com.mm.greenstep.domain.user.repository;
//
//import org.springframework.data.jpa.repository.Query;
//
//
//public interface UserRepository extends JpaRepository<User, Long> {
//
//    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN TRUE ELSE FALSE END FROM User u WHERE u.userCellNo = ?1 AND u.userName = ?2 AND u.userDeleteDate IS NULL")
//    boolean existsByUserCellNoAndUserName(String userCellNo, String userName);
//
//    Optional<User> findByUserCellNo(String userCellNo);
//
//    boolean existsByUserCellNo(String userCellNo);
//
//    List<User> findAllByUserName(String userName);
//}
