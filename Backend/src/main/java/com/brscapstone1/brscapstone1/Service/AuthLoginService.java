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

  public AuthLoginEntity login(String email, String password) {
    return authRepo.findByEmailAndPassword(email, password);
  }
}
