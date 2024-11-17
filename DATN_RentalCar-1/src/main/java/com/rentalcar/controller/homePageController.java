package com.rentalcar.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.rentalcar.entity.Account;
import com.rentalcar.entity.Role;
import com.rentalcar.dao.AccountRepo;
import com.rentalcar.dao.CarRepo;
import com.rentalcar.dao.MotorbikeRepo;
import com.rentalcar.entity.Car;
import com.rentalcar.entity.Motorbike;
import com.rentalcar.service.CarService;
import com.rentalcar.service.SessionService;


@Controller
@RequestMapping(value = {"Rental-Car" , "/" , "/home"})
public class homePageController {
	
	@Autowired
    private MotorbikeRepo motorbikeRepo;
	@Autowired
    private CarRepo carRepo;
	@Autowired
    private SessionService session;
	@Autowired
    private AccountRepo accountRepo;
	@Autowired
    private CarService carService;
	
	 private final String uploadDir = "uploads/accountsImg/";

    // Phương thức để lấy danh sách xe và hiển thị trong Thymeleaf template
    @GetMapping()
    public String viewAll(Model model) {
    	
        List<Car> cars = carRepo.findAll();
        List<Motorbike> motorbikes = motorbikeRepo.findAll();
        
        model.addAttribute("cars", cars);      
        model.addAttribute("motorbikes", motorbikes);
        
        return "index2";
    }
    
 // Phương thức xử lý khi người dùng nhấn vào "Chào User" và chuyển đến trang Account
    @GetMapping("/account")
    public String viewAccountInfo(Model model) {
        // Lấy thông tin người dùng đã đăng nhập từ session
        Account user = (Account) session.get("user");

        if (user == null) {
            // Nếu không có người dùng trong session, chuyển hướng về trang đăng nhập
            return "redirect:/login";
        }

        // Thêm thông tin người dùng vào model để hiển thị trên trang tài khoản
        model.addAttribute("user", user);
        return "account"; // Trả về trang hiển thị thông tin tài khoản
    }
    
    @PostMapping("/save-account-info")
    public String saveAccountInfo(@RequestParam String fullName, 
                                  @RequestParam String phoneNumber, 
                                  @RequestParam String address, 
                                  @RequestParam String dateOfBirth, 
                                  @RequestParam String email) throws ParseException {
        
        // Lấy thông tin người dùng đã đăng nhập từ session
        Account user = (Account) session.get("user");

        if (user == null) {
            return "redirect:/login"; // Nếu không có người dùng trong session, chuyển hướng về trang đăng nhập
        }

        // Cập nhật thông tin người dùng
        user.setFullName(fullName);
        user.setPhoneNumber(phoneNumber);
        user.setAddress(address);
        user.setEmail(email);

        // Chuyển đổi ngày sinh từ String thành Date
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date dob = dateFormat.parse(dateOfBirth);
        user.setDateOfBirth(dob); // Cập nhật ngày sinh

        // Lưu lại thông tin người dùng vào cơ sở dữ liệu
        accountRepo.save(user); // Lưu thay đổi vào cơ sở dữ liệu

        // Cập nhật lại session với thông tin mới của người dùng
        session.set("user", user);

        // Sau khi lưu xong, chuyển hướng về trang tài khoản
        return "redirect:/account";
    }

    
    @GetMapping("/about")
    public String about() {
        return "about";
    } 	
    
    @GetMapping("/pick-vehicle")
    public String viewAllVehicle(Model model) {
    	
        List<Car> cars = carRepo.findAll();
        List<Motorbike> motorbikes = motorbikeRepo.findAll();
        
        model.addAttribute("cars", cars);      
        model.addAttribute("motorbikes", motorbikes);
        
        return "pick-vehicle2";
    }
    
    @RequestMapping("/logout")
	public String logoutSuccess(Model model) {
		session.remove("user");
		session.remove("userAdmin");
		session.remove("security-uri");
		session.remove("uri");
		model.addAttribute("message", "Đăng xuất thành công");
		return "login";
	}

    
    @GetMapping("/testReact")
    public String getCar( Model model) {
        return "testReact"; // trả về trang hiển thị chi tiết xe
    }
}

