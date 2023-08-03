package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "teams")
@Data
@SQLDelete(sql = "UPDATE teams SET deleted = true WHERE id=?")
@Where(clause = "deleted=false")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, name = "name")
    private String name;
    @Column(nullable = false, name = "country")
    private String country;
    @Column(nullable = false, name = "city")
    private String city;
    @Column(nullable = false, name = "budget")
    private BigDecimal budget;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "team_level")
    private TeamLevel teamLevel;
    @Column(nullable = false, name = "deleted")
    private boolean deleted = Boolean.FALSE;

    public enum TeamLevel {
        HIGH, LOW
    }
}
