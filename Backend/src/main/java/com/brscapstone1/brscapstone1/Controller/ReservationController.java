package com.brscapstone1.brscapstone1.Controller;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    
    @GetMapping("/reservations/head-approved")
    public List<ReservationEntity> getApprovedReservations(){
        return resServ.getHeadApprovedReservations();
    }
    
    @PostMapping("/head-approve/{reservationId}")
    public ResponseEntity<String> headApproveReservation(@PathVariable int reservationId) {
        try {
            resServ.headApproveReservation(reservationId);
            return ResponseEntity.ok("Reservation approved by Head of the Department successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to approve reservation: " + e.getMessage());
        }
    }

    @PostMapping("/approve/{reservationId}")
    public ResponseEntity<String> approveReservation(@PathVariable int reservationId) {
        try {
            resServ.approveReservation(reservationId);
            return ResponseEntity.ok("Reservation approved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to approve reservation: " + e.getMessage());
        }
    }

    @PostMapping("/reject/{reservationId}")
    public ResponseEntity<String> rejectReservation(@PathVariable int reservationId) {
        try {
            resServ.rejectReservation(reservationId);
            return ResponseEntity.ok("Reservation rejected successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to reject reservation: " + e.getMessage());
        }
    }

    @PostMapping("/add")
    public ReservationEntity addReservation(@RequestParam("userEmail") String userEmail, @RequestParam(value = "file", required = false) MultipartFile file, @RequestParam("reservation") String reservationJson) throws IOException {
        System.out.println("Received file: " + (file != null ? file.getOriginalFilename() : "No file uploaded"));
        System.out.println("Received JSON: " + reservationJson);
        
        ObjectMapper objectMapper = new ObjectMapper();
        ReservationEntity reservation = objectMapper.readValue(reservationJson, ReservationEntity.class);
        
        System.out.println("Mapped reservation: " + reservation);
        
        return resServ.saveReservation(userEmail, reservation, file);
    }

    @GetMapping("/reservations")
    public List<ReservationEntity> getAllReservations(){
        return resServ.getAllReservations();
    }
}
