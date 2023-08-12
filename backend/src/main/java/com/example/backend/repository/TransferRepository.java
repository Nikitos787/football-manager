package com.example.backend.repository;

import com.example.backend.model.Transfer;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {
    @Query("FROM Transfer t LEFT JOIN FETCH t.player "
            + "LEFT JOIN FETCH t.sellingTeam "
            + "LEFT JOIN FETCH t.buyingTeam "
            + "WHERE t.id = :id")
    Optional<Transfer> findById(@Param("id") Long id);

    @Query("FROM Transfer t LEFT JOIN FETCH t.player "
            + "LEFT JOIN FETCH t.sellingTeam "
            + "LEFT JOIN FETCH t.buyingTeam ")
    Page<Transfer> findAll(Pageable pageable);
}
