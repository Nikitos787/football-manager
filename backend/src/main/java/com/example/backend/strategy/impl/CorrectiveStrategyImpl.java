package com.example.backend.strategy.impl;

import com.example.backend.model.Team;
import com.example.backend.strategy.CorrectiveFactorHandler;
import com.example.backend.strategy.CorrectiveStrategy;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CorrectiveStrategyImpl implements CorrectiveStrategy {
    private final List<CorrectiveFactorHandler> correctiveFactorHandlerList;

    @Override
    public CorrectiveFactorHandler get(Team.TeamLevel level) {
        return correctiveFactorHandlerList.stream()
                .filter(correctiveFactorHandler -> correctiveFactorHandler.isApplicable(level))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException(String
                        .format("Corrective factor for such team level: %s - is not exist",
                                level.name())));
    }
}
