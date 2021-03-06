package com.garv.satta.fantasy.external.service;

import com.garv.satta.fantasy.dao.repository.MatchPlayerScoreRepository;
import com.garv.satta.fantasy.dao.repository.MatchRepository;
import com.garv.satta.fantasy.dao.repository.MatchResultRepository;
import com.garv.satta.fantasy.dao.repository.PlayerRepository;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.external.DTO.MatchPlayerScoreCricDTO;
import com.garv.satta.fantasy.external.DTO.converter.CricMatchPlayerScoreConverter;
import com.garv.satta.fantasy.external.DTO.cricinfo.CricInfoMatchData;
import com.garv.satta.fantasy.external.DTO.cricinfo.CricInfoMatchScore;
import com.garv.satta.fantasy.external.service.cricinfo.CricInfoService;
import com.garv.satta.fantasy.fantasyenum.MatchStateEnum;
import com.garv.satta.fantasy.model.backoffice.*;
import com.garv.satta.fantasy.service.CalculatePointsService;
import com.garv.satta.fantasy.service.FantasyErrorService;
import com.garv.satta.fantasy.service.MatchService;
import com.garv.satta.fantasy.service.TeamService;
import com.garv.satta.fantasy.service.admin.CacheService;
import com.garv.satta.fantasy.service.admin.FantasyConfigService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class CricMatchPlayerScoreService {

    @Autowired
    private MatchPlayerScoreRepository repository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private MatchService matchService;

    @Autowired
    private CricAPIService cricAPIService;

    @Autowired
    private FantasyErrorService errorService;

    @Autowired
    private CricMatchPlayerScoreConverter scoreConverter;

    @Autowired
    private CricInfoService cricInfoService;

    @Autowired
    private CalculatePointsService calculatePointsService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private FantasyConfigService fantasyConfigService;

    @Autowired
    private MatchResultRepository matchResultRepository;

    @Autowired
    private CacheService cacheService;

    private final String INIT_SCORE = "INIT_SCORE";
    private final String UPDATE_SCORE = "UPDATE_SCORE";

    public void updateMatchScoreFromCricAPI(Long matchId) {
        try {
            Match match = matchRepository.findMatchById(matchId);
            Assert.notNull(match, "Match Id is not Valid, " + matchId);
            updateMatchScoreFromCricAPI(match);
        } catch (Exception e) {
            throw new GenericException(e.getMessage());
        }
    }

    public void updateMatchScoreFromCricAPI(Match match) throws Exception {
        Long matchId = match.getId();
        Integer externalMatchId = match.getExternal_mid();
        Assert.notNull(externalMatchId, "External Id is Not Present for , " + matchId);
        String providerKey = fantasyConfigService.getLiveDataProviderKey();
        List<MatchPlayerScoreCricDTO> playerScoreDTOList = new ArrayList<>();
        CricInfoMatchData cricInfoMatchData = null;
        CricInfoMatchScore cricInfoMatchScore = null;

        if ("CRICINFO".equals(providerKey)) {
            cricInfoMatchData = cricInfoService.getMatchPlayerScore((long) externalMatchId);
            playerScoreDTOList = cricInfoMatchData.getMatchPlayerScoreCricDTOS();
            cricInfoMatchScore = cricInfoMatchData.getMatchScore();
            saveMatchScoreFromCricInfo(cricInfoMatchScore, match);
        } else {
            playerScoreDTOList = cricAPIService.getMatchSummaryDetails(externalMatchId);
        }
        saveMatchPlayerScoreFromCric(playerScoreDTOList, match, UPDATE_SCORE);
        completeMatch(cricInfoMatchScore, match);
        cacheService.clearLiveScoreCache();
    }

    public void initiateMatchPlayerSquadFromCricAPI(Long matchId) {
        Match match = matchRepository.findMatchById(matchId);
        Assert.notNull(match, "Match Id is not Valid, " + matchId);
        initiateMatchPlayerSquadFromCricAPI(match);
    }

    public void initiateMatchPlayerSquadFromCricAPI(Match match) {
        Long matchId = match.getId();
        Integer externalMatchId = match.getExternal_mid();
        Assert.notNull(externalMatchId, "External Id is Not Present for , " + matchId);
        List<MatchPlayerScoreCricDTO> playerScoreDTOList = cricAPIService.getPlayerSquadListForMatch(externalMatchId);
        saveMatchPlayerScoreFromCric(playerScoreDTOList, match, INIT_SCORE);
    }

    public void saveMatchPlayerScoreFromCric(List<MatchPlayerScoreCricDTO> playerScoreDTOList,
                                             Match match, String action) {

        if (CollectionUtils.isEmpty(playerScoreDTOList)) {
            return;
        }

        List<Integer> missingPlayerId = new ArrayList<>();
        List<Player> missingPlayerList = new ArrayList<>();

        List<MatchPlayerScore> matchPlayerScores = new ArrayList<>();
        playerScoreDTOList.stream().forEach(playerScore -> {
            Integer pid = playerScore.getPid();
            String name = playerScore.getName();
            try {
                Player player = null;
                if (pid != null && name != null) {
                    player = playerRepository.findPlayerByNameOrExternalpid(name, pid);
                }
                if (player == null) {
                    missingPlayerId.add(pid);
                    missingPlayerList.add(new Player(name, pid));
                    return;
                }
                if (player.getExternalpid() == null) {
                    player.setExternalpid(pid);
                    playerRepository.save(player);
                }
                Long playerId = player.getId();
                MatchPlayerScore matchPlayerScore = repository.findPlayerScoreByMatchIdAndPlayerId(match.getId(), playerId);
                if (matchPlayerScore == null) {
                    matchPlayerScore = new MatchPlayerScore(player, match);
                    if (INIT_SCORE.equals(action)) {
                        matchPlayerScore = scoreConverter.initiateMatchPlayerScore(matchPlayerScore);
                    }
                }
                if (UPDATE_SCORE.equals(action)) {
                    matchPlayerScore = scoreConverter.copyPlayerScoresDataFromCricDTO(matchPlayerScore, playerScore);
                }
                matchPlayerScores.add(matchPlayerScore);
            } catch (Exception e) {
                errorService.logMessage("PLAYER_UPDATE_SCORE ERROR", pid + " " + name);
                log.error("PLAYER_UPDATE_SCORE Error", e);
            }
        });
        repository.saveAll(matchPlayerScores);
        saveMissingPlayerInDB(missingPlayerList);
        if (CollectionUtils.isNotEmpty(missingPlayerId)) {
            errorService.logMessage("PLAYER_NOT_AVAILABLE", missingPlayerId.toString());
        }
    }

    /**
     * Adding and saving all player which are missed or not available in DB
     * @param playerList
     */
    public void saveMissingPlayerInDB(List<Player> playerList) {
        try {
            playerRepository.saveAll(playerList);
        } catch (Exception e) {
            errorService.logMessage("PLAYER_MISSING_SAVE_ERROR" , e.getMessage());
        }
    }

    public void saveMatchScoreFromCricInfo(CricInfoMatchScore cricInfoMatchScore, Match match) {
        try {
            MatchResult matchResult  = match.getMatchResult();
            if (matchResult ==  null) {
                matchResult = new MatchResult();
            }

            String firstTeamName = cricInfoMatchScore.getFirstTeam();
            String secondTeamName = cricInfoMatchScore.getSecondTeam();

            matchResult.setDescription(cricInfoMatchScore.getSummary());
            matchResult.setHometeamScore(firstTeamName + ":" + cricInfoMatchScore.getFirstTeamScore());
            matchResult.setAwayteamscore(secondTeamName + ":" + cricInfoMatchScore.getSecondTeamScore());
            matchResult.setTeam_winner(match.getTeam_host());
            matchResult.setMatch(match);
            matchResultRepository.save(matchResult);
        } catch (Exception e) {
            errorService.logMessage("save_match_score_result Error" , e.getMessage());
        }
    }

    public void completeMatch(CricInfoMatchScore cricInfoMatchScore, Match match) {
        try {
            if (cricInfoMatchScore == null) {
                return;
            }

            String matchSummary = cricInfoMatchScore.getSummary();
            boolean matchComplete = isMatchComplete(matchSummary);
            if (matchComplete) {
                match.setStatus(false);
                match.setState(MatchStateEnum.COMPLETED);
                matchService.saveMatch(match);
                fantasyConfigService.disableOtherUserTeamViewInLeague();
                if (matchSummary.contains("won")) {
                    calculatePointsService.processScoreAndRankingAfterMatch(match);
                }
            }
        } catch (Exception e) {
            log.error( "completeMatch: " + e.getMessage());
            errorService.logMessage("completeMatch Error" , e.getMessage());
        }
    }

    public boolean isMatchComplete(String summary) {
        if (summary != null){
            if(summary.contains("won") || summary.contains("result")
                    || summary.contains("Match drawn")
                    || summary.contains("Match tied")) {
                return true;
            }
        }
        return false;
    }

}
