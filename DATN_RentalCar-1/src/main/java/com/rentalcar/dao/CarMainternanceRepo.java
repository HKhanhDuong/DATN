package com.rentalcar.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.CarMaintenance;



@Repository
public interface CarMainternanceRepo extends JpaRepository<CarMaintenance, Long> {
    List<CarMaintenance> findByCar_CarId(Long carId); // Tìm tất cả bảo dưỡng theo carId
}

