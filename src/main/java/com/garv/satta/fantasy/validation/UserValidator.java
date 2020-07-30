package com.garv.satta.fantasy.validation;

import com.garv.satta.fantasy.dao.repository.UserRepository;
import com.garv.satta.fantasy.exceptions.GenericException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserValidator {

    @Autowired
    private UserRepository userRepository;

    public void validateUserId(Long id) {
        if(!userRepository.existsById(id)) {
            throw new GenericException("User does not exist with Id :" + id);
        }
    }
}
