package com.example.backend.controller;

import com.example.backend.dto.request.PlayerRequestDto;
import com.example.backend.dto.response.PlayerResponseDto;
import com.example.backend.mapper.PlayerMapper;
import com.example.backend.service.PlayerService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/players")
public class PlayerController {
    private final PlayerService playerService;
    private final PlayerMapper playerMapper;

    @PostMapping
    public PlayerResponseDto save(@Valid @RequestBody PlayerRequestDto dto) {
        return playerMapper.toDto(playerService.save(playerMapper.toModel(dto)));
    }

    @GetMapping
    public List<PlayerResponseDto> findAll(Pageable pageable) {
        return playerService.findAll(pageable).stream()
                .map(playerMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public PlayerResponseDto findById(@PathVariable Long id) {
        return playerMapper.toDto(playerService.findById(id));
    }

    @PutMapping("/{id}")
    public PlayerResponseDto update(@PathVariable Long id,
                                    @Valid @RequestBody PlayerRequestDto dto) {
        return playerMapper.toDto(playerService.updatePlayerInfo(id, playerMapper.toModel(dto)));
    }

    @PutMapping("/{playerId}/teams/{teamId}")
    public void hirePlayerToTeam(@PathVariable Long playerId,
                                 @PathVariable Long teamId) {
        playerService.hirePlayerToTeam(playerId, teamId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        playerService.delete(id);
    }

    @DeleteMapping("/{id}/fire")
    public void firePlayer(@PathVariable Long id) {
        playerService.firePlayerFromTeam(id);
    }

    @GetMapping("/search")
    public List<PlayerResponseDto> search(@RequestParam String name) {
        return playerService.search(name).stream()
                .map(playerMapper::toDto)
                .toList();
    }
}
