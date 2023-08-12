package com.example.backend.mapper;

import com.example.backend.dto.request.PlayerRequestDto;
import com.example.backend.dto.response.PlayerResponseDto;
import com.example.backend.model.Player;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapperConfig.class)
public interface PlayerMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "firstName", target = "firstName")
    @Mapping(source = "secondName", target = "secondName")
    @Mapping(source = "city", target = "city")
    @Mapping(source = "country", target = "country")
    @Mapping(source = "dateOfBeginningCareer", target = "dateOfBeginningCareer")
    @Mapping(source = "team", target = "teamResponseDto")
    @Mapping(source = "birthDate", target = "birthDate")
    @Mapping(source = "position", target = "position")
    @Mapping(source = "status", target = "status")
    PlayerResponseDto toDto(Player player);

    @Mapping(ignore = true, target = "id")
    @Mapping(source = "firstName", target = "firstName")
    @Mapping(source = "secondName", target = "secondName")
    @Mapping(source = "city", target = "city")
    @Mapping(source = "country", target = "country")
    @Mapping(ignore = true, target = "dateOfBeginningCareer")
    @Mapping(ignore = true, target = "team")
    @Mapping(source = "birthDate", target = "birthDate")
    @Mapping(source = "position", target = "position")
    @Mapping(ignore = true, target = "status")
    @Mapping(ignore = true, target = "deleted")
    Player toModel(PlayerRequestDto dto);
}
