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

    //[POST] approved reservations by HEAD
    public void headApproveReservation(int reservationId) {
        ReservationEntity reservation = resRepo.findById(reservationId).orElseThrow(() -> new IllegalArgumentException("Reservation not found"));
        reservation.setHeadIsApproved(true); 
        resRepo.save(reservation);
    }

    //[POST] approved reservations by OPC
    public void opcApproveReservation(int reservationId, int driverId, String driverName) {
        ReservationEntity reservation = resRepo.findById(reservationId).orElseThrow(() -> new IllegalArgumentException("Reservation not found"));
        
        if(reservation.getDriverName() == null || reservation.getDriverName().isEmpty()) {
            reservation.setDriverName("No driver assign");
        }
        reservation.setStatus("Approved");
        reservation.setOpcIsApproved(true); 
        reservation.setDriverId(driverId);
        reservation.setDriverName(driverName);
        resRepo.save(reservation);
    }

    //[GET] all reservations that is approved by HEAD
    public List<ReservationEntity> getHeadApprovedReservations() {
        return resRepo.findByHeadIsApproved(true);
    }

    //[isRejected] rejects a reservation and returns boolean output
    public void rejectReservation(int reservationId, String feedback) {
        ReservationEntity reservation = resRepo.findById(reservationId).orElseThrow(() -> new IllegalArgumentException("Reservation not found"));
        reservation.setStatus("Rejected");
        reservation.setRejected(true); 
        reservation.setFeedback(feedback);
        resRepo.save(reservation);
    }

    //[POST] || submits a reservation
    public ReservationEntity saveReservation(String userName, ReservationEntity reservation, MultipartFile file) throws IOException {
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
        if (reservation.getFeedback() == null || reservation.getFeedback().isEmpty()) {
            reservation.setFeedback("No feedback");
        }
        if(reservation.getDriverName() == null || reservation.getDriverName().isEmpty()){
            reservation.setDriverName("No assigned driver");
        }
        reservation.setUserName(userName);
        return resRepo.save(reservation);
    }

    //[GET] all Reservations
    public List<ReservationEntity> getAllReservations() {
        return resRepo.findAll();
    }

    //[GET] all Reservations by their ID
    public ReservationEntity getReservationById(int id) {
        return resRepo.findById(id).orElse(null);
    }

    //[GET] all user's reservations
    public List<ReservationEntity> getUserReservations(String userName) {
        return resRepo.findByUserName(userName);
    }

    //[POST] || update assigned driver
    public void updateAssignedDriver(int reservationId, int driverId, String assignedDriverName) {
        ReservationEntity reservation = resRepo.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found"));
        reservation.setDriverId(driverId);
        reservation.setDriverName(assignedDriverName);
        resRepo.save(reservation);
    }
    
    //[PUT] update reservation
    public ReservationEntity updateReservation(int reservationId, ReservationEntity updatedReservation, MultipartFile file) throws IOException {
        ReservationEntity existingReservation = resRepo.findById(reservationId)
            .orElseThrow(() -> new IllegalArgumentException("Reservation not found"));

        existingReservation.setTypeOfTrip(updatedReservation.getTypeOfTrip());
        existingReservation.setDestinationTo(updatedReservation.getDestinationTo());
        existingReservation.setDestinationFrom(updatedReservation.getDestinationFrom());
        existingReservation.setCapacity(updatedReservation.getCapacity());
        existingReservation.setDepartment(updatedReservation.getDepartment());
        existingReservation.setSchedule(updatedReservation.getSchedule());
        existingReservation.setVehicleType(updatedReservation.getVehicleType());
        existingReservation.setPickUpTime(updatedReservation.getPickUpTime());
        existingReservation.setDepartureTime(updatedReservation.getDepartureTime());
        existingReservation.setReason(updatedReservation.getReason());

        if (file != null && !file.isEmpty()) {
            existingReservation.setFileName(file.getOriginalFilename());
            existingReservation.setFileType(file.getContentType());
            existingReservation.setFileSize(file.getSize());
        }
        
        existingReservation.setStatus(updatedReservation.getStatus());
        existingReservation.setOpcIsApproved(updatedReservation.isOpcIsApproved());
        existingReservation.setRejected(updatedReservation.isRejected());
        existingReservation.setHeadIsApproved(updatedReservation.isHeadIsApproved());
        existingReservation.setUserName(updatedReservation.getUserName());
        existingReservation.setFeedback(updatedReservation.getFeedback());
        existingReservation.setDriverId(updatedReservation.getDriverId());
        existingReservation.setDriverName(updatedReservation.getDriverName());

        return resRepo.save(existingReservation);
    }
}