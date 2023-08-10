package com.example.backend.service;

import com.example.backend.model.Transfer;
import java.math.BigDecimal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TransferService {
    Transfer save(Transfer transfer);

    Transfer findById(Long id);

    Page<Transfer> findAll(Pageable pageable);

    BigDecimal calculatePriceWithoutCommission(Long playerId);
}
