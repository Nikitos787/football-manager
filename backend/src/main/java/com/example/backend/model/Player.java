package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "players")
@Data
@SQLDelete(sql = "UPDATE players SET is_deleted = true WHERE id=?")
@Where(clause = "is_deleted=false")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, name = "first_name")
    private String firstName;
    @Column(nullable = false, name = "second_name")
    private String secondName;
    @Column(nullable = false, name = "city")
    private String city;
    @Column(nullable = false, name = "country")
    private String country;
    @Column(nullable = false, name = "date_of_beginning_career")
    private LocalDate dateOfBeginningCareer;
    @Column(nullable = false, name = "birth_date")
    private LocalDate birthDate;
    @Column(nullable = false, name = "is_deleted")
    private boolean isDeleted = Boolean.FALSE;
    @ManyToOne
    @JoinColumn(name = "team_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Team team;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Position position;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.UNEMPLOYED;

    public enum Position {
        GOALKEEPER, DEFENDER, MIDFIELDER, STRIKER
    }

    public enum Status {
        EMPLOYED, UNEMPLOYED
    }
}
