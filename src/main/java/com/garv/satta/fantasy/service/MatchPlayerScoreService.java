package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.MatchPlayerScoreRepository;
import com.garv.satta.fantasy.dto.MatchPlayerScoreDTO;
import com.garv.satta.fantasy.dto.converter.MatchPlayerScoreConverter;
import com.garv.satta.fantasy.model.backoffice.MatchPlayerScore;
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

    public void uploadPlayerScoreforMatch(@RequestBody MatchPlayerScoreDTO dto) {
        MatchPlayerScore playerScore = converter.convertToFullEntity(dto);
        repository.save(playerScore);
    }

    public List<MatchPlayerScoreDTO> getMatchScoreByPlayer(Long id) {
        List<MatchPlayerScore> matchPlayerScores = repository.findMatchPlayerScoreByPlayerId(id);
        return converter.convertToDTOList(matchPlayerScores);
    }
}
