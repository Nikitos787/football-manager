package com.example.backend.strategy.impl;

import com.example.backend.model.Team;
import com.example.backend.strategy.CorrectiveFactorHandler;
import java.math.BigDecimal;
import org.springframework.stereotype.Component;

@Component
public class LowCorrectiveFactorHandler implements CorrectiveFactorHandler {
    @Override
    public BigDecimal factor(Team.TeamLevel level) {
        return BigDecimal.ONE;
    }

    @Override
    public boolean isApplicable(Team.TeamLevel level) {
        return level == Team.TeamLevel.LOW;
    }
}
