package com.example.backend.mapper;

import com.example.backend.dto.request.PlayerRequestDto;
import com.example.backend.dto.response.PlayerResponseDto;
import com.example.backend.model.Player;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapperConfig.class)
public interface PlayerMapper {
    @Mapping(source = "team.id", target = "teamId")
    PlayerResponseDto toDto(Player player);

    Player toModel(PlayerRequestDto dto);
}
