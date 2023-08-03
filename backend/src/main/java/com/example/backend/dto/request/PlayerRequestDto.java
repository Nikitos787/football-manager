package com.example.backend.dto.request;

import com.example.backend.model.Player;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import java.time.LocalDate;
import lombok.Data;

@Data
public class PlayerRequestDto {
    @NotBlank(message = "Name can't be empty or null")
    private String firstName;
    @NotBlank(message = "Second name can't be empty or null")
    private String secondName;
    @NotBlank(message = "City name can't be empty or null")
    private String city;
    @NotBlank(message = "Country name can't be empty or null")
    private String country;
    @Past(message = "Birthday should be in the past")
    private LocalDate birthDate;
    @NotNull(message = "Position can't be null")
    private Player.Position position;
}
