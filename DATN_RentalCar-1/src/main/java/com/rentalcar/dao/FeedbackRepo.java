package com.rentalcar.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rentalcar.dto.FeedbackInfo;
import com.rentalcar.entity.Feedback;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Long> {
    
    @Query("SELECT new com.rentalcar.dto.FeedbackInfo(" +
           "a.accountId, a.username, a.email, rv.vehicleType, rv.car.carId, " + // Sửa thành a.email và rv.car.carId
           "rv.motorbike.motorbikeId, f.rating, f.comment, f.feedbackDate) " + // Sửa thành f.rating và f.comment
           "FROM Account a " + // Tên entity đúng là Account
           "JOIN Rental r ON a.accountId = r.account.accountId " + // Sửa thành r.account.accountId
           "JOIN RentalVehicle rv ON r.rentalId = rv.rental.rentalId " + // Sửa thành rv.rental.rentalId
           "LEFT JOIN Feedback f ON r.rentalId = f.rental.rentalId " + // Sửa thành f.rental.rentalId
           "WHERE r.renStatus = 'hoan tat'") //ko có dấu mới chạy được
    List<FeedbackInfo> findCompletedRentalsWithFeedback();
}
