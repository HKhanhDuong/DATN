package com.rentalcar.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "RentalVehicles")
public class RentalVehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rentalVehicleId;

    @ManyToOne
    @JoinColumn(name = "rentalId")
    @OnDelete(action = OnDeleteAction.CASCADE) 
    private Rental rental;

    @ManyToOne
    @JoinColumn(name = "carId")
    private Car car;

    @ManyToOne
    @JoinColumn(name = "motorbikeId")
    private Motorbike motorbike;

    @Column(nullable = false, length = 50, columnDefinition = "NVARCHAR(50)")
    private String vehicleType;

    @ManyToOne
    @JoinColumn(name = "driverId")
    private Driver driver;
    

    // Getters and Setters
}
