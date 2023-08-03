package com.example.backend.strategy.impl;

import com.example.backend.strategy.CommissionHandler;
import java.math.BigDecimal;
import java.math.RoundingMode;
import org.springframework.stereotype.Component;

@Component
public class MediumTransferCommissionHandler implements CommissionHandler {
    private static final BigDecimal COMMISSION = BigDecimal.valueOf(5);

    @Override
    public BigDecimal calculateCommission(BigDecimal transferFee) {
        return transferFee.multiply(COMMISSION).divide(BigDecimal.valueOf(100), RoundingMode.UP);
    }

    @Override
    public boolean isSupporting(BigDecimal transferFee) {
        return transferFee.compareTo(BigDecimal.valueOf(1000000)) == 0;
    }
}
