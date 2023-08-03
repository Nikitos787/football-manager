package com.example.backend.strategy.impl;

import com.example.backend.strategy.CommissionHandler;
import com.example.backend.strategy.CommissionStrategy;
import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommissionStrategyImpl implements CommissionStrategy {
    private final List<CommissionHandler> commissionHandlerList;

    @Override
    public CommissionHandler get(BigDecimal transferAmount) {
        return commissionHandlerList.stream()
                .filter(commissionHandler -> commissionHandler.isSupporting(transferAmount))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException(String
                        .format("Commission handler for such transfer fee: %s - is not exist",
                                transferAmount)));
    }
}
