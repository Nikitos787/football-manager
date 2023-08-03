package com.example.backend.service;

import com.example.backend.model.Transfer;
import java.math.BigDecimal;
import java.util.List;

public interface TransferService {
    Transfer save(Transfer transfer);

    Transfer findById(Long id);

    List<Transfer> findAll();

    BigDecimal calculatePriceWithoutCommission(Long playerId);
}
