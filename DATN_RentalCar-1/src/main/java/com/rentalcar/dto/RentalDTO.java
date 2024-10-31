package com.rentalcar.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class RentalDTO {
    private Long accountId; // ID của tài khoản
    private LocalDateTime rentalDate;
    private LocalDateTime returnDate;
    private BigDecimal totalCost; // Tính toán trước
    private String renStatus;
    private Boolean haveDriver;
    private String rentalLocations;
}

