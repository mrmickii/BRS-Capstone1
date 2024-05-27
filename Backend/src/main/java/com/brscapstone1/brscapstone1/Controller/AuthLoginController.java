package com.brscapstone1.brscapstone1.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brscapstone1.brscapstone1.Entity.AuthLoginEntity;
import com.brscapstone1.brscapstone1.Service.AuthLoginService;

@RestController
@CrossOrigin
@RequestMapping("/auth_login")
public class AuthLoginController {
  
  @Autowired
  AuthLoginService authService;

  @PostMapping("/post")
  public AuthLoginEntity post(@RequestBody AuthLoginEntity post){
    return authService.post(post);
  }

  @GetMapping("/logins")
  public List<AuthLoginEntity> logins(){
    return authService.logins();
  }

  @PostMapping("/login")
  public AuthLoginEntity login(@RequestBody AuthLoginEntity loginRequest){
    return authService.login(loginRequest.getEmail(), loginRequest.getPassword(), loginRequest.getRole());
  }

  @PostMapping("/add-user")
  public AuthLoginEntity addUser(@RequestBody AuthLoginEntity user){
    return authService.addUser(user);
  }

  @GetMapping("/users")
  public List<AuthLoginEntity> getUsers(){
    return authService.getUsers();
  }
}

