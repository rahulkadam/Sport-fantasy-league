package com.garv.satta.fantasy.validation;

import com.garv.satta.fantasy.dao.repository.TeamRepository;
import com.garv.satta.fantasy.exceptions.GenericException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamValidator {
    @Autowired
    private TeamRepository repository;

    public void validateTeamById(Long id) {
        if(!repository.existsById(id)) {
            throw new GenericException("Team is not exist with ID : " + id);
        }
    }
}
