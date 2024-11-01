package com.rentalcar.service;

import java.util.List;

import com.rentalcar.dto.FeedbackInfo;

public interface FeedbackService {

	List<FeedbackInfo> getCompletedRentalsWithFeedback();

}
