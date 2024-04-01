package com.brscapstone1.brscapstone1.Entity;

import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ReservationEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String typeOfTrip;
	private String destinationTo;
	private String destinationFrom;
	private int capacity;
	private String department;
	private Date schedule;
	private String vehicleType;
	private String pickUpTime;
	private String departureTime;
	private String reason;
	
	public String getTypeOfTrip() {
		return typeOfTrip;
	}
	public void setTypeOfTrip(String typeOfTrip) {
		this.typeOfTrip = typeOfTrip;
	}
	public String getDestinationTo() {
		return destinationTo;
	}
	public void setDestinationTo(String destinationTo) {
		this.destinationTo = destinationTo;
	}
	public String getDestinationFrom() {
		return destinationFrom;
	}
	public void setDestinationFrom(String destinationFrom) {
		this.destinationFrom = destinationFrom;
	}
	public int getCapacity() {
		return capacity;
	}
	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public Date getSchedule() {
		return schedule;
	}
	public void setSchedule(Date schedule) {
		this.schedule = schedule;
	}
	public String getVehicleType() {
		return vehicleType;
	}
	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}
	public String getPickUpTime() {
	    return pickUpTime;
	}
	public void setPickUpTime(String pickUpTime) {
	    this.pickUpTime = pickUpTime;
	}
	public String getDepartureTime() {
		return departureTime;
	}
	public void setDepartureTime(String departureTime) {
		this.departureTime = departureTime;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public ReservationEntity(String typeOfTrip, String destinationTo, String destinationFrom, int capacity,
			String department, Date schedule, String vehicleType, String pickUp, String departureTime,
			String reason) {
		super();
		this.typeOfTrip = typeOfTrip;
		this.destinationTo = destinationTo;
		this.destinationFrom = destinationFrom;
		this.capacity = capacity;
		this.department = department;
		this.schedule = schedule;
		this.vehicleType = vehicleType;
		this.pickUpTime = pickUp;
		this.departureTime = departureTime;
		this.reason = reason;
	}
	public ReservationEntity() {
		super();
	}
}