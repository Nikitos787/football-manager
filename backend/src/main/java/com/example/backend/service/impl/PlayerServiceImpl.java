package com.example.backend.service.impl;

import com.example.backend.exception.PlayerStatusException;
import com.example.backend.model.Player;
import com.example.backend.model.Team;
import com.example.backend.repository.PlayerRepository;
import com.example.backend.service.PlayerService;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlayerServiceImpl implements PlayerService {
    private final PlayerRepository playerRepository;

    @Override
    public Player save(Player player) {
        player.setDateOfBeginningCareer(LocalDate.now());
        return playerRepository.save(player);
    }

    @Override
    public Player findById(Long id) {
        return playerRepository.findById(id).orElseThrow(() ->
                new PlayerStatusException(String.format("Can't find player by id: %s in DB", id)));
    }

    @Override
    public Page<Player> findAll(Pageable pageable) {
        return playerRepository.findAll(pageable);
    }

    @Override
    public List<Player> findAllByTeam(Team team) {
        return playerRepository.findByTeam(team);
    }

    @Override
    public Player updatePlayerInfo(Long id, Player player) {
        Player playerById = findById(id);
        playerById.setBirthDate(player.getBirthDate());
        playerById.setCountry(player.getCountry());
        playerById.setCity(player.getCity());
        playerById.setPosition(player.getPosition());
        playerById.setFirstName(player.getFirstName());
        playerById.setSecondName(player.getSecondName());
        return playerRepository.save(playerById);
    }

    @Override
    public void hirePlayerToTeam(Long playerId, Team team) {
        Player player = findById(playerId);
        if (player.getStatus() == Player.Status.EMPLOYED) {
            throw new PlayerStatusException("Employed player cannot have opportunity"
                    + " to be hired by another team. Only UnEmployed player can be hired");
        }
        player.setTeam(team);
        player.setStatus(Player.Status.EMPLOYED);
        playerRepository.save(player);
    }

    @Override
    public List<Player> search(String name) {
        return playerRepository.findAllBySecondNameContainsIgnoreCase(name);
    }

    @Override
    public void firePlayerFromTeam(Long playerId) {
        Player player = findById(playerId);
        player.setTeam(null);
        player.setStatus(Player.Status.UNEMPLOYED);
        playerRepository.save(player);
    }

    @Override
    public void changeTeamForTransfer(Long id, Team team) {
        Player playerForTransfer = findById(id);
        playerForTransfer.setTeam(team);
        playerRepository.save(playerForTransfer);
    }

    @Override
    public void fireAllByTeam(Team team) {
        List<Player> players = findAllByTeam(team);
        players.forEach(player -> {
            firePlayerFromTeam(player.getId());
            player.setStatus(Player.Status.UNEMPLOYED);
            playerRepository.save(player);
        });
    }

    @Override
    public void delete(Long id) {
        playerRepository.deleteById(id);
    }
}
