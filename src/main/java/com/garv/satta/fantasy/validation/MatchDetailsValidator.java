package com.garv.satta.fantasy.validation;

import com.garv.satta.fantasy.dao.repository.MatchDetailsRepository;
import com.garv.satta.fantasy.exceptions.GenericException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MatchDetailsValidator {

    @Autowired
    private MatchDetailsRepository repository;

    public void validateMatchDetailsId(Long id) {
        if (!repository.existsById(id)) {
            throw new GenericException("Match Details is Not exist with Id : " + id);
        }
    }


}
