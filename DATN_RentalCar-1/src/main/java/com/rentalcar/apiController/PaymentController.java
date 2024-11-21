package com.rentalcar.apiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rentalcar.dao.PaymentRepo;
import com.rentalcar.entity.Payment;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
	
	@Autowired
	private PaymentRepo paymentRepo;
		
		
		//tìm tất cả
		@GetMapping
		public List<Payment> getAll() {
			return paymentRepo.findAll();
		}
		
		//tìm theo id
		@GetMapping(value = "/{id}")
		public ResponseEntity<Optional<Payment>> getByID(@PathVariable("id") Long id) {
			if (!paymentRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(paymentRepo.findById(id));
			}
		}
		
		//lưu
		@PostMapping
		public ResponseEntity<Payment> save(@RequestBody Payment payment) {
			Payment savePayment = paymentRepo.save(payment);
			return ResponseEntity.ok(savePayment);
		}
		
		@PutMapping(value = "/{id}")
		public String update(@PathVariable("id") Long id, @RequestBody Payment paymentDetail) {
		    // Tìm đối tượng cần cập nhật
			Payment paymentUpdate = paymentRepo.findById(id).orElseThrow(() -> new RuntimeException("Payment not found"));
		    
		    // Cập nhật thông tin xe từ đối tượng 
			paymentUpdate.setAmount(paymentDetail.getAmount());
			paymentUpdate.setPaymentDate(paymentDetail.getPaymentDate());
			paymentUpdate.setPaymentMethod(paymentDetail.getPaymentMethod());
			
			// Lưu đối tượng 
			paymentRepo.save(paymentUpdate);
		    
		    return "updated successfully";
		}	
		
		@DeleteMapping(value = "/{id}")
	    public String deleteById(@PathVariable("id") Long id) {
			paymentRepo.deleteById(id);
			
			return "deleted...";
	    }
}
