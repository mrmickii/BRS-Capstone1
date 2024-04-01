package com.brscapstone1.brscapstone1.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brscapstone1.brscapstone1.Entity.ReservationEntity;
import com.brscapstone1.brscapstone1.Repository.ReservationRepository;

@Service
public class ReservationService {
	
	@Autowired
	ReservationRepository resRepo;
	
	public ReservationEntity post(ReservationEntity reservation) {
		return resRepo.save(reservation);
	}
	
	public List<ReservationEntity> reservations(){
		return resRepo.findAll();
	}
}
