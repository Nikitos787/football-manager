package com.example.backend.service;

import com.example.backend.model.Player;
import com.example.backend.model.Team;
import java.util.List;

public interface PlayerService {
    Player save(Player player);

    Player findById(Long id);

    List<Player> findAll();

    Player update(Long id, Player player);

    void fire(Long playerId, Team team);

    void changeTeamForTransfer(Long id, Team team);

    void fireAllByTeam(Team team);

    void delete(Long id);

    List<Player> findAllByTeam(Team team);

    void hire(Long playerId, Team team);
}
