package com.example.backend.service;

import com.example.backend.model.Team;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TeamService {
    Team save(Team team);

    Team findById(Long id);

    Page<Team> findAll(Pageable pageable);

    Team update(Long id, Team team);

    void delete(Long id);

    List<Team> search(String name);
}
