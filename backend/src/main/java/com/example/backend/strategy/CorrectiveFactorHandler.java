package com.example.backend.strategy;

import com.example.backend.model.Team;
import java.math.BigDecimal;

public interface CorrectiveFactorHandler {
    BigDecimal factor(Team.TeamLevel level);

    boolean isApplicable(Team.TeamLevel level);
}
