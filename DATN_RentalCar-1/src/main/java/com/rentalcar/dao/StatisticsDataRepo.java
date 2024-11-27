package com.rentalcar.dao;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.StatisticsData;

@Repository
public interface StatisticsDataRepo extends JpaRepository<StatisticsData, Long> {
    Optional<StatisticsData> findByStatDate(LocalDate statDate);
}

