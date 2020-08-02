package com.garv.satta.fantasy.validation;

import com.garv.satta.fantasy.dao.repository.TeamRepository;
import com.garv.satta.fantasy.dao.repository.TournamentRepository;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.model.backoffice.Team;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TournamentValidator {

    @Autowired
    private TournamentRepository repository;

    @Autowired
    private TeamRepository teamRepository;

    public void validateTournamentById(Long id) {
        if (!repository.existsById(id)) {
            throw new GenericException("Tournament is not exist with ID : " + id);
        }
    }


    public void validateTeamsInTournament(Long tournamentId , Long id) {
        List<Long> ids =  new ArrayList<>();
        ids.add(id);
        validateTeamsInTournament(tournamentId, ids);
    }

        public void validateTeamsInTournament(Long tournamentId , List<Long> teamIdList) {
        Tournament tournament = repository.findTournamentById(tournamentId);
        List<Team> teamList = tournament.getTeams();
        List<Long> tournamentTeamIds = teamList.stream().map(team -> team.getId()).collect(Collectors.toList());

        long emptyList = teamIdList.stream().filter(teamId -> tournamentTeamIds.contains(teamId)).count();

        if (emptyList == teamIdList.size()) {
            throw new GenericException("Team is not exist in Tournament : " + tournament + " team: " + teamIdList);
        }
    }

}
