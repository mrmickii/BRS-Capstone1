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
    public List<ReservationEntity> getApprovedReservations() {
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

    @PostMapping("/opc-approve/{reservationId}")
    public ResponseEntity<String> opcApproveReservation(@PathVariable int reservationId) {
        try {
            resServ.opcApproveReservation(reservationId);
            return ResponseEntity.ok("Reservation approved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to approve reservation: " + e.getMessage());
        }
    }

    @PostMapping("/reject/{reservationId}")
    public ResponseEntity<String> rejectReservation(@PathVariable int reservationId, @RequestBody String feedback) {
        try {
            resServ.rejectReservation(reservationId, feedback);
            return ResponseEntity.ok("Reservation rejected successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to reject reservation: " + e.getMessage());
        }
    }

    @PostMapping("/add")
    public ReservationEntity addReservation(@RequestParam("userName") String userName, @RequestParam(value = "file", required = false) MultipartFile file, @RequestParam("reservation") String reservationJson) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ReservationEntity reservation = objectMapper.readValue(reservationJson, ReservationEntity.class);
        return resServ.saveReservation(userName, reservation, file);
    }

    @GetMapping("/reservations")
    public List<ReservationEntity> getAllReservations() {
        return resServ.getAllReservations();
    }

    @GetMapping("/reservations/{userName}")
    public ResponseEntity<List<ReservationEntity>> getUserReservations(@PathVariable String userName) {
        try {
            List<ReservationEntity> userReservations = resServ.getUserReservations(userName);
            return ResponseEntity.ok(userReservations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
