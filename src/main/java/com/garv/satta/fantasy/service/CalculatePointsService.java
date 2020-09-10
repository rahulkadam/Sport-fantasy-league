package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.*;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.model.backoffice.*;
import com.garv.satta.fantasy.model.frontoffice.League;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeamScorePerMatch;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Slf4j
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
    private MatchPlayerScoreService matchPlayerScoreService;

    @Autowired
    private PlayerUserTeamRepository playerUserTeamRepository;

    @Autowired
    private UserTeamRepository userTeamRepository;

    @Autowired
    private LeagueUserTeamRepository leagueUserTeamRepository;

    @Autowired
    private LeagueUserTeamScorePerMatchService leagueUserTeamScorePerMatchService;

    @Autowired
    private LeagueUserTeamScorePerMatchRepository leagueUserTeamScorePerMatchRepository;

    /**
     * Calculate Score for each team after Match By Match ID
     *
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
        processScoreUpdateforUserTeamsList(userTeams, matchPlayerScoreMap, match);
    }

    /**
     * Process for list of User Team
     *
     * @param userTeams
     * @param matchPlayerScoreMap
     */
    private void processScoreUpdateforUserTeamsList(List<UserTeam> userTeams, Map<Long, MatchPlayerScore> matchPlayerScoreMap, Match match) {
        userTeams.forEach(userTeam -> processScoreUpdateforSingleUserTeam(userTeam, matchPlayerScoreMap, match));
    }

    /**
     * Calculating score  for User Team and updating UserTeam score
     *
     * @param userTeam
     * @param matchPlayerScoreMap
     */
    @Transactional
    private void processScoreUpdateforSingleUserTeam(UserTeam userTeam, Map<Long, MatchPlayerScore> matchPlayerScoreMap, Match match) {
        LeagueUserTeamScorePerMatch leagueUserTeamScorePerMatch = leagueUserTeamScorePerMatchRepository.
                findTeamScoreByUserTeamIdAndMatchId(userTeam.getId(), match.getId());
        long[] playerListIds = null;
        if (leagueUserTeamScorePerMatch == null) {
            playerListIds = userTeam.getPlayerIds().stream().mapToLong(l-> l).toArray();
            leagueUserTeamScorePerMatch = new LeagueUserTeamScorePerMatch();
            leagueUserTeamScorePerMatch.setUserTeam(userTeam);
            leagueUserTeamScorePerMatch.setPlayerList(playerListIds);
            Player captainPlayer = userTeam.getCaptain_player();
            if (captainPlayer != null) {
                leagueUserTeamScorePerMatch.setCaptain_player(captainPlayer.getId());
            }
            leagueUserTeamScorePerMatch.setMatch(match);
        }

        Long captainPlayerId = leagueUserTeamScorePerMatch.getCaptain_player();
        playerListIds = leagueUserTeamScorePerMatch.getPlayerList();

        Integer matchScore = 0;
        if (playerListIds == null) {
            return;
        }
        for (long playerId : playerListIds) {
            MatchPlayerScore matchPlayerScore = matchPlayerScoreMap.get(playerId);
            if (matchPlayerScore != null) {
                if (captainPlayerId != null && captainPlayerId == playerId) {
                    matchScore = matchScore + matchPlayerScore.getPointscore();
                }
                matchScore = matchScore + matchPlayerScore.getPointscore();
            }
        }

        Integer currentUserTeamscore = userTeam.getTotal_score();
        Integer totalScore = matchScore;
        if (currentUserTeamscore != null) {
            totalScore = totalScore + currentUserTeamscore;
            userTeam.setLast_score(currentUserTeamscore);
        } else {
            userTeam.setLast_score(0);
        }

        userTeam.setTotal_score(totalScore);
        leagueUserTeamScorePerMatch.setTotalPoint(totalScore);
        leagueUserTeamScorePerMatch.setCurrent_match_point(matchScore);
        leagueUserTeamScorePerMatchRepository.save(leagueUserTeamScorePerMatch);
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

    public void resetToLastScore(RequestDTO dto) {
        userTeamRepository.resetToLastScoreByTournamentId(dto.getId());
    }

    private void updateRankingForLeague(League league) {
        List<LeagueUserTeam> leagueUserTeams = league.getLeagueUserTeams();
        Collections.sort(leagueUserTeams, compareByTotalScore.reversed());
        int ranking = 1;
        for (LeagueUserTeam leagueUserTeam : leagueUserTeams) {
            leagueUserTeam.setUserrank(ranking);
            leagueUserTeam.setScore(leagueUserTeam.getUserTeam().getTotal_score());
            ranking++;
        }
        leagueUserTeamRepository.saveAll(leagueUserTeams);
    }


    public void initializeMatchForTournament(RequestDTO dto) {
        Long matchId = dto.getMatchId();
        Match match = matchRepository.findMatchById(matchId);
        if (match == null) {
            throw new GenericException("Match id is Not Valid" + matchId);
        }
        Boolean matchInitialize = matchPlayerScoreService.isMatchAlreadyInitialize(matchId);
        Assert.isTrue(!matchInitialize, "Match is initialize already ," + matchId);
        Set<Long> matchPlayingPlayers = match.getTeam_host().getPlayerIds();
        matchPlayingPlayers.addAll(match.getTeam_away().getPlayerIds());
        Tournament tournament = match.getTournament();
        // Saving team players
        matchPlayerScoreService.saveInitPlayerScoreForMatch(matchId, tournament.getId(), matchPlayingPlayers);
    }

    public void initUserScoreForMatch(RequestDTO dto) {
        Long matchId = dto.getMatchId();
        Match match = matchRepository.findMatchById(matchId);
        if (match == null) {
            throw new GenericException("Match id is Not Valid" + matchId);
        }
        initUserScoreForMatch(match);
    }


    @Transactional
    public void initUserScoreForMatch(Match match) {
        try {
            Long matchId = match.getId();
            Boolean isInitialized = leagueUserTeamScorePerMatchService.isLeagueUserInitializeForMatch(matchId);
            Assert.isTrue(!isInitialized, "Match is initialize already ," + matchId);
            Tournament tournament = match.getTournament();
            List<UserTeam> userTeams = findUserTeamByTournament(tournament.getId());
            leagueUserTeamScorePerMatchService.saveListAtMatchInit(userTeams, match);
        } catch (Exception e) {
            log.error("Init user score error : " + e.getMessage());
        }
    }

    protected Comparator<LeagueUserTeam> compareByTotalScore = Comparator.comparing((o1) -> o1.getUserTeam().getTotal_score());
}
