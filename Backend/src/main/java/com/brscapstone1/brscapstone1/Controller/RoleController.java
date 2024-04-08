package com.brscapstone1.brscapstone1.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.brscapstone1.brscapstone1.Entity.RoleEntity;
import com.brscapstone1.brscapstone1.Service.RoleService;

@RestController
@RequestMapping("/auth_role")
public class RoleController {

  @Autowired
  RoleService rolesService;

  @PostMapping("/post")
  public RoleEntity post(@RequestBody RoleEntity post){
    return rolesService.post(post);
  }

  @GetMapping("/roles")
  public List<RoleEntity> roles(){
    return rolesService.roles();
  }

  @DeleteMapping("/delete/{id}")
  public String delete(@PathVariable int id){
    return rolesService.delete(id);
  }

  @PutMapping("/update/{id}")
  public RoleEntity update(@PathVariable int id, @RequestBody RoleEntity newRoles){
    return rolesService.update(id, newRoles);
  }
}
