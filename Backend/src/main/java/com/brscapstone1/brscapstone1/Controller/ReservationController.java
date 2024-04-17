package com.brscapstone1.brscapstone1.Controller;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
    
		@PostMapping("/add")
		public ReservationEntity addReservation(@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam("reservation") String reservationJson) throws IOException {
				System.out.println("Received file: " + (file != null ? file.getOriginalFilename() : "No file uploaded"));
				System.out.println("Received JSON: " + reservationJson);
				
				ObjectMapper objectMapper = new ObjectMapper();
				ReservationEntity reservation = objectMapper.readValue(reservationJson, ReservationEntity.class);
				
				System.out.println("Mapped reservation: " + reservation);
				
				return resServ.saveReservation(reservation, file);
		}

		@GetMapping("/reservations/download/{reservationId}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable int reservationId) {
        ReservationEntity reservation = resServ.getReservationById(reservationId);
        if (reservation == null || reservation.getFileName() == null) {
            return ResponseEntity.notFound().build();
        } 
        try {
            byte[] fileContent = resServ.getFileContent(reservation);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(reservation.getFileType()));
            headers.setContentDispositionFormData(reservation.getFileName(), reservation.getFileName());
            headers.setContentLength(reservation.getFileSize());
            return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/reservations")
    public List<ReservationEntity> getAllReservations(){
        return resServ.getAllReservations();
    }
}