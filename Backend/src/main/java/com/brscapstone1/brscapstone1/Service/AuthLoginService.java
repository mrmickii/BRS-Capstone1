package com.brscapstone1.brscapstone1.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.brscapstone1.brscapstone1.Entity.AuthLoginEntity;
import com.brscapstone1.brscapstone1.Repository.AuthLoginRepository;

@Service
public class AuthLoginService {

  @Autowired
  AuthLoginRepository authRepo;

  public AuthLoginEntity post(AuthLoginEntity post) {
    return authRepo.save(post);
  }

  public List<AuthLoginEntity> logins(){
    return authRepo.findAll();
  }

  public AuthLoginEntity addUser(AuthLoginEntity user) {
    return authRepo.save(user);
  }

  public AuthLoginEntity login(String email, String password, String role) {
    AuthLoginEntity user = authRepo.findByEmailAndPassword(email, password);
    if (user != null && user.getRole().equalsIgnoreCase(role)) {
        return user;
    }
    return null;
  }

  public List<AuthLoginEntity> getUsers(){
    return authRepo.findAll();
  }
}

