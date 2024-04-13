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

    public ReservationEntity saveReservation(ReservationEntity reservation, MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            reservation.setFileName(file.getOriginalFilename());
            reservation.setFileType(file.getContentType());
            reservation.setFileSize(file.getSize());
        }
        return resRepo.save(reservation);
    }

    public List<ReservationEntity> getAllReservations() {
        return resRepo.findAll();
    }
}
