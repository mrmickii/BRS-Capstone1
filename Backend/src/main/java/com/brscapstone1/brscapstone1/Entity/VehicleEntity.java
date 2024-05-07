package com.brscapstone1.brscapstone1.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "vehicle")
public class VehicleEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String name;
  private String plateNumber;
  private int capacity;
  
  public int getId() {
    return id;
  }
  public void setId(int id) {
    this.id = id;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getPlateNumber() {
    return plateNumber;
  }
  public void setPlateNumber(String plateNumber) {
    this.plateNumber = plateNumber;
  }
  public int getCapacity() {
    return capacity;
  }
  public void setCapacity(int capacity) {
    this.capacity = capacity;
  }
  public VehicleEntity(String name, String plateNumber, int capacity) {
    this.name = name;
    this.plateNumber = plateNumber;
    this.capacity = capacity;
  }
  public VehicleEntity() {
    super();
  }
}
