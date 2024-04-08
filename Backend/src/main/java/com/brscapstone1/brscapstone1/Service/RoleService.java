package com.brscapstone1.brscapstone1.Service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.brscapstone1.brscapstone1.Entity.RoleEntity;
import com.brscapstone1.brscapstone1.Repository.RoleRepository;

@Service
public class RoleService {
  
  @Autowired
  RoleRepository rolesRepo;

  public RoleEntity post(RoleEntity post){
    return rolesRepo.save(post);
  }

  public List<RoleEntity> roles(){
    return rolesRepo.findAll();
  }

  public String delete(int id){
    String msg = "";

    if(rolesRepo.findById(id).isPresent()){
      rolesRepo.deleteById(id);
      msg = "Roles with id " +id+ " successfully deleted.";
    }else{
      msg = "Roles with id " +id+ " does not exist.";
    }
    return msg;
  }

  public RoleEntity update(int id, RoleEntity newRoles){
    RoleEntity roles;

    try{
      roles = rolesRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Roles with id " +id+ " does not exist."));
      roles.setrole(newRoles.getrole());
      return rolesRepo.save(roles);
    }catch (NoSuchElementException e){
      throw e;
    }
  }
}
