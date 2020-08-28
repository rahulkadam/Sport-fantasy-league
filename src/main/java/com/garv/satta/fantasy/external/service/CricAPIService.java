package com.garv.satta.fantasy.external.service;

import com.garv.satta.fantasy.dto.reponsedto.PlayerStatsDTO;
import com.garv.satta.fantasy.external.DTO.*;
import com.garv.satta.fantasy.external.restapi.CricAPIHttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CricAPIService {

    @Autowired
    private CricAPIHttpClient cricAPIHttpClient;

    public MatchSquadCricDTO getMatchSquadDetails(Long matchId) {
        return cricAPIHttpClient.getMatchSquadDetails(matchId);

    }

    public List<PlayerStatsCricDTO> getMatchSummaryDetails(Long matchId) {
        MatchSummaryCricDTO matchSummaryCricDTO = cricAPIHttpClient.getMatchSummaryDetails(matchId);
        return collectPlayerScoreFromMatchSummary(matchSummaryCricDTO);
    }

    private List<PlayerStatsCricDTO> collectPlayerScoreFromMatchSummary(MatchSummaryCricDTO summaryCricDTO) {

        MatchDataCricDTO data = summaryCricDTO.getData();
        Map<Integer, PlayerStatsCricDTO> playerStatsCricDTOS = collectPlayersFromSquad(data.getTeam());
        List<PlayerTypeCricDto> batting = data.getBatting();
        List<PlayerTypeCricDto> bowling = data.getBowling();
        List<PlayerTypeCricDto> fielding = data.getFielding();
        playerStatsCricDTOS = collectBattingScore(batting, playerStatsCricDTOS);
        playerStatsCricDTOS = collectBowlingScore(bowling, playerStatsCricDTOS);
        playerStatsCricDTOS = collectFieldingScore(fielding, playerStatsCricDTOS);
        return playerStatsCricDTOS.values().stream().collect(Collectors.toList());
    }

    private Map<Integer, PlayerStatsCricDTO> collectPlayersFromSquad(List<SquadCricDTO> squadList) {
        Map<Integer, PlayerStatsCricDTO> playerMapList = new HashMap<>();

        squadList.stream().forEach(squad -> {
            List<PlayerCricDTO> playerCricDTOList = squad.getPlayers();
            playerCricDTOList.stream().forEach(player -> {
                playerMapList.put(player.getPid(), new PlayerStatsCricDTO(player.getPid(), player.getName()));
            });
        });
        return playerMapList;
    }

    private Map<Integer, PlayerStatsCricDTO> collectBowlingScore(List<PlayerTypeCricDto> typeList, Map<Integer, PlayerStatsCricDTO> playerMap) {

        typeList.stream().forEach(type -> {

            type.getScores().stream().forEach(player -> {
                PlayerStatsCricDTO playerDto = playerMap.get(player.getPid());
                if (playerDto == null) {
                    playerDto = new PlayerStatsCricDTO();
                }
                playerDto.setEconomy(player.getEconomy());
                playerDto.setOvers(player.getOvers());
                playerDto.setWickets(player.getWickets());
                playerDto.setMainden(player.getMainden());
                playerDto.setRuns_concede(player.getRuns_scored());
                playerMap.put(player.getPid(), playerDto);
            });
        });
        return playerMap;
    }

    private Map<Integer, PlayerStatsCricDTO> collectBattingScore(List<PlayerTypeCricDto> typeList, Map<Integer, PlayerStatsCricDTO> playerMap) {

        typeList.stream().forEach(type -> {

            type.getScores().stream().forEach(player -> {
                PlayerStatsCricDTO playerDto = playerMap.get(player.getPid());
                if (playerDto == null) {
                    playerDto = new PlayerStatsCricDTO();
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

    private Map<Integer, PlayerStatsCricDTO> collectFieldingScore(List<PlayerTypeCricDto> typeList, Map<Integer, PlayerStatsCricDTO> playerMap) {

        typeList.stream().forEach(type -> {

            type.getScores().stream().forEach(player -> {
                PlayerStatsCricDTO playerDto = playerMap.get(player.getPid());
                if (playerDto == null) {
                    playerDto = new PlayerStatsCricDTO();
                }
                playerDto.setCatches(player.getCatches());
                playerDto.setStumped(player.getStumped());
                playerDto.setRouout(player.getRouout());
                playerMap.put(player.getPid(), playerDto);
            });
        });
        return playerMap;
    }

}
