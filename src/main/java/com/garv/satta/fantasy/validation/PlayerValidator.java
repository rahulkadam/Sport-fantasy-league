package com.garv.satta.fantasy.validation;

import com.garv.satta.fantasy.dao.repository.PlayerRepository;
import com.garv.satta.fantasy.exceptions.GenericException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerValidator {

    @Autowired
    private PlayerRepository repository;

    public void validatePlayerValue(Float value) {
        if (value == null || value > 10) {
            throw new GenericException("Value should not be more than 10");
        }
    }

    public boolean isPlayerExist(Long id) {
        return repository.existsById(id);
    }

    public void validatePlayerById(Long id) {
        Boolean exist = repository.existsById(id);
        if (!exist) {
            throw new GenericException("Player not exist with ID : " + id);
        }
    }

    public void validatePlayerScore(Integer score) {
        if (score == null) {
            throw new GenericException("Player Score/value should not be null");
        }
    }

}
