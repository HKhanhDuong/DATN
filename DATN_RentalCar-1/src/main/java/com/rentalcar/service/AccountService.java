package com.rentalcar.service;

import java.util.Optional;

import com.rentalcar.entity.Account;
import com.rentalcar.entity.Rental;

public interface AccountService {

	Account findByEmail(String email);

}
