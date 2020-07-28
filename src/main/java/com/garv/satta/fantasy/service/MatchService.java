package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.MatchRepository;
import com.garv.satta.fantasy.dto.MatchDTO;
import com.garv.satta.fantasy.dto.converter.MatchConverter;
import com.garv.satta.fantasy.model.backoffice.Match;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchService {

    @Autowired
    private MatchRepository repository;

    @Autowired
    private MatchConverter converter;

    public List<MatchDTO> getMatchList() {
        List<Match> matches = repository.findAll();
        return converter.convertToDTOList(matches);
    }

    public MatchDTO getMatchById(Long id) {
        Match match = repository.findMatchById(id);
        return converter.convertToFullDTO(match);
    }

    public MatchDTO createMatch(MatchDTO matchDTO) {
        Match match = converter.convertToFullEntity(matchDTO);
        match = repository.save(match);
        return converter.convertToFullDTO(match);
    }
}
