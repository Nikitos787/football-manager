package com.example.backend.service.impl;

import com.example.backend.exception.TransferStatusException;
import com.example.backend.model.Player;
import com.example.backend.model.Team;
import com.example.backend.model.Transfer;
import com.example.backend.repository.TransferRepository;
import com.example.backend.service.PlayerService;
import com.example.backend.service.TeamService;
import com.example.backend.service.TransferService;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransferServiceImpl implements TransferService {
    private static final Long PRICE_PER_MONTH = 100000L;
    
    private final TransferRepository transferRepository;
    private final TeamService teamService;
    private final PlayerService playerService;

    @Override
    public Transfer save(Transfer transfer) {
        Team buyingTeam = teamService.findById(transfer.getBuyingTeam().getId());
        Player player = playerService.findById(transfer.getPlayer().getId());
        Team sellingTeam = getSellingTeam(player);

        validateTransferData(buyingTeam, sellingTeam, player);

        BigDecimal amountToPay = getTransferFee(buyingTeam, player);

        performBudgetUpdates(buyingTeam, sellingTeam, amountToPay);

        transfer.setTransferFee(amountToPay);
        transfer.setSellingTeam(sellingTeam);
        transfer.setBuyingTeam(buyingTeam);

        updateDataInDataBase(buyingTeam, sellingTeam, player);

        return transferRepository.save(transfer);
    }

    @Override
    public Transfer findById(Long id) {
        return transferRepository.findById(id).orElseThrow(() ->
                new NoSuchElementException(String.format("Can't find by id: %s in DB", id)));
    }

    @Override
    public Page<Transfer> findAll(Pageable pageable) {
        return transferRepository.findAll(pageable);
    }

    @Override
    public BigDecimal calculatePriceWithoutCommission(Long playerId) {
        Player player = playerService.findById(playerId);
        int playerAge = calculatePlayerAge(player.getBirthDate());
        if (playerAge > 0) {
            return BigDecimal.valueOf(getAmountOfMonthExperience(player.getDateOfBeginningCareer())
                    * PRICE_PER_MONTH / calculatePlayerAge(player.getBirthDate()));
        }
        throw new TransferStatusException(String
                .format("Player's, with id: %s, age is less than 1", playerId));
    }

    private Team getSellingTeam(Player player) {
        Team sellingTeam;
        if (player.getTeam() != null) {
            sellingTeam = teamService.findById(player.getTeam().getId());
        } else {
            throw new TransferStatusException(String
                    .format("Player with id: %s, don't have team, that's why he cannot "
                            + "be transferred", player.getId()));
        }
        return sellingTeam;
    }

    private void performBudgetUpdates(Team buyingTeam,
                                      Team sellingTeam,
                                      BigDecimal amountToPay) {
        validateBudgetForTransferOperation(buyingTeam, amountToPay);

        buyingTeam.setBudget(buyingTeam.getBudget().subtract(amountToPay));
        sellingTeam.setBudget(sellingTeam.getBudget().add(amountToPay));
    }

    private int getAmountOfMonthExperience(LocalDate date) {
        return (int) ChronoUnit.MONTHS.between(date, LocalDate.now());
    }

    private int calculatePlayerAge(LocalDate date) {
        return (int) ChronoUnit.YEARS.between(date, LocalDate.now());
    }

    private void validateTransferData(Team buyingTeam,
                                      Team sellingTeam,
                                      Player player) {
        if (buyingTeam.getId().equals(sellingTeam.getId())) {
            throw new TransferStatusException("For transfer buying team and selling "
                    + "team can't be the same");
        }
        if (player.getStatus() == Player.Status.UNEMPLOYED) {
            throw new TransferStatusException(String.format("For transfer player cannot be %s",
                    Player.Status.UNEMPLOYED.name()));
        }
    }

    private void validateBudgetForTransferOperation(Team buyingTeam, BigDecimal amountToPay) {
        if (buyingTeam.getBudget().subtract(amountToPay).compareTo(BigDecimal.ZERO) < 0) {
            throw new TransferStatusException(String
                    .format("Don't enough money for transfer in buying team with id: %s",
                            buyingTeam.getId()));
        }
    }

    private BigDecimal getTransferFee(Team buyingTeam, Player player) {
        BigDecimal amountWithoutCommission = calculatePriceWithoutCommission(player.getId());

        BigDecimal commissionAmount = amountWithoutCommission
                .multiply(BigDecimal.valueOf(buyingTeam.getCommission()))
                .divide(BigDecimal.valueOf(100), RoundingMode.HALF_UP);

        return amountWithoutCommission.add(commissionAmount);
    }

    private void updateDataInDataBase(Team buyingTeam, Team sellingTeam, Player player) {
        playerService.changeTeamForTransfer(player.getId(), buyingTeam.getId());
        teamService.update(buyingTeam.getId(), buyingTeam);
        teamService.update(sellingTeam.getId(), sellingTeam);
    }
}
