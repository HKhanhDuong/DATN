package com.rentalcar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RentalDTO {
	private Long accountId;         // ID của tài khoản
	private LocalDateTime rentalDate;  // Ngày thuê
    private LocalDateTime returnDate;  // Ngày trả
    private BigDecimal totalCost;       // Tổng chi phí, có thể tính toán thêm
    private String renStatus;       // Trạng thái thuê
    private Boolean haveDriver;     // Cần tài xế hay không
    private String rentalLocations; // Vị trí thuê xe
    private String vehicleType;     // Loại xe (Car/Motorbike)
     
}

