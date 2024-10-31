package com.rentalcar.apiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rentalcar.dao.AccountRepo;
import com.rentalcar.dao.RentalRepo;
import com.rentalcar.entity.Rental;
import com.rentalcar.entity.Account;
import com.rentalcar.entity.Discount;
import com.rentalcar.dao.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rental")
public class RentalController {
	
	@Autowired
	private RentalRepo rentalRepo;
	@Autowired
	private AccountRepo accountRepo;
	@Autowired
	private DiscountRepo discountRepo;
		
		
		//tìm tất cả
		@GetMapping
		public List<Rental> getAll() {
			return rentalRepo.findAll();
		}
		
		//tìm theo id xe
		@GetMapping(value = "/{id}")
		public ResponseEntity<Optional<Rental>> getByID(@PathVariable("id") Long id) {
			if (!rentalRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(rentalRepo.findById(id));
			}
		}
		
		//lưu
		@PostMapping
		public ResponseEntity<String> save(@RequestBody Rental rental) {
			System.out.println("-----------"+ rentalRepo + "------------" + rental);
			rentalRepo.save(rental);
			return ResponseEntity.ok("saved...");
		}
		
		@PostMapping("/save2")
		public ResponseEntity<Rental> createRental(@RequestBody Rental rentalRequest) {
			System.out.println("-----------"+ rentalRepo + "------------" + rentalRequest);
		    // Kiểm tra account không null
		    if (rentalRequest.getAccount() == null || rentalRequest.getAccount().getAccountId() == null) {
		        throw new IllegalArgumentException("Account ID must not be null");
		    }

		    Account account = accountRepo.findById(rentalRequest.getAccount().getAccountId())
		    		.orElseThrow(() -> new RuntimeException("accountID not found"));
		    rentalRequest.setAccount(account);

		    // Nếu discount có mặt trong request, lấy discount từ cơ sở dữ liệu
		    if (rentalRequest.getDiscount() != null && rentalRequest.getDiscount().getDiscountId() != null) {
		        Discount discount = discountRepo.findById(rentalRequest.getDiscount().getDiscountId())
		        		.orElseThrow(() -> new RuntimeException("DiscountId not found"));
		        rentalRequest.setDiscount(discount);
		    }

		    Rental savedRental = rentalRepo.save(rentalRequest);
		    return ResponseEntity.ok(savedRental);
		}


		
		@PutMapping(value = "/{id}")
		public String update(@PathVariable("id") Long id, @RequestBody Rental rentalDetail) {
		    // Tìm xe cần cập nhật
			Rental RentalUpdate = rentalRepo.findById(id).orElseThrow(() -> new RuntimeException("Rental not found"));
		    
		    // Cập nhật thông tin xe từ đối tượng carDetails
			RentalUpdate.setAccount(rentalDetail.getAccount());
			RentalUpdate.setRentalDate(rentalDetail.getRentalDate());
			RentalUpdate.setReturnDate(rentalDetail.getReturnDate());
			RentalUpdate.setActualReturnDate(rentalDetail.getActualReturnDate());
			RentalUpdate.setTotalCost(rentalDetail.getTotalCost());
			RentalUpdate.setRenStatus(rentalDetail.getRenStatus());
			RentalUpdate.setDiscount(rentalDetail.getDiscount());
			RentalUpdate.setHaveDriver(rentalDetail.getHaveDriver());
			
			if (rentalDetail.getRentalDate() != null) {
			    RentalUpdate.setRentalDate(rentalDetail.getRentalDate());
			}
			if (rentalDetail.getReturnDate() != null) {
			    RentalUpdate.setReturnDate(rentalDetail.getReturnDate());
			}
			if (rentalDetail.getActualReturnDate() != null) {
			    RentalUpdate.setActualReturnDate(rentalDetail.getActualReturnDate());
			}
			if (rentalDetail.getTotalCost() != null) {
			    RentalUpdate.setTotalCost(rentalDetail.getTotalCost());
			}
			if (rentalDetail.getRenStatus() != null && !rentalDetail.getRenStatus().isEmpty()) {
			    RentalUpdate.setRenStatus(rentalDetail.getRenStatus());
			}

		    // Lưu đối tượng xe đã cập nhật
			rentalRepo.save(RentalUpdate);
		    
		    return "updated successfully";
		}	
		
		@DeleteMapping(value = "/{id}")
	    public String deleteById(@PathVariable("id") Long id) {
			rentalRepo.deleteById(id);
			
			return "deleted...";
	    }
}
