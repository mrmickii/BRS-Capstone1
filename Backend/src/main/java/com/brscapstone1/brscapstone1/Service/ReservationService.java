package com.brscapstone1.brscapstone1.Service;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.brscapstone1.brscapstone1.Entity.ReservationEntity;
import com.brscapstone1.brscapstone1.Repository.ReservationRepository;

@Service
public class ReservationService {
    
    @Autowired
    private ReservationRepository resRepo;

    public void headApproveReservation(int reservationId) {
        ReservationEntity reservation = resRepo.findById(reservationId).orElse(null);
        if (reservation == null) {
            throw new IllegalArgumentException("Reservation not found");
        }
        reservation.setHeadIsApproved(true); 
        resRepo.save(reservation);
    }


    public void approveReservation(int reservationId) {
        ReservationEntity reservation = resRepo.findById(reservationId).orElse(null);
        if (reservation == null) {
            throw new IllegalArgumentException("Reservation not found");
        }
        reservation.setStatus("Approved");
        reservation.setApproved(true); 
        resRepo.save(reservation);
    }

    public List<ReservationEntity> getHeadApprovedReservations() {
        return resRepo.findByHeadIsApproved(true);
    }

    public void rejectReservation(int reservationId) {
        ReservationEntity reservation = resRepo.findById(reservationId).orElse(null);
        if (reservation == null) {
            throw new IllegalArgumentException("Reservation not found");
        }
        reservation.setStatus("Rejected");
        reservation.setRejected(true); 
        resRepo.save(reservation);
    }

    public ReservationEntity saveReservation(String userEmail, ReservationEntity reservation, MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            reservation.setFileName(file.getOriginalFilename());
            reservation.setFileType(file.getContentType());
            reservation.setFileSize(file.getSize());
        } else {
            reservation.setFileName("No file(s) attached");
            reservation.setFileType("No file(s) attached");
            reservation.setFileSize(0);
        }
        if (reservation.getStatus() == null || reservation.getStatus().isEmpty()) {
            reservation.setStatus("Pending");
        }
        reservation.setUserEmail(userEmail);
        return resRepo.save(reservation);
    }

    public List<ReservationEntity> getAllReservations() {
        return resRepo.findAll();
    }

    public ReservationEntity getReservationById(int id) {
        return resRepo.findById(id).orElse(null);
    }

    public List<ReservationEntity> getUserReservations(String userEmail) {
        return resRepo.findByUserEmail(userEmail);
    }
}
