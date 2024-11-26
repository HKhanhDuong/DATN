package com.rentalcar.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
public class VehicleSearchController {

    private static final String CAR_API_URL = "http://localhost:8080/api/car";
    private static final String BIKE_API_URL = "http://localhost:8080/api/motorbikes";

    @GetMapping("/search")
    public String searchVehicles(
            @RequestParam String location,      // Lấy địa điểm từ form
            @RequestParam String vehicleType,   // Lấy loại phương tiện từ form
            Model model) {

        // Chọn API dựa trên loại phương tiện
        String apiUrl = vehicleType.equals("car") ? CAR_API_URL : BIKE_API_URL;

        // Gọi API để lấy danh sách phương tiện
        RestTemplate restTemplate = new RestTemplate();
        List<Map<String, Object>> vehicles = restTemplate.getForObject(apiUrl, List.class);

        // Lọc phương tiện theo địa điểm
        List<Map<String, Object>> filteredVehicles = vehicles.stream()
                .filter(vehicle -> location.equals(vehicle.get("vehicleLocation")))
                .collect(Collectors.toList());

        // Đưa kết quả vào model để truyền sang giao diện
        model.addAttribute("vehicles", filteredVehicles);
        model.addAttribute("vehicleType", vehicleType);
        return "pick-vehicle2"; // Trả về view "searchResult.html"
    }
}
