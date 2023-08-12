package com.example.backend.service.impl;

import com.example.backend.exception.PlayerStatusException;
import com.example.backend.model.Player;
import com.example.backend.model.Team;
import com.example.backend.repository.PlayerRepository;
import com.example.backend.service.PlayerService;
import com.example.backend.service.TeamService;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PlayerServiceImpl implements PlayerService {
    private final PlayerRepository playerRepository;
    private final TeamService teamService;

    @Override
    public Player save(Player player) {
        player.setDateOfBeginningCareer(LocalDate.now());
        return playerRepository.save(player);
    }

    @Override
    public Player findById(Long id) {
        return playerRepository.findByIdWithTeam(id).orElseThrow(() ->
                new PlayerStatusException(String.format("Can't find player by id: %s in DB", id)));
    }

    @Override
    public Page<Player> findAll(Pageable pageable) {
        return playerRepository.findAllWithTeams(pageable);
    }

    @Override
    public List<Player> findAllByTeam(Long teamId) {
        return playerRepository.findByTeam(teamId);
    }

    @Transactional
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
    public void hirePlayerToTeam(Long playerId, Long teamId) {
        Player player = findById(playerId);
        if (player.getStatus() == Player.Status.EMPLOYED) {
            throw new PlayerStatusException("Employed player cannot have opportunity"
                    + " to be hired by another team. Only UnEmployed player can be hired");
        }
        Team team = teamService.findById(teamId);
        player.setTeam(team);
        player.setStatus(Player.Status.EMPLOYED);
        playerRepository.save(player);
    }

    @Override
    public List<Player> search(String name) {
        return playerRepository.findAllBySecondName(name);
    }

    @Override
    public void firePlayerFromTeam(Long playerId) {
        Player player = findById(playerId);
        player.setTeam(null);
        player.setStatus(Player.Status.UNEMPLOYED);
        playerRepository.save(player);
    }

    @Override
    public void changeTeamForTransfer(Long id, Long teamId) {
        Player playerForTransfer = findById(id);
        Team team = teamService.findById(teamId);
        playerForTransfer.setTeam(team);
        playerRepository.save(playerForTransfer);
    }

    @Override
    public void fireAllByTeam(Long teamId) {
        List<Player> players = findAllByTeam(teamId);
        players.forEach(player -> firePlayerFromTeam(player.getId()));
    }

    @Override
    public void delete(Long id) {
        playerRepository.deleteById(id);
    }
}
