package com.example.backend.mapper;

import com.example.backend.dto.request.TransferRequestDto;
import com.example.backend.dto.response.TransferResponseDto;
import com.example.backend.model.Transfer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapperConfig.class)
public interface TransferMapper {
    @Mapping(ignore = true, target = "id")
    @Mapping(source = "playerId", target = "player.id")
    @Mapping(source = "buyingTeamId", target = "buyingTeam.id")
    @Mapping(ignore = true, target = "transferFee")
    @Mapping(ignore = true, target = "sellingTeam")
    Transfer toModel(TransferRequestDto dto);

    @Mapping(source = "player.id", target = "playerResponseDto.id")
    @Mapping(source = "player.firstName", target = "playerResponseDto.firstName")
    @Mapping(source = "player.secondName", target = "playerResponseDto.secondName")
    @Mapping(source = "player.city", target = "playerResponseDto.city")
    @Mapping(source = "player.country", target = "playerResponseDto.country")
    @Mapping(source = "player.dateOfBeginningCareer", target = "playerResponseDto"
            + ".dateOfBeginningCareer")
    @Mapping(source = "player.birthDate", target = "playerResponseDto.birthDate")
    @Mapping(source = "player.team", target = "playerResponseDto.teamResponseDto")
    @Mapping(source = "player.position", target = "playerResponseDto.position")
    @Mapping(source = "player.status", target = "playerResponseDto.status")
    @Mapping(source = "sellingTeam.id", target = "sellTeamResponseDto.id")
    @Mapping(source = "sellingTeam.name", target = "sellTeamResponseDto.name")
    @Mapping(source = "sellingTeam.country", target = "sellTeamResponseDto.country")
    @Mapping(source = "sellingTeam.city", target = "sellTeamResponseDto.city")
    @Mapping(source = "sellingTeam.budget", target = "sellTeamResponseDto.budget")
    @Mapping(source = "sellingTeam.commission", target = "sellTeamResponseDto.commission")
    @Mapping(source = "buyingTeam.id", target = "buyTeamResponseDto.id")
    @Mapping(source = "buyingTeam.name", target = "buyTeamResponseDto.name")
    @Mapping(source = "buyingTeam.country", target = "buyTeamResponseDto.country")
    @Mapping(source = "buyingTeam.city", target = "buyTeamResponseDto.city")
    @Mapping(source = "buyingTeam.budget", target = "buyTeamResponseDto.budget")
    @Mapping(source = "buyingTeam.commission", target = "buyTeamResponseDto.commission")
    TransferResponseDto toDto(Transfer transfer);
}
