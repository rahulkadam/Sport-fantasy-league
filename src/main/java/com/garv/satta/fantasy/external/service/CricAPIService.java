package com.garv.satta.fantasy.external.service;

import com.garv.satta.fantasy.external.DTO.*;
import com.garv.satta.fantasy.external.restapi.CricAPIHttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CricAPIService {

    @Autowired
    private CricAPIHttpClient cricAPIHttpClient;

    @Autowired
    private CricPointCalculateService pointCalculateService;

    public MatchSquadCricDTO getMatchSquadDetails(Integer matchId) {
        return cricAPIHttpClient.getMatchSquadDetails(matchId);

    }

    public List<MatchPlayerScoreCricDTO> getMatchSummaryDetails(Integer matchId) {
        MatchSummaryCricDTO matchSummaryCricDTO = cricAPIHttpClient.getMatchSummaryDetails(matchId);
        return collectPlayerScoreFromMatchSummary(matchSummaryCricDTO);
    }

    private List<MatchPlayerScoreCricDTO> collectPlayerScoreFromMatchSummary(MatchSummaryCricDTO summaryCricDTO) {

        MatchDataCricDTO data = summaryCricDTO.getData();
        Map<Integer, MatchPlayerScoreCricDTO> playerScoreCricDTOMap = collectPlayersFromSquad(data.getTeam());
        List<PlayerTypeCricDto> batting = data.getBatting();
        List<PlayerTypeCricDto> bowling = data.getBowling();
        List<PlayerTypeCricDto> fielding = data.getFielding();
        playerScoreCricDTOMap = collectBattingScore(batting, playerScoreCricDTOMap);
        playerScoreCricDTOMap = collectBowlingScore(bowling, playerScoreCricDTOMap);
        playerScoreCricDTOMap = collectFieldingScore(fielding, playerScoreCricDTOMap);
        playerScoreCricDTOMap = pointCalculateService.calculatePointForPlayers(playerScoreCricDTOMap);
        return playerScoreCricDTOMap.values().stream().collect(Collectors.toList());
    }

    private Map<Integer, MatchPlayerScoreCricDTO> collectPlayersFromSquad(List<SquadCricDTO> squadList) {
        Map<Integer, MatchPlayerScoreCricDTO> playerMapList = new HashMap<>();

        squadList.stream().forEach(squad -> {
            List<PlayerCricDTO> playerCricDTOList = squad.getPlayers();
            playerCricDTOList.stream().forEach(player -> {
                playerMapList.put(player.getPid(), new MatchPlayerScoreCricDTO(player.getPid(), player.getName()));
            });
        });
        return playerMapList;
    }

    private Map<Integer, MatchPlayerScoreCricDTO> collectBowlingScore(List<PlayerTypeCricDto> typeList, Map<Integer, MatchPlayerScoreCricDTO> playerMap) {

        typeList.stream().forEach(type -> {

            type.getScores().stream().forEach(player -> {
                MatchPlayerScoreCricDTO playerDto = playerMap.get(player.getPid());
                if (playerDto == null) {
                    playerDto = new MatchPlayerScoreCricDTO();
                }
                playerDto.setEconomy(player.getEconomy());
                playerDto.setOvers(player.getOvers());
                playerDto.setWicket(player.getWicket());
                playerDto.setMaiden(player.getMaiden());
                playerDto.setRuns_concede(player.getRuns_scored());
                playerDto.setDot_balls(player.getDot_balls());
                playerMap.put(player.getPid(), playerDto);
            });
        });
        return playerMap;
    }

    private Map<Integer, MatchPlayerScoreCricDTO> collectBattingScore(List<PlayerTypeCricDto> typeList, Map<Integer, MatchPlayerScoreCricDTO> playerMap) {

        typeList.stream().forEach(type -> {

            type.getScores().stream().forEach(player -> {
                MatchPlayerScoreCricDTO playerDto = playerMap.get(player.getPid());
                if (playerDto == null) {
                    playerDto = new MatchPlayerScoreCricDTO();
                }
                playerDto.setRuns_scored(player.getRuns_scored());
                playerDto.setSixes(player.getSixes());
                playerDto.setFours(player.getFours());
                playerDto.setStrikeRate(player.getStrikeRate());
                playerDto.setBalls(player.getBalls());
                playerMap.put(player.getPid(), playerDto);
            });
        });
        return playerMap;
    }

    private Map<Integer, MatchPlayerScoreCricDTO> collectFieldingScore(List<PlayerTypeCricDto> typeList, Map<Integer, MatchPlayerScoreCricDTO> playerMap) {

        typeList.stream().forEach(type -> {

            type.getScores().stream().forEach(player -> {
                MatchPlayerScoreCricDTO playerDto = playerMap.get(player.getPid());
                if (playerDto == null) {
                    playerDto = new MatchPlayerScoreCricDTO();
                }
                playerDto.setCatches(player.getCatches());
                playerDto.setStumped(player.getStumped());
                playerDto.setRunout(player.getRunout());
                playerMap.put(player.getPid(), playerDto);
            });
        });
        return playerMap;
    }

}
