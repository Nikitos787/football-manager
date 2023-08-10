package com.example.backend.repository;

import com.example.backend.model.Player;
import com.example.backend.model.Team;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByTeam(Team team);

    List<Player> findAllBySecondNameContainsIgnoreCase(String name);
}
