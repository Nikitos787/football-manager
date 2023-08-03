package com.example.backend.mapper;

import com.example.backend.dto.request.TransferRequestDto;
import com.example.backend.dto.response.TransferResponseDto;
import com.example.backend.model.Transfer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapperConfig.class)
public interface TransferMapper {
    @Mapping(source = "playerId", target = "player.id")
    @Mapping(source = "sellingTeamId", target = "sellingTeam.id")
    @Mapping(source = "buyingTeamId", target = "buyingTeam.id")
    Transfer toModel(TransferRequestDto dto);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "player.id", target = "playerId")
    @Mapping(source = "sellingTeam.id", target = "sellingTeamId")
    @Mapping(source = "buyingTeam.id", target = "buyingTeamId")
    @Mapping(source = "transferFee", target = "transferFee")
    TransferResponseDto toDto(Transfer transfer);
}
