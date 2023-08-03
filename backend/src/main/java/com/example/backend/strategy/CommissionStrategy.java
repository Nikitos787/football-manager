package com.example.backend.strategy;

import java.math.BigDecimal;

public interface CommissionStrategy {
    CommissionHandler get(BigDecimal transferAmount);
}
