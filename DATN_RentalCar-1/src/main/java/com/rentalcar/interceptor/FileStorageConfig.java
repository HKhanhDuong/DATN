package com.rentalcar.interceptor;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;

@Configuration
public class FileStorageConfig {
//    @Value("${file.upload-dir}")
//    private String uploadDir;
//    
//    @PostConstruct
//    public void init() {
//        try {
//            Path path = Paths.get(uploadDir);
//            if (!Files.exists(path)) {
//                Files.createDirectories(path);
//            }
//        } catch (IOException e) {
//            throw new RuntimeException("Could not create upload directory!", e);
//        }
//    }
}
