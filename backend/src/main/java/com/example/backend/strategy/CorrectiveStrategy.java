package com.example.backend.strategy;

import com.example.backend.model.Team;

public interface CorrectiveStrategy {
    CorrectiveFactorHandler get(Team.TeamLevel level);
}
