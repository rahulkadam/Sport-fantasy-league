package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.LeagueUserTeamRepository;
import com.garv.satta.fantasy.dto.LeagueUserTeamDTO;
import com.garv.satta.fantasy.dto.converter.LeagueUserTeamConverter;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LeagueUserTeamService {

    @Autowired
    private LeagueUserTeamRepository repository;


    @Autowired
    private LeagueUserTeamConverter converter;

    public LeagueUserTeamDTO getUserTeamByUser(Long id) {
        LeagueUserTeam leagueUserTeam =  repository.findLeagueUserTeamByUserId(id);
        return converter.convertToDTO(leagueUserTeam);
    }

    public LeagueUserTeamDTO getUserTeamById(Long id) {
        LeagueUserTeam leagueUserTeam = repository.findLeagueUserTeamById(id);
        return converter.convertToDTO(leagueUserTeam);
    }

    public LeagueUserTeamDTO createLeagueUserTeam(LeagueUserTeamDTO userTeamDTO) {

        LeagueUserTeam leagueUserTeam = converter.convertToEntity(userTeamDTO);
        leagueUserTeam = repository.save(leagueUserTeam);
        return converter.convertToDTO(leagueUserTeam);
    }

}
