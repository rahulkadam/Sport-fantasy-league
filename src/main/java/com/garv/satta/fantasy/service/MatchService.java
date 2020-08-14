package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.MatchRepository;
import com.garv.satta.fantasy.dto.MatchDTO;
import com.garv.satta.fantasy.dto.converter.MatchConverter;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.validation.TeamValidator;
import com.garv.satta.fantasy.validation.TournamentValidator;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class MatchService {

    @Autowired
    private MatchRepository repository;

    @Autowired
    private MatchConverter converter;

    @Autowired
    private TeamValidator teamValidator;

    @Autowired
    private TournamentValidator tournamentValidator;

    public List<MatchDTO> getMatchList() {
        List<Match> matches = repository.findAll();
        return converter.convertToFullDTOList(matches);
    }

    public List<MatchDTO> getUpComingMatchList() {
        DateTime currentTime = new DateTime();
        List<Match> matches = repository.findAll();
        return converter.convertToFullDTOList(matches);
    }

    public MatchDTO getMatchById(Long id) {
        Match match = repository.findMatchById(id);
        return converter.convertToFullDTO(match);
    }

    public MatchDTO createMatch(MatchDTO matchDTO) {
        Match match = converter.convertToFullEntity(matchDTO);
        match.setId(null);
        Long hostTeamId = matchDTO.getTeam_host_id();
        Long awayTeamId = matchDTO.getTeam_away_id();
        Long tournamentId = matchDTO.getTournament_id();

        teamValidator.validateTeamById(hostTeamId);
        teamValidator.validateTeamById(awayTeamId);
        tournamentValidator.validateTournamentById(tournamentId);

        List<Long> teamIdList = new ArrayList<>(Arrays.asList(awayTeamId, hostTeamId));
        tournamentValidator.validateTeamsInTournament(matchDTO.getTournament_id(), teamIdList);

        match = repository.save(match);
        return converter.convertToFullDTO(match);
    }
}
