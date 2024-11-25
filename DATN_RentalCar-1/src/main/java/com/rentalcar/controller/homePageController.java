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
import java.util.stream.Collectors;

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
import com.rentalcar.EmailService;
import com.rentalcar.dao.AccountRepo;
import com.rentalcar.dao.CarRepo;
import com.rentalcar.dao.DrivingLiscenseRepo;
import com.rentalcar.dao.MotorbikeRepo;
import com.rentalcar.dao.RentalVehicleRepo;
import com.rentalcar.dto.RentalDTO;
import com.rentalcar.dto.RentalDTO2;
import com.rentalcar.entity.Car;
import com.rentalcar.entity.DrivingLicense;
import com.rentalcar.entity.Motorbike;
import com.rentalcar.entity.Rental;
import com.rentalcar.entity.RentalVehicle;
import com.rentalcar.service.AccountService;
import com.rentalcar.service.CarService;
import com.rentalcar.service.RentalService;
import com.rentalcar.service.RentalVehicleService;
import com.rentalcar.service.SessionService;

import jakarta.mail.MessagingException;


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
    private AccountService accountService;
	@Autowired
    private CarService carService;
	@Autowired
    private DrivingLiscenseRepo drivingLiscenseRepo;
	@Autowired
    private EmailService emailService;
	@Autowired
    private RentalService rentalService;
	
	//private final String uploadDir = "uploads/accountsImg/";

    // Phương thức để lấy danh sách xe và hiển thị trong Thymeleaf template
    @GetMapping()
    public String viewAll(Model model) {
    	
        List<Car> cars = carRepo.findAll();
        List<Motorbike> motorbikes = motorbikeRepo.findAll();
        
        model.addAttribute("cars", cars);      
        model.addAttribute("motorbikes", motorbikes);
        
        return "index2";
    }
    // Phương thức hiển thị trang đổi mật khẩu
    @GetMapping("/change-password")
    public String showChangePasswordPage() {
        return "fragments/change-password"; // Chỉ định đúng đường dẫn tới file trong thư mục fragments
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
    
    @PostMapping("/change-password")
    public String changePassword(@RequestParam("currentPassword") String currentPassword,
                                 @RequestParam("newPassword") String newPassword,
                                 @RequestParam("confirmNewPassword") String confirmNewPassword,
                                 Model model) {
        // Lấy thông tin người dùng đã đăng nhập từ session
        Account user = (Account) session.get("user");

        if (user == null) {
            return "redirect:/login"; // Nếu không có người dùng trong session, chuyển hướng về trang đăng nhập
        }

     // Kiểm tra mật khẩu cũ và các điều kiện khác
        if (currentPassword.trim().isEmpty() || newPassword.trim().isEmpty() || confirmNewPassword.trim().isEmpty()) {
            model.addAttribute("error", "Tất cả các trường đều phải được điền.");
            return "account";
        }

     // Kiểm tra mật khẩu cũ có đúng không
        if (!user.getPasswordHash().equals(currentPassword)) {
            model.addAttribute("error", "Mật khẩu cũ không chính xác");
            return "account"; // Nếu mật khẩu cũ sai, quay lại trang đổi mật khẩu
        }

        // Kiểm tra mật khẩu mới và xác nhận mật khẩu mới có khớp không
        if (!newPassword.trim().equals(confirmNewPassword.trim())) {
            model.addAttribute("error", "Mật khẩu mới và xác nhận mật khẩu mới không khớp. Vui lòng thử lại.");
            return "account"; // Nếu không khớp, quay lại trang đổi mật khẩu
        }

        // Kiểm tra xem mật khẩu mới có giống mật khẩu cũ không
        if (newPassword.trim().equals(currentPassword.trim())) {
            model.addAttribute("error", "Mật khẩu mới không được giống với mật khẩu cũ");
            return "account"; // Nếu mật khẩu mới giống mật khẩu cũ, yêu cầu nhập lại
        }

        // Cập nhật mật khẩu mới
        user.setPasswordHash(newPassword); // Lưu mật khẩu mới mà không mã hóa

        // Lưu lại tài khoản vào cơ sở dữ liệu
        accountService.saveAccount(user); // Lưu thông tin tài khoản với mật khẩu mới

        // Cập nhật lại session với thông tin mới của người dùng
        session.set("user", user);

        // Thông báo thành công
        model.addAttribute("success", "Mật khẩu đã được thay đổi thành công");
        return "account"; // Quay lại trang tài khoản
    }

    @PostMapping("/save-account-info")
    public String saveAccountInfo(@RequestParam String fullName, 
                                  @RequestParam String phoneNumber, 
                                  @RequestParam String address, 
                                  @RequestParam String dateOfBirth, 
                                  @RequestParam String email, 
                                  @RequestParam String licenseNumber,
                                  Model model) throws ParseException {

        // Lấy thông tin người dùng đã đăng nhập từ session
        Account user = (Account) session.get("user");

        if (user == null) {
            model.addAttribute("error", "Bạn cần đăng nhập để cập nhật thông tin.");
            return "account"; // Trả về trang tài khoản với thông báo lỗi đăng nhập
        }

        // Kiểm tra các trường có bị để trống hay không
        if (fullName.isEmpty() || phoneNumber.isEmpty() || address.isEmpty() || dateOfBirth.isEmpty() || email.isEmpty()) {
            model.addAttribute("error", "Vui lòng điền đầy đủ các trường bắt buộc!");
            model.addAttribute("user", user); // Để giữ lại thông tin người dùng trên form
            return "account"; // Trả về trang tài khoản với thông báo lỗi
        }

        // Kiểm tra định dạng email
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";
        if (!email.matches(emailRegex)) {
            model.addAttribute("error", "Email không đúng định dạng!");
            model.addAttribute("user", user);
            return "account"; // Trả về trang tài khoản với thông báo lỗi
        }

        // Kiểm tra định dạng số điện thoại
        String phoneRegex = "^0[0-9]{9}$";
        if (!phoneNumber.matches(phoneRegex)) {
            model.addAttribute("error", "Số điện thoại chỉ được chứa số và phải từ 10 đến 12 chữ số!");
            model.addAttribute("user", user);
            return "account"; // Trả về trang tài khoản với thông báo lỗi
        }

        try {
            // Cập nhật thông tin người dùng
            user.setFullName(fullName);
            user.setPhoneNumber(phoneNumber);
            user.setAddress(address);
            user.setEmail(email);

            // Chuyển đổi ngày sinh từ String thành Date
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date dob = dateFormat.parse(dateOfBirth);
            user.setDateOfBirth(dob); // Cập nhật ngày sinh

            // Kiểm tra và cập nhật thông tin giấy phép lái xe
            DrivingLicense drivingLicense = user.getDrivingLicense();
            if (drivingLicense == null) {
                drivingLicense = new DrivingLicense();
                drivingLicense.setAccount(user);
                user.setDrivingLicense(drivingLicense);
            }
            // chưa thành công
            drivingLicense.setLicenseNumber(licenseNumber); // Cập nhật số giấy phép lái xe
            drivingLiscenseRepo.save(drivingLicense); // Lưu thông tin giấy phép lái xe

            // Lưu lại thông tin người dùng vào cơ sở dữ liệu
            accountRepo.save(user); // Lưu thay đổi vào cơ sở dữ liệu

            // Cập nhật lại session với thông tin mới của người dùng
            session.set("user", user);

            // Thêm thông báo thành công
            model.addAttribute("success", "Cập nhật thông tin tài khoản thành công!");
            return "account"; // Trả về trang tài khoản với thông báo thành công

        } catch (Exception e) {
            // Nếu có lỗi xảy ra trong quá trình lưu thông tin
            model.addAttribute("error", "Có lỗi xảy ra khi cập nhật thông tin tài khoản. Vui lòng thử lại.");
            model.addAttribute("user", user); // Để giữ lại thông tin người dùng trên form
            return "account"; // Trả về trang tài khoản với thông báo lỗi
        }
    }

    // Xử lý gửi email quên mật khẩu
    @PostMapping("/forgot-password")
    public String handleForgotPassword(@RequestParam("email") String email, Model model) {
        Account account = accountRepo.findByEmail(email);
        
        if (account != null) {
            // Tạo mật khẩu mới ngẫu nhiên
            String newPassword = generateRandomPassword();
            
            // Cập nhật mật khẩu mới trong cơ sở dữ liệu
            account.setPasswordHash(newPassword);
            accountService.saveAccount(account);
            
            // Gửi email với mật khẩu mới
            try {
                String subject = "Mật khẩu mới của bạn";
                String text = "Chào bạn, \n\n Mật khẩu mới của bạn là: " + newPassword;
                emailService.sendEmail(email, subject, text);
                model.addAttribute("success", "Mật khẩu mới đã được gửi qua email của bạn.");
            } catch (MessagingException e) {
                model.addAttribute("error", "Đã xảy ra lỗi khi gửi email. Vui lòng thử lại.");
            }
        } else {
            model.addAttribute("error", "Email không tồn tại trong hệ thống.");
        }

        return "forgotPassword";
    }
    
 // Hàm tạo mật khẩu mới ngẫu nhiên
    private String generateRandomPassword() {
        // Cách đơn giản để tạo mật khẩu mới ngẫu nhiên
        return Long.toHexString(Double.doubleToLongBits(Math.random()));
    }

    @GetMapping("/about")
    public String about() {
        return "about";
    } 
    
    @GetMapping("/forgotPassword")
    public String forgot() {
        return "forgotPassword";
    }
    
    
    @GetMapping("/pick-vehicle")
    public String viewAllVehicle(Model model) {
    	
        List<Car> cars = carRepo.findAll();
        List<Motorbike> motorbikes = motorbikeRepo.findAll();
        
        model.addAttribute("cars", cars);      
        model.addAttribute("motorbikes", motorbikes);
        
        return "pick-vehicle2";
    }
    
    @GetMapping("/rentalList")
    public String getRentalList(Model model) {
        // Lấy danh sách xe ô tô đã thuê
        List<RentalDTO2> rentedCars = rentalService.findAllCarRentals();
        
        // Lấy danh sách xe máy đã thuê
        List<RentalDTO2> rentedMotorbikes = rentalService.findAllMotorbikeRentals();
        
        // Thêm vào model để Thymeleaf có thể sử dụng
        model.addAttribute("rentedCars", rentedCars);
        model.addAttribute("rentedMotorbikes", rentedMotorbikes);
        
        return "rentalList"; // Tên file HTML
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

