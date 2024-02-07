package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.Bucket;
import com.ggums.ggumtle.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BucketRepository extends JpaRepository<Bucket, Long> {
    Page<Bucket> findByTitleContainingAndIsPrivateIsFalse(String title, Pageable pageable);

    List<Bucket> findByUser(User user);

    List<Bucket> findByIdIn(List<Long> ids);

    List<Bucket> findByUserIdIn(List<Long> userIds);

    // to use mysql's rand()
    @Query(value = "SELECT DISTINCT b.id\n" +
            "FROM bucket b \n" +
            "JOIN bucket_interest bi ON b.id = bi.bucket_id \n" +
            "JOIN interest i ON bi.interest_id = i.id \n" +
            "WHERE i.name IN :categories\n" +
            "AND b.is_private = false\n" +
            "GROUP BY b.id\n" +
            "ORDER BY rand()\n" +
            "LIMIT 12;", nativeQuery = true)
    List<Long> getTotal(List<String> categories);

    @Modifying
    @Query("delete from Bucket b where b.user = :user")
    void deleteAllByUser(@Param("user") User user);

    @EntityGraph(attributePaths = {"user"})
    @Query(value = "SELECT b FROM Bucket b")
    List<Bucket> findAllWithUser();
}
