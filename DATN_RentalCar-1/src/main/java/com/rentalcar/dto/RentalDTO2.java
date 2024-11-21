package com.rentalcar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RentalDTO2{
    private Long accountId;         // ID của tài khoản
    private LocalDateTime rentalDate;  // Ngày thuê
    private LocalDateTime returnDate;  // Ngày trả
    private String renStatus;       // Trạng thái thuê
    private Long carId;             // ID của xe ô tô
    private String model;           // Tên xe ô tô
    
}
