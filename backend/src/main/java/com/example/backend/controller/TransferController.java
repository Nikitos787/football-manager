package com.example.backend.controller;

import com.example.backend.dto.request.TransferRequestDto;
import com.example.backend.dto.response.TransferResponseDto;
import com.example.backend.mapper.TransferMapper;
import com.example.backend.service.TransferService;
import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transfers")
public class TransferController {
    private final TransferService transferService;
    private final TransferMapper transferMapper;

    @PostMapping
    public TransferResponseDto transferPlayer(@Valid @RequestBody TransferRequestDto dto) {
        return transferMapper.toDto(transferService.save(transferMapper.toModel(dto)));
    }

    @GetMapping("/{id}")
    public TransferResponseDto findById(@PathVariable Long id) {
        return transferMapper.toDto(transferService.findById(id));
    }

    @GetMapping
    public List<TransferResponseDto> findAll(Pageable pageable) {
        return transferService.findAll(pageable).stream()
                .map(transferMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/calculate")
    public BigDecimal calculatePrice(@RequestParam Long playerId) {
        return transferService.calculatePriceWithoutCommission(playerId);
    }
}
