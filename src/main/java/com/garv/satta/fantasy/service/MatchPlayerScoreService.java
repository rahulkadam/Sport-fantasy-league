package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.MatchPlayerScoreRepository;
import com.garv.satta.fantasy.dto.MatchPlayerScoreDTO;
import com.garv.satta.fantasy.dto.converter.MatchPlayerScoreConverter;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.model.backoffice.MatchPlayerScore;
import com.garv.satta.fantasy.validation.MatchDetailsValidator;
import com.garv.satta.fantasy.validation.MatchValidator;
import com.garv.satta.fantasy.validation.PlayerValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class MatchPlayerScoreService {

    @Autowired
    private MatchPlayerScoreRepository repository;

    @Autowired
    private MatchPlayerScoreConverter converter;

    @Autowired
    private PlayerValidator playerValidator;

    @Autowired
    private MatchDetailsValidator matchDetailsValidator;

    @Autowired
    private MatchValidator matchValidator;

    public void uploadPlayerScoreforMatch(@RequestBody MatchPlayerScoreDTO dto) {
        MatchPlayerScore playerScore = converter.convertToFullEntity(dto);
        playerScore.setId(null);
        playerValidator.validatePlayerById(dto.getPlayerId());
        matchValidator.validateMatchById(dto.getMatchId());
        playerValidator.validatePlayerScore(playerScore.getPointscore());
        repository.save(playerScore);
    }

    public List<MatchPlayerScoreDTO> getMatchScoreByPlayer(Long id) {
        List<MatchPlayerScore> matchPlayerScores = repository.findMatchPlayerScoreByPlayerId(id);
        return converter.convertToDTOList(matchPlayerScores);
    }
}
