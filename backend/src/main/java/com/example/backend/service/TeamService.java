package com.example.backend.service;

import com.example.backend.model.Team;
import java.util.List;

public interface TeamService {
    Team save(Team team);

    Team findById(Long id);

    List<Team> findAll();

    Team update(Long id, Team team);

    void delete(Long id);
}
