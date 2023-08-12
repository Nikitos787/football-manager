package com.example.backend.dto.response;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class TransferResponseDto {
    private Long id;
    private PlayerResponseDto playerResponseDto;
    private TeamResponseDto sellTeamResponseDto;
    private TeamResponseDto buyTeamResponseDto;
    private BigDecimal transferFee;
}
