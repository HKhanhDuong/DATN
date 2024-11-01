package com.rentalcar.dto;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Set;

import com.rentalcar.entity.Rental;
import com.rentalcar.entity.Role;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FeedbackInfo {
    private Long accountId;
    private String username;
    private String email;
    private String vehicleType;
    private Long carId;
    private Long motorbikeId;
    private Integer rating;
    private String comment;
    private LocalDate feedbackDate; // Thay Date bằng LocalDate

    // Getters and setters
}
