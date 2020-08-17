package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.LeagueUserTeamScorePerMatchRepository;
import com.garv.satta.fantasy.dto.LeagueUserTeamScoreHistoryDTO;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.dto.converter.LeagueUserTeamScoreHistoryConverter;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeamScorePerMatch;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeagueUserTeamScorePerMatchService {

    @Autowired
    private LeagueUserTeamScorePerMatchRepository leagueUserTeamScorePerMatchRepository;

    @Autowired
    private LeagueUserTeamScoreHistoryConverter converter;

    public void saveLeagueUserTeamScorePerMatch(UserTeam userTeam, Match match, Integer matchPoint, Integer totalPoint) {

        LeagueUserTeamScorePerMatch leagueUserTeamScorePerMatch = new LeagueUserTeamScorePerMatch();
        leagueUserTeamScorePerMatch.setMatch(match);
        leagueUserTeamScorePerMatch.setUserTeam(userTeam);
        leagueUserTeamScorePerMatch.setTotalPoint(totalPoint);
        leagueUserTeamScorePerMatch.setCurrent_match_point(matchPoint);

        leagueUserTeamScorePerMatchRepository.save(leagueUserTeamScorePerMatch);
    }

    public List<LeagueUserTeamScoreHistoryDTO> getUserScorePerMatch(RequestDTO requestDTO) {
        Long userTeamId = requestDTO.getUserTeamId();
        Long matchId = requestDTO.getMatchId();
        List<LeagueUserTeamScorePerMatch> leagueUserTeamScorePerMatches =
                leagueUserTeamScorePerMatchRepository.findAllByUserTeamIdAndMatchId(userTeamId, matchId);
        return converter.convertToDTOList(leagueUserTeamScorePerMatches);
    }

}
