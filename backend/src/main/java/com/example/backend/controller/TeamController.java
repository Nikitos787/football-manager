package com.example.backend.controller;

import com.example.backend.dto.request.TeamRequestDto;
import com.example.backend.dto.response.PlayerResponseDto;
import com.example.backend.dto.response.TeamResponseDto;
import com.example.backend.mapper.PlayerMapper;
import com.example.backend.mapper.TeamMapper;
import com.example.backend.model.Team;
import com.example.backend.service.PlayerService;
import com.example.backend.service.TeamService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/teams")
public class TeamController {
    private final TeamService teamService;
    private final TeamMapper teamMapper;
    private final PlayerMapper playerMapper;
    private final PlayerService playerService;

    @PostMapping
    public TeamResponseDto save(@Valid @RequestBody TeamRequestDto dto) {
        return teamMapper.toDto(teamService.save(teamMapper.toModel(dto)));
    }

    @GetMapping
    public List<TeamResponseDto> findAll() {
        return teamService.findAll().stream()
                .map(teamMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public TeamResponseDto findById(@PathVariable Long id) {
        return teamMapper.toDto(teamService.findById(id));
    }

    @GetMapping("/{id}/players")
    public List<PlayerResponseDto> findAllByTeam(@PathVariable Long id) {
        Team team = teamService.findById(id);
        return playerService.findAllByTeam(team).stream()
                .map(playerMapper::toDto)
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public TeamResponseDto update(@PathVariable Long id,
                                  @Valid @RequestBody TeamRequestDto dto) {
        return teamMapper.toDto(teamService.update(id, teamMapper.toModel(dto)));
    }

    @DeleteMapping("/{id}/fire")
    public void fireAllPlayersByTeam(@PathVariable Long id) {
        Team team = teamService.findById(id);
        playerService.fireAllByTeam(team);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        teamService.delete(id);
    }
}
