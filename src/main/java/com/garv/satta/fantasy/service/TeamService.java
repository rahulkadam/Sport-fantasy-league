package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.TeamRepository;
import com.garv.satta.fantasy.dto.TeamDTO;
import com.garv.satta.fantasy.dto.converter.TeamConverter;
import com.garv.satta.fantasy.model.backoffice.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    TeamConverter converter;

    public List<TeamDTO> getTeams(Integer tournamentId) {
        List<Team> teamList = (List) teamRepository.findAll();
        return converter.convertToDTOList(teamList);
    }

    public TeamDTO CreateTeamForTournament(TeamDTO teamDTO ) {
        Team team = teamRepository.save(converter.convertToEntity(teamDTO));
        return converter.convertToDTO(team);
    }
}
