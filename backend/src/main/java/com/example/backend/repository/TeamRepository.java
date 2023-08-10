package com.example.backend.repository;

import com.example.backend.model.Team;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    @Query("FROM Team t JOIN Player p ON t.id = p.team.id WHERE p.id = :playerId "
            + "AND t.deleted = false AND p.isDeleted = false")
    Optional<Team> findTeamByPlayer(@Param(value = "playerId") Long playerId);

    List<Team> findTeamsByNameContainsIgnoreCase(String name);
}
