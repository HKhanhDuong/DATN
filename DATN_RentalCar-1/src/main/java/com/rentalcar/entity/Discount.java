package com.rentalcar.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Discounts")
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long discountId;

    @Column(nullable = false, unique = true, length = 50)
    private String discountCode;

    @Column(length = 255, columnDefinition = "NVARCHAR(255)")
    private String description;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal discountPercentage;

    @Column(nullable = false)
    private Date startDate;

    @Column(nullable = false)
    private Date endDate;

    @Column(nullable = false, length = 50, columnDefinition = "NVARCHAR(50)")
    private String status;
    
    @OneToMany(mappedBy = "discount")
    private Set<Rental> rental;

    // Getters and Setters
}
