package com.example.backend.repository;

import com.example.backend.model.Player;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    @Query("FROM Player p LEFT JOIN FETCH p.team WHERE p.team.id = :teamId")
    List<Player> findByTeam(@Param("teamId") Long teamId);

    @Query("FROM Player p LEFT JOIN FETCH p.team "
            + "WHERE UPPER(p.secondName) LIKE UPPER(CONCAT('%', :name, '%'))")
    List<Player> findAllBySecondName(@Param("name") String name);

    @Query("FROM Player p LEFT JOIN FETCH p.team WHERE p.id =:id")
    Optional<Player> findByIdWithTeam(@Param("id") Long id);

    @Query("FROM Player p LEFT JOIN FETCH p.team")
    Page<Player> findAllWithTeams(Pageable pageable);
}
