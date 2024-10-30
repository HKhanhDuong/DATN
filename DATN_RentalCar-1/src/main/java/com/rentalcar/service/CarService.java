package com.rentalcar.service;

import java.util.List;
import java.util.Optional;

import com.rentalcar.entity.Car;

public interface CarService {

	Optional<Car> findById(Long id);

	List<String> getAllCarModels();

	List<String> getAllCarMakes();

}
