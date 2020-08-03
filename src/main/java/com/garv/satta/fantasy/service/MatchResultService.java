package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.MatchResultRepository;
import com.garv.satta.fantasy.dto.MatchResultDTO;
import com.garv.satta.fantasy.dto.converter.MatchResultConverter;
import com.garv.satta.fantasy.model.backoffice.MatchResult;
import com.garv.satta.fantasy.validation.MatchValidator;
import com.garv.satta.fantasy.validation.PlayerValidator;
import com.garv.satta.fantasy.validation.TeamValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.transaction.Transactional;

@Service
public class MatchResultService {

    @Autowired
    private MatchResultRepository repository;

    @Autowired
    private MatchResultConverter converter;

    @Autowired
    private TeamValidator teamValidator;

    @Autowired
    private PlayerValidator playerValidator;

    @Autowired
    private MatchValidator matchValidator;

    public MatchResultDTO getResultById(Long id) {
        MatchResult matchResult =  repository.findMatchResultById(id);
        return converter.convertToFullDTO(matchResult);
    }

    public MatchResultDTO getResultByMatchId(@PathVariable(name = "id") Long id) {
        MatchResult matchResult =  repository.findMatchResultByMatchId(id);
        return converter.convertToFullDTO(matchResult);
    }

    @Transactional
    public void uploadMatchResult(MatchResultDTO detailsDTO) {
        MatchResult matchResult = converter.convertToFullEntity(detailsDTO);
        matchValidator.isTeamIdValidForMatch(detailsDTO.getMatchId(), detailsDTO.getTeam_winner_id());
        matchValidator.validateResultExistforMatch(detailsDTO.getMatchId());
        playerValidator.validatePlayerById(detailsDTO.getMatchPlayerId());
        teamValidator.validateTeamById(detailsDTO.getTeam_winner_id());
        repository.save(matchResult);
    }
}
