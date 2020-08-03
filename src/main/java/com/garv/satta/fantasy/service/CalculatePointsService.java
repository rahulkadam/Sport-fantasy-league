package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.*;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.model.backoffice.*;
import com.garv.satta.fantasy.model.frontoffice.League;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CalculatePointsService {


    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private LeagueRepository leagueRepository;

    @Autowired
    private MatchResultRepository matchResultRepository;

    @Autowired
    private MatchPlayerScoreRepository matchPlayerScoreRepository;

    @Autowired
    private LeagueUserTeamRepository leagueUserTeamRepository;

    /**
     * Calculate Score for each team after Match By Match ID
     * @param id
     */
    public void calculateByMatchId(Long id) {
        Match match = matchRepository.findMatchById(id);
        if (match == null) {
            throw new GenericException("Match id is Not Valid" + id);
        }
        Tournament tournament = match.getTournament();
        List<LeagueUserTeam> leagueUserTeams = findLeagueUserTeamByTournament(tournament.getId());
        List<MatchPlayerScore> matchPlayerScoreList = findMatchPlayerScoreByMatchId(id);
        Map<Long, MatchPlayerScore> matchPlayerScoreMap = getMapOfMatchPlayerScores(matchPlayerScoreList);
        processScoreUpdateforUserTeamsList(leagueUserTeams, matchPlayerScoreMap);
    }

    /**
     * Process for list of User Team
     * @param leagueUserTeams
     * @param matchPlayerScoreMap
     */
    private void processScoreUpdateforUserTeamsList(List<LeagueUserTeam> leagueUserTeams, Map<Long, MatchPlayerScore> matchPlayerScoreMap) {
        leagueUserTeams.forEach(leagueUserTeam -> processScoreUpdateforSingleUserTeam(leagueUserTeam, matchPlayerScoreMap));
    }

    /**
     * Calculating score  for User Team and updating UserTeam score
     * @param leagueUserTeam
     * @param matchPlayerScoreMap
     */
    @Transactional
    private void processScoreUpdateforSingleUserTeam(LeagueUserTeam leagueUserTeam, Map<Long, MatchPlayerScore> matchPlayerScoreMap) {
        List<Player> playerList = leagueUserTeam.getTeamPlayers();

        Player captainPlayer = leagueUserTeam.getCaptain_player();

        Integer score = leagueUserTeam.getTotal_score();
        if (score == null) {
            score = 0;
        }
        for (Player player: playerList) {
            MatchPlayerScore matchPlayerScore = matchPlayerScoreMap.get(player.getId());
            if (matchPlayerScore != null) {
                if (captainPlayer.getId() == player.getId()) {
                    score = score + matchPlayerScore.getPointscore();
                }
                score = score + matchPlayerScore.getPointscore();
            }
        }
        leagueUserTeam.setTotal_score(score);
        leagueUserTeamRepository.save(leagueUserTeam);
    }

    private List<MatchPlayerScore> findMatchPlayerScoreByMatchId(Long matchId) {
        List<MatchPlayerScore> matchPlayerScores = matchPlayerScoreRepository.findMatchPlayerScoreByMatchId(matchId);
        return matchPlayerScores;
    }

    private Map<Long, MatchPlayerScore> getMapOfMatchPlayerScores(List<MatchPlayerScore> matchPlayerScoreList) {
        Map<Long, MatchPlayerScore> map = new HashMap<>();
        matchPlayerScoreList.stream().forEach(matchPlayerScore -> map.put(matchPlayerScore.getPlayer().getId(), matchPlayerScore));
        return map;
    }

    private List<LeagueUserTeam> findLeagueUserTeamByTournament(Long id) {
        List<League> leagueList = leagueRepository.findLeagueByTournamentId(id);
        List<LeagueUserTeam> leagueUserTeams = new ArrayList<>();
        leagueList.forEach(league -> leagueUserTeams.addAll(league.getLeagueMembers()));
        return leagueUserTeams;
    }
}
