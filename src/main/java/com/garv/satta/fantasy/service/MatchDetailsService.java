package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.MatchDetailsRepository;
import com.garv.satta.fantasy.dto.MatchDetailsDTO;
import com.garv.satta.fantasy.dto.converter.MatchDetailsConverter;
import com.garv.satta.fantasy.model.backoffice.MatchDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class MatchDetailsService {

    @Autowired
    private MatchDetailsRepository repository;

    @Autowired
    private MatchDetailsConverter converter;

    public MatchDetailsDTO getDetailsById(Long id) {
        MatchDetails matchDetails =  repository.findMatchDetailsById(id);
        return converter.convertToFullDTO(matchDetails);
    }

    public MatchDetailsDTO getDetailsByMatchId(@PathVariable(name = "id") Long id) {
        MatchDetails matchDetails =  repository.findMatchDetailsByMatchId(id);
        return converter.convertToFullDTO(matchDetails);
    }

    @Transactional
    public void uploadMatchResult(MatchDetailsDTO detailsDTO) {
        MatchDetails matchDetails = converter.convertToFullEntity(detailsDTO);
        repository.save(matchDetails);
    }
}