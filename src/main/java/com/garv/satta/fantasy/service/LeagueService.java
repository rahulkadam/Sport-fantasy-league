package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.LeagueRepository;
import com.garv.satta.fantasy.dto.LeagueDTO;
import com.garv.satta.fantasy.dto.converter.LeagueConverter;
import com.garv.satta.fantasy.model.frontoffice.League;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeagueService {

    @Autowired
    private LeagueRepository repository;

    @Autowired
    private LeagueConverter converter;

    public List<LeagueDTO> getLeaguesList() {
        List<League> leagues = repository.findAll();
        return converter.convertToDTOList(leagues);
    }

    public LeagueDTO getLeagueById(Long id) {
        League league = repository.findLeagueById(id);
        return converter.convertToFullDTO(league);
    }

    public LeagueDTO createLeague(LeagueDTO leagueDTO) {
        League league = converter.convertToFullEntity(leagueDTO);
        league = repository.save(league);
        return converter.convertToFullDTO(league);
    }

}
