package com.rentalcar.apiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rentalcar.dao.PaymentRepo;
import com.rentalcar.entity.Account;
import com.rentalcar.entity.Discount;
import com.rentalcar.entity.Feedback;
import com.rentalcar.entity.Payment;
import com.rentalcar.entity.RentalVehicle;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentRepo paymentRepo;

    // Tìm tất cả
    @GetMapping
    public ResponseEntity<List<Payment>> getAll() {
        List<Payment> payments = paymentRepo.findAll();
        if (payments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(payments);
    }

    // Tìm theo ID
    @GetMapping(value = "/{id}")
    public ResponseEntity<Payment> getById(@PathVariable("id") Long id) {
        Optional<Payment> payment = paymentRepo.findById(id);
        if (payment.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(null);
        }
        return ResponseEntity.ok(payment.get());
    }
    
    
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
	public class PaymentResponse {
	    private String message;
	    private String status;

	}

	
	

    @PostMapping
    public ResponseEntity<PaymentResponse> save(@RequestBody Payment payment) {
        try {
            System.out.println("------------------------------------------------------------\n");


            
            System.out.println("payment : " + payment.toString());
            System.out.println("------------------------------------------------------------\n");

            // So sánh chuỗi đúng cách với .equals()
            if ("COD".equals(payment.getPaymentType())) {
                Payment savedPayment = paymentRepo.save(payment);
                // Trả về đối tượng JSON với thông báo thành công
               
                return ResponseEntity.status(HttpStatus.CREATED).body( new PaymentResponse("Save payment successfully...", "success"));
            }

            // Trường hợp khác, trả về thông báo thành công
           
            return ResponseEntity.status(HttpStatus.CREATED).body(new PaymentResponse("https://qcgateway.zalopay.vn/openinapp?order=eyJ6cHRyYW5zdG9rZW4iOiJBQ053eGlLcHNlcEJ5UXpBenhrRzhLQ1EiLCJhcHBpZCI6MjU1M30=", "success"));

        } catch (Exception e) {
            // Xử lý lỗi và trả về thông báo lỗi dưới dạng JSON
            PaymentResponse response = new PaymentResponse("An error occurred while saving payment.", "error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    // Cập nhật
    @PutMapping(value = "/{id}")
    public ResponseEntity<String> update(@PathVariable("id") Long id, @RequestBody Payment paymentDetail) {
        Optional<Payment> existingPayment = paymentRepo.findById(id);
        if (existingPayment.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
        }

        Payment paymentUpdate = existingPayment.get();
        paymentUpdate.setAmount(paymentDetail.getAmount());
        paymentUpdate.setRental(paymentDetail.getRental());
        paymentUpdate.setPaymentDate(paymentDetail.getPaymentDate());
        paymentUpdate.setPaymentMethod(paymentDetail.getPaymentMethod());
        paymentUpdate.setNotes(paymentDetail.getNotes());
        paymentUpdate.setIdQrCode(paymentDetail.getIdQrCode());

        paymentRepo.save(paymentUpdate);
        return ResponseEntity.ok("Payment updated successfully");
    }

    // Xóa
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteById(@PathVariable("id") Long id) {
        if (!paymentRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
        }
        paymentRepo.deleteById(id);
        return ResponseEntity.ok("Payment deleted successfully");
    }
}
