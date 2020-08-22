package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.LeagueUserTeamScorePerMatchRepository;
import com.garv.satta.fantasy.dto.LeagueUserTeamScoreHistoryDTO;
import com.garv.satta.fantasy.dto.MatchPlayerScoreDTO;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.dto.converter.LeagueUserTeamScoreHistoryConverter;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeamScorePerMatch;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class LeagueUserTeamScorePerMatchService {

    @Autowired
    private LeagueUserTeamScorePerMatchRepository leagueUserTeamScorePerMatchRepository;

    @Autowired
    private LeagueUserTeamScoreHistoryConverter converter;

    @Autowired
    private MatchPlayerScoreService matchPlayerScoreService;

    public void saveLeagueUserTeamScorePerMatch(UserTeam userTeam, Match match, Integer matchPoint, Integer totalPoint) {

        LeagueUserTeamScorePerMatch leagueUserTeamScorePerMatch = new LeagueUserTeamScorePerMatch();
        leagueUserTeamScorePerMatch.setMatch(match);
        leagueUserTeamScorePerMatch.setUserTeam(userTeam);
        leagueUserTeamScorePerMatch.setTotalPoint(totalPoint);
        leagueUserTeamScorePerMatch.setCurrent_match_point(matchPoint);

        leagueUserTeamScorePerMatchRepository.save(leagueUserTeamScorePerMatch);
    }

    // save for al user Team at the start
    public void saveListAtMatchInit(List<UserTeam> userTeamList, Match match) {
        userTeamList.forEach(userTeam -> saveLeagueUserTeamAtMatchInit(userTeam, match));
    }

    public void saveLeagueUserTeamAtMatchInit(UserTeam userTeam, Match match) {
        long[] playerIds = userTeam.getPlayerIds().stream().mapToLong(l -> l).toArray();
        LeagueUserTeamScorePerMatch leagueUserTeamScorePerMatch = new LeagueUserTeamScorePerMatch();
        leagueUserTeamScorePerMatch.setMatch(match);
        leagueUserTeamScorePerMatch.setUserTeam(userTeam);
        leagueUserTeamScorePerMatch.setTotalPoint(userTeam.getTotal_score());
        leagueUserTeamScorePerMatch.setCurrent_match_point(0);
        leagueUserTeamScorePerMatch.setPlayerList(playerIds);
        if (userTeam.getCaptain_player() != null) {
            leagueUserTeamScorePerMatch.setCaptain_player(userTeam.getCaptain_player().getId());
        }
        leagueUserTeamScorePerMatchRepository.save(leagueUserTeamScorePerMatch);
    }

    public LeagueUserTeamScoreHistoryDTO getUserScorePerMatch(RequestDTO requestDTO) {
        Long userTeamId = requestDTO.getUserTeamId();
        Long matchId = requestDTO.getMatchId();
        LeagueUserTeamScorePerMatch leagueUserTeamScorePerMatch =
                leagueUserTeamScorePerMatchRepository.findTeamScoreByUserTeamIdAndMatchId(userTeamId, matchId);
        return converter.convertToFullDTO(leagueUserTeamScorePerMatch);
    }

    public List<MatchPlayerScoreDTO> getUserScorePerMatchStats(RequestDTO requestDTO) {
        Long userTeamId = requestDTO.getUserTeamId();
        Long matchId = requestDTO.getMatchId();
        LeagueUserTeamScorePerMatch leagueUserTeamScorePerMatch =
                leagueUserTeamScorePerMatchRepository.findTeamScoreByUserTeamIdAndMatchId(userTeamId, matchId);
        long[] playerIds = leagueUserTeamScorePerMatch.getPlayerList();
        return matchPlayerScoreService.getMatchScoreByPlayerIds(matchId, playerIds);
    }

    public LeagueUserTeamScorePerMatch findTeamScoreByUserTeamIdAndMatchId(Long userTeamId, Long matchId) {
        LeagueUserTeamScorePerMatch leagueUserTeamScorePerMatch =
                leagueUserTeamScorePerMatchRepository.findTeamScoreByUserTeamIdAndMatchId(userTeamId, matchId);
        return leagueUserTeamScorePerMatch;
    }

}
