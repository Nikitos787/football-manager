package com.example.backend.service.impl;

import com.example.backend.model.Player;
import com.example.backend.model.Team;
import com.example.backend.model.Transfer;
import com.example.backend.repository.TransferRepository;
import com.example.backend.service.PlayerService;
import com.example.backend.service.TeamService;
import com.example.backend.service.TransferService;
import com.example.backend.strategy.CommissionStrategy;
import com.example.backend.strategy.CorrectiveStrategy;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransferServiceImpl implements TransferService {
    private static final Long PRICE_PER_MONTH = 100000L;
    
    private final TransferRepository transferRepository;
    private final TeamService teamService;
    private final PlayerService playerService;
    private final CommissionStrategy commissionStrategy;
    private final CorrectiveStrategy correctiveStrategy;

    @Override
    public Transfer save(Transfer transfer) {
        Team buyingTeam = teamService.findById(transfer.getBuyingTeam().getId());
        Team sellingTeam = teamService.findById(transfer.getSellingTeam().getId());
        Player player = playerService.findById(transfer.getPlayer().getId());

        validateTransferData(buyingTeam, sellingTeam, player);

        BigDecimal priceForTransfer = calculatePriceWithoutCommission(player.getId());
        BigDecimal commissionWithoutFactor = commissionStrategy.get(priceForTransfer)
                .calculateCommission(priceForTransfer);
        BigDecimal factor = correctiveStrategy.get(buyingTeam.getTeamLevel())
                .factor(buyingTeam.getTeamLevel());
        BigDecimal commission = commissionWithoutFactor.multiply(factor);
        BigDecimal amountToPay = priceForTransfer.add(commission);

        validateBudgetForTransferOperation(buyingTeam, amountToPay);

        buyingTeam.setBudget(buyingTeam.getBudget().subtract(amountToPay));
        sellingTeam.setBudget(sellingTeam.getBudget().add(amountToPay));
        player.setTeam(buyingTeam);
        transfer.setTransferFee(amountToPay);

        playerService.changeTeamForTransfer(player.getId(), buyingTeam);
        teamService.update(buyingTeam.getId(), buyingTeam);
        teamService.update(sellingTeam.getId(), sellingTeam);
        return transferRepository.save(transfer);
    }

    @Override
    public Transfer findById(Long id) {
        return transferRepository.findById(id).orElseThrow(() ->
                new NoSuchElementException(String.format("Can't find by id: %s in DB", id)));
    }

    @Override
    public List<Transfer> findAll() {
        return transferRepository.findAll();
    }

    @Override
    public BigDecimal calculatePriceWithoutCommission(Long playerId) {
        Player player = playerService.findById(playerId);
        return BigDecimal.valueOf(getAmountOfMonthExperience(player.getDateOfBeginningCareer())
                * PRICE_PER_MONTH / calculatePlayerAge(player.getBirthDate()));
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
            throw new RuntimeException("For transfer buying team and selling "
                    + "team can't be the same");
        }
        if (player.getStatus() == Player.Status.UNEMPLOYED) {
            throw new RuntimeException(String.format("For transfer player cannot be %s",
                    Player.Status.UNEMPLOYED.name()));
        }
    }

    private void validateBudgetForTransferOperation(Team buyingTeam, BigDecimal amountToPay) {
        if (buyingTeam.getBudget().subtract(amountToPay).compareTo(BigDecimal.ZERO) < 0) {
            throw new RuntimeException(String
                    .format("Don't enough money for transfer in buying team with id: %s",
                            buyingTeam.getId()));
        }
    }
}
