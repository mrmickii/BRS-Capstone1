package com.brscapstone1.brscapstone1.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.brscapstone1.brscapstone1.Entity.ReservationEntity;
import com.brscapstone1.brscapstone1.Service.ReservationService;

@RestController
@CrossOrigin
public class ReservationController {
	
	@Autowired
	ReservationService resServ;
	
	@PostMapping("/post")
	public ReservationEntity post(@RequestBody ReservationEntity reservation) {
		return resServ.post(reservation);
	}
	
	@GetMapping("/reservations")
	public List<ReservationEntity> reservations(){
		return resServ.reservations();
	}
}
