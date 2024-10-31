package com.rentalcar.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


import com.rentalcar.entity.Discount;
import com.rentalcar.dao.DiscountRepo;
import com.rentalcar.dao.CarRepo;
import com.rentalcar.dao.MotorbikeRepo;
import com.rentalcar.entity.Car;
import com.rentalcar.entity.Motorbike;


@Controller
public class DetailVehicleController {
	
	@Autowired
    private MotorbikeRepo motorbikeRepo;
	@Autowired
    private CarRepo carRepo;
	@Autowired
    private DiscountRepo discountRepo;
	
	
	@GetMapping("/car/detail/{id}")
    public String getCarById(@PathVariable Long id, Model model) {
        Optional<Car> car = carRepo.findById(id);
        List<Discount> discounts = discountRepo.findAll();

        if (car.isPresent()) {
            model.addAttribute("car", car.get());  // Truyền đối tượng car vào model
            model.addAttribute("discounts", discounts);
        } else {
            // Xử lý lỗi khi không tìm thấy xe
            model.addAttribute("error", "Không tìm thấy xe với ID này");
            return "error-page";  // Trả về trang lỗi
        }

        return "car-details2";  // Trả về trang chi tiết xe
    }
	
	
	@GetMapping("/motorbike/detail/{id}")
    public String getMotobikeById(@PathVariable Long id, Model model) {
        Optional<Motorbike> motorbike = motorbikeRepo.findById(id);
        List<Discount> discounts = discountRepo.findAll();

        if (motorbike.isPresent()) {
        	model.addAttribute("motorbike", motorbike.get());
        	model.addAttribute("discounts", discounts);
        } else {
            // Xử lý lỗi khi không tìm thấy xe
            model.addAttribute("error", "Không tìm thấy xe với ID này");
            return "error-page";  // Trả về trang lỗi
        }

        return "motorbikes-details";  // Trả về trang chi tiết xe
    }
}

