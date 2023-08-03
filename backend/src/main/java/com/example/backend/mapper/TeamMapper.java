package com.example.backend.mapper;

import com.example.backend.dto.request.TeamRequestDto;
import com.example.backend.dto.response.TeamResponseDto;
import com.example.backend.model.Team;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface TeamMapper {
    TeamResponseDto toDto(Team team);

    Team toModel(TeamRequestDto dto);
}
