package com.hr.PolicyChecker.Services;

import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class CommonOperations {
    //Login Token
    public String generateLoginToken(String username){
        return Base64.getEncoder().encodeToString(username.getBytes());
    }
}
