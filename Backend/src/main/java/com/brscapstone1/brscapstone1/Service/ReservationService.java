package com.brscapstone1.brscapstone1.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
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
        }else{
					reservation.setFileName("No file(s) attached");
					reservation.setFileType("No file(s) attached");
					reservation.setFileSize(0);
				}
        return resRepo.save(reservation);
    }

    public List<ReservationEntity> getAllReservations() {
        return resRepo.findAll();
    }

    public ReservationEntity getReservationById(int id) {
        return resRepo.findById(id).orElse(null);
    }

    public byte[] getFileContent(ReservationEntity reservation) throws IOException {
        if (reservation != null && reservation.getFileName() != null) {
            String directoryPath = "C:\\Users\\garci\\Downloads\\";
            File file = new File(directoryPath + reservation.getFileName());
            return Files.readAllBytes(file.toPath());
        }
        return null;
    }
}
