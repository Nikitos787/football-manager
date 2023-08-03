package com.example.backend.dto.response;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class TransferResponseDto {
    private Long id;
    private Long playerId;
    private Long sellingTeamId;
    private Long buyingTeamId;
    private BigDecimal transferFee;
}
