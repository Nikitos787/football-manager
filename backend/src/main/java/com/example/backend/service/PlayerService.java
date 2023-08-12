package com.example.backend.service;

import com.example.backend.model.Player;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PlayerService {
    Player save(Player player);

    Player findById(Long id);

    Page<Player> findAll(Pageable pageable);

    Player updatePlayerInfo(Long id, Player player);

    void firePlayerFromTeam(Long playerId);

    void changeTeamForTransfer(Long id, Long teamId);

    void fireAllByTeam(Long teamId);

    void delete(Long id);

    List<Player> findAllByTeam(Long teamId);

    void hirePlayerToTeam(Long playerId, Long teamId);

    List<Player> search(String name);
}
