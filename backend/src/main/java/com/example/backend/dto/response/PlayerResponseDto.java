package com.example.backend.dto.response;

import com.example.backend.model.Player;
import java.time.LocalDate;
import lombok.Data;

@Data
public class PlayerResponseDto {
    private Long id;
    private String firstName;
    private String secondName;
    private String city;
    private String country;
    private LocalDate dateOfBeginningCareer;
    private LocalDate birthDate;
    private Long teamId;
    private Player.Status status;
    private Player.Position position;
}
