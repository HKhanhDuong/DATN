package com.rentalcar.apiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.rentalcar.entity.Account;
import com.rentalcar.dao.AccountRepo;
import com.rentalcar.service.AccountService;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.io.IOException;

@RestController
public class UploadImageController {
	
	@Autowired
    private AccountRepo accountRepo;
	
	@PostMapping("/api/uploadImg")
	public ResponseEntity<Map<String, String>> uploadFile(
	        @RequestParam("file") MultipartFile file,
	        @RequestParam("type") String type) {
	    try {
	        // Kiểm tra loại file
	        String contentType = file.getContentType();
	        if (contentType == null || !contentType.startsWith("image/")) {
	            return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
	                                 .body(Map.of("message", "Chỉ hỗ trợ upload file ảnh."));
	        }

	        // Giới hạn kích thước file (5MB)
	        if (file.getSize() > 30 * 1024 * 1024) {
	            return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
	                                 .body(Map.of("message", "File quá lớn, giới hạn là 5MB."));
	        }

	        // Xác định loại thư mục theo loại ảnh
	        String folderType;
	        switch (type.toLowerCase()) {
	            case "car":
	                folderType = "car";
	                break;
	            case "motorbike":
	                folderType = "motorbike";
	                break;
	            case "account":
	                folderType = "account";
	                break;
	            default:
	                folderType = "others";
	                break;
	        }

	        // Tạo tên file với UUID
	        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
	        
	        // Thư mục lưu trữ bên trong resources/static/assets
	        String uploadDir = "src/main/resources/static/assets/images/" + folderType + "/";
	        Path uploadPath = Paths.get(uploadDir);

	        // Tạo thư mục nếu chưa tồn tại
	        if (!Files.exists(uploadPath)) {
	            Files.createDirectories(uploadPath);
	        }

	        // Lưu file vào thư mục trong resources
	        Files.copy(file.getInputStream(), uploadPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

	        // Tạo URL ảnh (URL tương đối từ thư mục static)
	        String imageUrl = fileName;

	        System.out.println("imageUrl: " + imageUrl);

	        // Trả về thông tin file
	        return ResponseEntity.ok(Map.of(
	            "imageUrl", imageUrl,
	            "fileName", fileName,
	            "contentType", contentType,
	            "size", String.valueOf(file.getSize())
	        ));
	    } catch (IOException e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body(Map.of("message", "Lỗi khi lưu file."));
	    }
	}


	@DeleteMapping("/{id}") //chưa xóa được
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
	                String uploadDir = "src/main/resources/static/accountsImg/";
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
	
//	@PostMapping("/api/uploadImg")
//    public ResponseEntity<Map<String, String>> uploadFile(
//            @RequestParam("file") MultipartFile file,
//            @RequestParam("type") String type) {
//        try {
//            // Xác định loại thư mục theo loại ảnh (car, motorbike, etc.)
//            String folderType;
//            switch (type.toLowerCase()) {
//                case "carImg":
//                    folderType = "carsImg";
//                    break;
//                case "motorbikeImg":
//                    folderType = "motorbikesImg";
//                    break;
//                case "accountImg":
//                    folderType = "accountsImg";
//                    break;
//                default:
//                    // Mặc định nếu không có loại ảnh sẽ đưa vào thư mục "others"
//                    folderType = "others";
//                    break;
//            }
//
//            // Tạo tên file với UUID để đảm bảo tính duy nhất
//            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
//            // Thư mục upload theo loại ảnh
//            String uploadDir = "uploads/" + folderType + "/";
//            Path uploadPath = Paths.get(uploadDir);
//
//            // Kiểm tra và tạo thư mục nếu chưa tồn tại
//            if (!Files.exists(uploadPath)) {
//                Files.createDirectories(uploadPath);
//            }
//
//            // Lưu file vào thư mục tương ứng
//            Files.copy(file.getInputStream(), uploadPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
//
//            // Tạo URL để truy cập ảnh
//            String imageUrl = "/uploads/" + folderType + "/" + fileName;
//            return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
//        } catch (IOException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }


}
