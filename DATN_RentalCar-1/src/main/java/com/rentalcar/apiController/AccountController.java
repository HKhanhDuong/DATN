package com.rentalcar.apiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rentalcar.dao.AccountRepo;
import com.rentalcar.dao.RoleRepo;
import com.rentalcar.entity.Account;
import com.rentalcar.entity.Role;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

//cho Pageable
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AccountRepo accountRepo;
    @Autowired
    private RoleRepo roleRepo;

    // Lấy danh sách tất cả tài khoản (có phân trang)
    @GetMapping
    public ResponseEntity<?> getAllAccounts(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Account> accounts = accountRepo.findAll(pageable);
            if (accounts.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No accounts found");
            }
            return ResponseEntity.ok(accounts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error retrieving accounts");
        }
    }

    // Lấy tài khoản theo ID
    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getByID(@PathVariable("id") Long id) {
        try {
            Optional<Account> accountOpt = accountRepo.findById(id);
            if (accountOpt.isPresent()) {
                return ResponseEntity.ok(accountOpt.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error retrieving account");
        }
    }

    // Tạo mới tài khoản
//    @PostMapping
//    public ResponseEntity<?> save(@RequestBody Account account) {
//        try {
//            accountRepo.save(account);
//            return ResponseEntity.status(HttpStatus.CREATED).body("Account saved successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                                 .body("Error saving account: " + e.getMessage());
//        }
//    }
    @PostMapping
    public ResponseEntity<?> save(@RequestBody Account account) {
        try {
            Account savedAccount = accountRepo.save(account);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAccount);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error saving account: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Cập nhật tài khoản
    @PutMapping(value = "/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody Account accountDetails) {
        try {
            Optional<Account> accountOpt = accountRepo.findById(id);
            if (accountOpt.isPresent()) {
                Account account = accountOpt.get();
                account.setFullName(accountDetails.getFullName());
                account.setUsername(accountDetails.getUsername());
                account.setEmail(accountDetails.getEmail());
                account.setPhoneNumber(accountDetails.getPhoneNumber());
                account.setPasswordHash(accountDetails.getPasswordHash());
                account.setRoles(accountDetails.getRoles());
                account.setDateOfBirth(accountDetails.getDateOfBirth());
                account.setAddress(accountDetails.getAddress());
                account.setImageUrl(accountDetails.getImageUrl());
                
                accountRepo.save(account);
                return ResponseEntity.ok("Account updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error updating account: " + e.getMessage());
        }
    }

    // Xóa tài khoản theo ID
//    @DeleteMapping(value = "/{id}")
//    public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
//        try {
//            if (accountRepo.existsById(id)) {
//                accountRepo.deleteById(id);
//                return ResponseEntity.ok("Account deleted successfully");
//            } else {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                                 .body("Error deleting account: " + e.getMessage());
//        }
//    }
    
    @DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
	    try {
	        // Lấy thông tin account trước khi xóa
	        Optional<Account> accountOptional = accountRepo.findById(id);
	        if (accountOptional.isPresent()) {
	            Account account = accountOptional.get();
	            String imageUrl = account.getImageUrl();
	            
	            // Xóa account từ database
	            accountRepo.deleteById(id);
	            
	            // Xóa file ảnh nếu tồn tại và không phải ảnh mặc định
	            if (imageUrl != null && !imageUrl.equals("user.jpg")) {
	                String uploadDir = "uploads/accountsImg/";
	                Path filePath = Paths.get(uploadDir + imageUrl);
	                
	                try {
	                    Files.deleteIfExists(filePath);
	                    System.out.println("Đã xóa file ảnh: " + filePath);
	                } catch (IOException e) {
	                    System.err.println("Lỗi khi xóa file ảnh: " + e.getMessage());
	                }
	            }
	            
	            return ResponseEntity.ok().body("Account deleted successfully");
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                           .body("Error deleting account: " + e.getMessage());
	    }
	}
}
