package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.*;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.model.backoffice.*;
import com.garv.satta.fantasy.model.frontoffice.League;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

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
    private PlayerUserTeamRepository playerUserTeamRepository;

    @Autowired
    private UserTeamRepository userTeamRepository;

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
        List<UserTeam> userTeams = findUserTeamByTournament(tournament.getId());
        List<MatchPlayerScore> matchPlayerScoreList = findMatchPlayerScoreByMatchId(id);
        Map<Long, MatchPlayerScore> matchPlayerScoreMap = getMapOfMatchPlayerScores(matchPlayerScoreList);
        processScoreUpdateforUserTeamsList(userTeams, matchPlayerScoreMap);
    }

    /**
     * Process for list of User Team
     * @param userTeams
     * @param matchPlayerScoreMap
     */
    private void processScoreUpdateforUserTeamsList(List<UserTeam> userTeams, Map<Long, MatchPlayerScore> matchPlayerScoreMap) {
        userTeams.forEach(userTeam -> processScoreUpdateforSingleUserTeam(userTeam, matchPlayerScoreMap));
    }

    /**
     * Calculating score  for User Team and updating UserTeam score
     * @param userTeam
     * @param matchPlayerScoreMap
     */
    @Transactional
    private void processScoreUpdateforSingleUserTeam(UserTeam userTeam, Map<Long, MatchPlayerScore> matchPlayerScoreMap) {
        List<Player> playerList = playerUserTeamRepository.findPlayerByUserTeam(userTeam);

        Player captainPlayer = userTeam.getCaptain_player();

        Integer score = userTeam.getTotal_score();
        if (score == null) {
            score = 0;
        }
        for (Player player: playerList) {
            MatchPlayerScore matchPlayerScore = matchPlayerScoreMap.get(player.getId());
            if (matchPlayerScore != null) {
                if (captainPlayer != null && captainPlayer.getId() == player.getId()) {
                    score = score + matchPlayerScore.getPointscore();
                }
                score = score + matchPlayerScore.getPointscore();
            }
        }
        userTeam.setTotal_score(score);
        userTeamRepository.save(userTeam);
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

    private List<UserTeam> findUserTeamByTournament(Long id) {
        List<UserTeam> userTeams = userTeamRepository.findUserTeamByTournamentId(id);
        return userTeams;
    }

    public void updateRankingForLeague(Long tournamentId) {
        List<League> leagueList = leagueRepository.findLeagueByTournamentId(tournamentId);
        leagueList.forEach(league -> {
            updateRankingForLeague(league);
        });
    }

    private void updateRankingForLeague(League league) {
        List<LeagueUserTeam> leagueUserTeams = league.getLeagueUserTeams();
        Collections.sort(leagueUserTeams, compareByTotalScore.reversed());
        int ranking = 1;
        for(LeagueUserTeam leagueUserTeam: leagueUserTeams) {
            leagueUserTeam.setUserrank(ranking);
            leagueUserTeam.setScore(leagueUserTeam.getUserTeam().getTotal_score());
            ranking ++;
        }
        leagueUserTeamRepository.saveAll(leagueUserTeams);
    }

    protected Comparator<LeagueUserTeam> compareByTotalScore = Comparator.comparing((o1) -> o1.getUserTeam().getTotal_score());
}
