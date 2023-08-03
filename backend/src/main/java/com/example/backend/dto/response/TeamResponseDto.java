package com.example.backend.dto.response;

import com.example.backend.model.Team;
import java.math.BigDecimal;
import lombok.Data;

@Data
public class TeamResponseDto {
    private Long id;
    private String name;
    private String country;
    private String city;
    private BigDecimal budget;
    private Team.TeamLevel teamLevel;
}
