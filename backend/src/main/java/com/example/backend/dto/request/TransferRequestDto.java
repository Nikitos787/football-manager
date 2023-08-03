package com.example.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TransferRequestDto {
    @NotNull(message = "You should set player id")
    private Long playerId;
    @NotNull(message = "You should set selling team id")
    private Long sellingTeamId;
    @NotNull(message = "You should set buying team id")
    private Long buyingTeamId;
}
