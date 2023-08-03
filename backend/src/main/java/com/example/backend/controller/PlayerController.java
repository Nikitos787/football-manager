package com.example.backend.controller;

import com.example.backend.dto.request.PlayerRequestDto;
import com.example.backend.dto.response.PlayerResponseDto;
import com.example.backend.mapper.PlayerMapper;
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
@RequestMapping("/api/players")
public class PlayerController {
    private final PlayerService playerService;
    private final PlayerMapper playerMapper;
    private final TeamService teamService;

    @PostMapping
    public PlayerResponseDto save(@Valid @RequestBody PlayerRequestDto dto) {
        return playerMapper.toDto(playerService.save(playerMapper.toModel(dto)));
    }

    @GetMapping
    public List<PlayerResponseDto> findAll() {
        return playerService.findAll().stream()
                .map(playerMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public PlayerResponseDto findById(@PathVariable Long id) {
        return playerMapper.toDto(playerService.findById(id));
    }

    @PutMapping("/{id}")
    public PlayerResponseDto update(@PathVariable Long id,
                                    @Valid @RequestBody PlayerRequestDto dto) {
        return playerMapper.toDto(playerService.update(id, playerMapper.toModel(dto)));
    }

    @PutMapping("/{playerId}/teams/{teamId}")
    public void hirePlayerToTeam(@PathVariable Long playerId,
                                 @PathVariable Long teamId) {
        Team team = teamService.findById(teamId);
        playerService.hire(playerId, team);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        playerService.delete(id);
    }

    @DeleteMapping("/{id}/fire")
    public void firePlayer(@PathVariable Long id) {
        Team team = teamService.findById(playerService.findById(id).getTeam().getId());
        playerService.fire(id, team);
    }
}
