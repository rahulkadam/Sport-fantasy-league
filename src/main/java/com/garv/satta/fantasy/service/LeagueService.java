package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.LeagueRepository;
import com.garv.satta.fantasy.dao.repository.LeagueUserTeamRepository;
import com.garv.satta.fantasy.dto.LeagueDTO;
import com.garv.satta.fantasy.dto.converter.LeagueConverter;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.fantasyenum.OperationEnum;
import com.garv.satta.fantasy.model.frontoffice.League;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeagueService {

    @Autowired
    private LeagueRepository repository;

    @Autowired
    private LeagueConverter converter;

    @Autowired
    private LeagueUserTeamRepository leagueUserTeamRepository;

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

    public void addUserTeamToLeague(Long leagueId, Long userTeamId) {
        addRemoveUserTeamFromLeague(leagueId, userTeamId, OperationEnum.ADD);
    }

    public void removeUserTeamFromLeague(Long leagueId, Long userTeamId) {
        addRemoveUserTeamFromLeague(leagueId, userTeamId, OperationEnum.REMOVE);
    }

    /**
     * Function to add or remove UserTeam from League
     * @param leagueId
     * @param userTeamId
     * @param operation
     */
    private void addRemoveUserTeamFromLeague(Long leagueId, Long userTeamId, OperationEnum operation) {
        LeagueUserTeam userTeam = leagueUserTeamRepository.findLeagueUserTeamById(userTeamId);
        League league = repository.findLeagueById(leagueId);
        if (userTeam == null || league == null) {
            throw new GenericException("UserTeam Or League is not valid");
        }
        if (OperationEnum.ADD.equals(operation)) {
            league.addLeagueMembers(userTeam);
        } else {
            league.removeLeague(userTeam);
        }
        repository.save(league);
    }

}
