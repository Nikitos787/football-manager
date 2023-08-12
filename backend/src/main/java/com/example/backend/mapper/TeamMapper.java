package com.example.backend.mapper;

import com.example.backend.dto.request.TeamRequestDto;
import com.example.backend.dto.response.TeamResponseDto;
import com.example.backend.model.Team;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapperConfig.class)
public interface TeamMapper {
    @Mapping(source = "id", target = "id")
    TeamResponseDto toDto(Team team);

    @Mapping(ignore = true, target = "id")
    @Mapping(ignore = true, target = "deleted")
    Team toModel(TeamRequestDto dto);
}
