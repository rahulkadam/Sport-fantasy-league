package com.garv.satta.fantasy.external.service;

import com.garv.satta.fantasy.external.DTO.*;
import com.garv.satta.fantasy.external.helper.CricApiServiceHelper;
import com.garv.satta.fantasy.external.restapi.CricAPIHttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CricAPIService {

    @Autowired
    private CricAPIHttpClient cricAPIHttpClient;

    @Autowired
    private CricPointCalculateService pointCalculateService;

    @Autowired
    private CricApiServiceHelper cricApiServiceHelper;

    public MatchSquadCricDTO getMatchSquadDetails(Integer matchId) {
        MatchSquadCricDTO matchSquadCricDTO = cricAPIHttpClient.getMatchSquadDetails(matchId);
        return matchSquadCricDTO;
    }

    public Map<Integer, MatchPlayerScoreCricDTO> getPlayerSquadMapForMatch(Integer matchId) {
        MatchSquadCricDTO matchSquadCricDTO = getMatchSquadDetails(matchId);
        Map<Integer, MatchPlayerScoreCricDTO> playerListMap =
                cricApiServiceHelper.getPlayersFromSquad(matchSquadCricDTO.getSquad());
        return playerListMap;
    }

    public List<MatchPlayerScoreCricDTO> getPlayerSquadListForMatch(Integer matchId) {
         Map<Integer, MatchPlayerScoreCricDTO> playerListMap = getPlayerSquadMapForMatch(matchId);
        return playerListMap.values().stream().collect(Collectors.toList());
    }

    /**
     * Function to fetch all match details, player scores from CricAPI
     * @param matchId
     * @return
     */
    public List<MatchPlayerScoreCricDTO> getMatchSummaryDetails(Integer matchId) {
        MatchSummaryCricDTO matchSummaryCricDTO = cricAPIHttpClient.getMatchSummaryDetails(matchId);
        Map<Integer, MatchPlayerScoreCricDTO> playerScoreDTOMap = cricApiServiceHelper.
                getPlayerScoreFromMatchSummary(matchSummaryCricDTO);
        playerScoreDTOMap = pointCalculateService.calculatePointForPlayers(playerScoreDTOMap);
        return playerScoreDTOMap.values().stream().collect(Collectors.toList());
    }

}
