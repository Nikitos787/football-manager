package com.example.backend.service.impl;

import com.example.backend.model.Team;
import com.example.backend.repository.TeamRepository;
import com.example.backend.service.PlayerService;
import com.example.backend.service.TeamService;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<Team> findAll(Pageable pageable) {
        return teamRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
        playerService.fireAllByTeam(findById(id));
        teamRepository.deleteById(id);
    }

    @Override
    public List<Team> search(String name) {
        return teamRepository.findTeamsByNameContainsIgnoreCase(name);
    }

    @Override
    public Team update(Long id, Team team) {
        Team teamById = findById(id);
        teamById.setName(team.getName());
        teamById.setCity(team.getCity());
        teamById.setCountry(team.getCountry());
        teamById.setBudget(team.getBudget());
        teamById.setCommission(team.getCommission());
        return save(teamById);
    }
}
