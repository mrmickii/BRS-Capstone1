package com.brscapstone1.brscapstone1.Service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.brscapstone1.brscapstone1.Entity.VehicleEntity;
import com.brscapstone1.brscapstone1.Repository.VehicleRepository;

@Service
public class VehicleService {

  @Autowired
  VehicleRepository vehicleRepository;

  public VehicleEntity post(VehicleEntity post){
    return vehicleRepository.save(post);
  }

  public List<VehicleEntity> vehicles(){
    return vehicleRepository.findAll();
  }

  public VehicleEntity update (int id, VehicleEntity newVehicle){
    VehicleEntity vehicle;

    try{
      vehicle = vehicleRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Vehicle with id " +id+ " does not exist"));
      vehicle.setName(newVehicle.getName());
      vehicle.setPlateNumber(newVehicle.getPlateNumber());
      vehicle.setCapacity(newVehicle.getCapacity());
      return vehicleRepository.save(vehicle);
    } catch(NoSuchElementException e){
      throw e;
    }
  }

  public String delete(int id){
    String msg = "";

    if(vehicleRepository.findById(id).isPresent()){
      vehicleRepository.deleteById(id);
      msg = "Vehicle with id " +id+ " successfully deleted.";
    }else{
      msg = "Vehicle with id " +id+ " does not exist.";
    }
    return msg;
  }
}
