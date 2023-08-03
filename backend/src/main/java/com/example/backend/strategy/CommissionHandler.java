package com.example.backend.strategy;

import java.math.BigDecimal;

public interface CommissionHandler {
    BigDecimal calculateCommission(BigDecimal transferFee);

    boolean isSupporting(BigDecimal transferFee);
}
