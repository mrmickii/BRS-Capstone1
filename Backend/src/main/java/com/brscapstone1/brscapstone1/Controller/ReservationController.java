package com.brscapstone1.brscapstone1.Controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.brscapstone1.brscapstone1.Entity.ReservationEntity;
import com.brscapstone1.brscapstone1.Service.ReservationService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin
@RequestMapping("/reservation")
public class ReservationController {
    
    @Autowired
    private ReservationService resServ;
    
		@PostMapping("/add")
		public ReservationEntity addReservation(@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam("reservation") String reservationJson) throws IOException {
				System.out.println("Received file: " + (file != null ? file.getOriginalFilename() : "No file uploaded"));
				System.out.println("Received JSON: " + reservationJson);
				
				ObjectMapper objectMapper = new ObjectMapper();
				ReservationEntity reservation = objectMapper.readValue(reservationJson, ReservationEntity.class);
				
				System.out.println("Mapped reservation: " + reservation);
				
				return resServ.saveReservation(reservation, file);
		}

    @GetMapping("/reservations")
    public List<ReservationEntity> getAllReservations(){
        return resServ.getAllReservations();
    }
}
