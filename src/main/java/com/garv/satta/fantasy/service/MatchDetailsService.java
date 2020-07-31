package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.MatchDetailsRepository;
import com.garv.satta.fantasy.dto.MatchDetailsDTO;
import com.garv.satta.fantasy.dto.converter.MatchDetailsConverter;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.backoffice.MatchDetails;
import com.garv.satta.fantasy.validation.MatchValidator;
import com.garv.satta.fantasy.validation.PlayerValidator;
import com.garv.satta.fantasy.validation.TeamValidator;
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

    @Autowired
    private TeamValidator teamValidator;

    @Autowired
    private PlayerValidator playerValidator;

    @Autowired
    private MatchValidator matchValidator;

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
        matchValidator.isTeamIdValidForMatch(detailsDTO.getMatchId(), detailsDTO.getTeam_winner_id());
        playerValidator.validatePlayerById(detailsDTO.getMatchPlayerId());
        teamValidator.validateTeamById(detailsDTO.getTeam_winner_id());
        repository.save(matchDetails);
    }
}
