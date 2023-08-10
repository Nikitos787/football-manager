package com.example.backend.service;

import com.example.backend.model.Player;
import com.example.backend.model.Team;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PlayerService {
    Player save(Player player);

    Player findById(Long id);

    Page<Player> findAll(Pageable pageable);

    Player updatePlayerInfo(Long id, Player player);

    void firePlayerFromTeam(Long playerId);

    void changeTeamForTransfer(Long id, Team team);

    void fireAllByTeam(Team team);

    void delete(Long id);

    List<Player> findAllByTeam(Team team);

    void hirePlayerToTeam(Long playerId, Team team);

    List<Player> search(String name);
}
