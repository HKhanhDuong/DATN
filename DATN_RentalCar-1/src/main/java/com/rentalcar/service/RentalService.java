package com.rentalcar.service;

import java.util.List;

import com.rentalcar.dto.RentalDTO;
import com.rentalcar.dto.RentalDTO2;
import com.rentalcar.entity.Rental;

public interface RentalService {

	List<RentalDTO2> findAllCarRentals();

	List<RentalDTO2> findAllMotorbikeRentals();


}
