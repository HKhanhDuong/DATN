package com.rentalcar.interceptor;

import java.nio.file.Paths;

import org.springframework.core.io.Resource; // Resource và UrlResource
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity; // ResponseEntity để trả kết quả HTTP
import org.springframework.web.bind.annotation.GetMapping; // Mapping các HTTP GET request
import org.springframework.web.bind.annotation.PathVariable; // Lấy dữ liệu động từ URL
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path; // Làm việc với đường dẫn
import java.nio.file.Paths;


@RestController
@RequestMapping("/assets/images")
public class ImageController {

    @GetMapping("/{subPath:.+}")
    public ResponseEntity<Resource> serveImage(@PathVariable String subPath) {
        try {
            Path imagePath = Paths.get("assets/images/").resolve(subPath); // Đường dẫn thư mục gốc
            Resource image = new UrlResource(imagePath.toUri());
            if (image.exists() || image.isReadable()) {
                return ResponseEntity.ok(image);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

