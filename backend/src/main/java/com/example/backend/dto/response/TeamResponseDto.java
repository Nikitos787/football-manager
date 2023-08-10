package com.example.backend.dto.response;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class TeamResponseDto {
    private Long id;
    private String name;
    private String country;
    private String city;
    private BigDecimal budget;
    private Integer commission;
}
