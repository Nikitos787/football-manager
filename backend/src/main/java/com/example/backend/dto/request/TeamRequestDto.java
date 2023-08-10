package com.example.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import lombok.Data;

@Data
public class TeamRequestDto {
    @NotBlank(message = "Name can't be empty or null")
    private String name;
    @NotBlank(message = "Country name can't be empty or null")
    private String country;
    @NotBlank(message = "City name can't be empty or null")
    private String city;
    @PositiveOrZero(message = "Budget can't be less than 0")
    private BigDecimal budget;
    @PositiveOrZero(message = "Commission can't be less than 0")
    private Integer commission;
}
