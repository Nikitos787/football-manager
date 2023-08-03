package com.example.backend.service.impl;

import com.example.backend.model.Team;
import com.example.backend.repository.TeamRepository;
import com.example.backend.service.PlayerService;
import com.example.backend.service.TeamService;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;
    private final PlayerService playerService;

    @Override
    public Team save(Team team) {
        return teamRepository.save(team);
    }

    @Override
    public Team findById(Long id) {
        return teamRepository.findById(id).orElseThrow(() ->
                new NoSuchElementException(String.format("Can't find team by id: %s in DB", id)));
    }

    @Override
    public List<Team> findAll() {
        return teamRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        playerService.fireAllByTeam(findById(id));
        teamRepository.deleteById(id);
    }

    @Override
    public Team update(Long id, Team team) {
        Team teamById = findById(id);
        teamById.setName(team.getName());
        teamById.setCity(team.getCity());
        teamById.setCountry(team.getCountry());
        teamById.setBudget(team.getBudget());
        teamById.setTeamLevel(team.getTeamLevel());
        return save(teamById);
    }
}
