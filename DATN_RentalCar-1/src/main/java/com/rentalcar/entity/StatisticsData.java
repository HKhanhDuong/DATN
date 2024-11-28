package com.rentalcar.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "StatisticsData")
public class StatisticsData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate statDate = LocalDate.now(); // Ngày thống kê, mặc định là ngày hiện tại

    @Column(nullable = true)
    private int totalMotorbikeRentals = 0; // Tổng số lượt thuê xe máy, mặc định là 0
    
    @Column(nullable = true)
    private int totalCarRentals = 0; // Tổng số lượt thuê xe oto, mặc định là 0

    @Column(nullable = true)
    private double totalRevenue = 0.0; // Tổng doanh thu trong ngày, mặc định là 0.0

    @Column(nullable = true)
    private int totalCustomers = 0; // Số lượng khách hàng thuê xe, mặc định là 0

    @Column(nullable = true)
    private int totalNewCustomers = 0; // Số khách hàng mới, mặc định là 0

    @Column(nullable = true)
    private int totalVehiclesRented = 0; // Tổng số xe được thuê, mặc định là 0
    
    @Column(nullable = true)
    private int totalMotorbikesAvailable = 0; // Tổng số xe oto sẵn sàng cho thuê, mặc định là 0
    
    @Column(nullable = true)
    private int totalCarsAvailable = 0; // Tổng số xe oto sẵn sàng cho thuê, mặc định là 0

    @Column(nullable = true)
    private int totalDrivers = 0; // Tổng số tài xế làm việc trong ngày, mặc định là 0

    @Column(nullable = true)
    private double averageRentalDuration = 0.0; // Thời gian thuê xe trung bình (giờ), mặc định là 0.0

    @Column(nullable = true)
    private double averageRevenuePerRental = 0.0; // Doanh thu trung bình mỗi lượt thuê, mặc định là 0.0

    @Column(nullable = true)
    private double discountUsed = 0.0; // Tổng giá trị giảm giá áp dụng, mặc định là 0.0

    @PrePersist
    public void prePersist() {
        if (statDate == null) {
            statDate = LocalDate.now(); // Đảm bảo ngày thống kê được thiết lập nếu chưa có
        }
    }
}
