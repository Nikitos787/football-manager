package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Data
@Table(name = "transfers")
public class Transfer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Player player;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "selling_team_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Team sellingTeam;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buying_team_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Team buyingTeam;
    @Column(name = "transfer_fee", nullable = false)
    private BigDecimal transferFee;
}
