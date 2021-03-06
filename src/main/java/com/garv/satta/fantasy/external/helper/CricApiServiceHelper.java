package com.garv.satta.fantasy.external.helper;

import com.garv.satta.fantasy.external.DTO.*;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CricApiServiceHelper {

    public final String TYPE_BATTING = "Batting";
    public final String TYPE_BOWLING = "Bowling";
    public final String TYPE_FIELDING = "Fielding";

    public Map<Integer, MatchPlayerScoreCricDTO> getPlayerScoreFromMatchSummary(MatchSummaryCricDTO summaryCricDTO) {

        MatchDataCricDTO data = summaryCricDTO.getData();
        Map<Integer, MatchPlayerScoreCricDTO> playerScoreCricDTOMap = getPlayersFromSquad(data.getTeam());
        List<PlayerTypeCricDto> batting = data.getBatting();
        List<PlayerTypeCricDto> bowling = data.getBowling();
        List<PlayerTypeCricDto> fielding = data.getFielding();
        playerScoreCricDTOMap = getPlayerMatchScore(batting, playerScoreCricDTOMap, TYPE_BATTING);
        playerScoreCricDTOMap = getPlayerMatchScore(bowling, playerScoreCricDTOMap, TYPE_BOWLING);
        playerScoreCricDTOMap = getPlayerMatchScore(fielding, playerScoreCricDTOMap, TYPE_FIELDING);
        return playerScoreCricDTOMap;
    }

    /**
     * Collecting Players Name from Squad
     *
     * @param teamSquads
     * @return
     */
    public Map<Integer, MatchPlayerScoreCricDTO> getPlayersFromSquad(List<SquadCricDTO> teamSquads) {
        Map<Integer, MatchPlayerScoreCricDTO> playerMapList = new HashMap<>();

        teamSquads.stream().forEach(squad -> {
            List<PlayerCricDTO> playerCricDTOList = squad.getPlayers();
            playerCricDTOList.stream().forEach(player -> {
                Integer pid = player.getPid();
                if (pid != null) {
                    MatchPlayerScoreCricDTO dto = new MatchPlayerScoreCricDTO();
                    dto.setPid(pid);
                    dto.setName(player.getName());
                    playerMapList.put(pid, dto);
                }
            });
        });
        return playerMapList;
    }


    /**
     * COllecting all other stats of players  , batting, bowling, fielding
     *
     * @param typeList    bowling , batting , fielding
     * @param playerMap
     * @param playingType
     * @return
     */
    public Map<Integer, MatchPlayerScoreCricDTO> getPlayerMatchScore(List<PlayerTypeCricDto> typeList, Map<Integer,
            MatchPlayerScoreCricDTO> playerMap, String playingType) {
        if (CollectionUtils.isEmpty(typeList)) {
            return playerMap;
        }

        typeList.stream().forEach(type -> {
            type.getScores().stream().forEach(player -> {
                Integer pid = player.getPid();
                MatchPlayerScoreCricDTO playerDto = playerMap.get(pid);
                if (playerDto != null) {
                    playerDto = copyPlayerScoreFromCricDto(playerDto, player, playingType);
                    playerMap.put(pid, playerDto);
                }
            });
        });
        return playerMap;
    }

    public MatchPlayerScoreCricDTO copyPlayerScoreFromCricDto(MatchPlayerScoreCricDTO to, MatchPlayerScoreCricDTO from, String type) {

        switch (type) {
            case TYPE_BATTING:
                to = copyBattingAttribute(to, from);
                break;
            case TYPE_BOWLING:
                to = copyBowlingAttribute(to, from);
                break;
            case TYPE_FIELDING:
                to = copyFieldingAttribute(to, from);
                break;
        }
        return to;
    }


    public Float parseFloatValue(Object value) {
        try {
            if (value == null) {
                return 0F;
            }
            return Float.valueOf(value.toString());
        } catch (Exception e) {
            return 0F;
        }
    }

    /**
     * COpy bowling attribute into player score
     * @param to
     * @param from
     * @return
     */
    private MatchPlayerScoreCricDTO copyBowlingAttribute(MatchPlayerScoreCricDTO to, MatchPlayerScoreCricDTO from) {
        Float overs = parseFloatValue(from.getOvers());
        if (overs == 0F) {
            return to;
        }
        to.setEconomy(from.getEconomy());
        to.setOvers(from.getOvers());
        to.setWicket(from.getWicket());
        to.setMaiden(from.getMaiden());
        to.setRuns_concede(from.getRuns_scored());
        to.setDot_balls(from.getDot_balls());
        return to;
    }

    /**
     * copy batting attribute into player score
     * @param to
     * @param from
     * @return
     */
    private MatchPlayerScoreCricDTO copyBattingAttribute(MatchPlayerScoreCricDTO to, MatchPlayerScoreCricDTO from) {
        to.setDismissed(from.getDismissed());
        to.setRuns_scored(from.getRuns_scored());
        to.setSixes(from.getSixes());
        to.setFours(from.getFours());
        to.setStrikeRate(from.getStrikeRate());
        to.setBalls(from.getBalls());
        return to;
    }

    /**
     * Copy Fielding attribute from Player score
     * @param to
     * @param from
     * @return
     */
    private MatchPlayerScoreCricDTO copyFieldingAttribute(MatchPlayerScoreCricDTO to, MatchPlayerScoreCricDTO from) {
        to.setCatches(from.getCatches());
        to.setStumped(from.getStumped());
        to.setRunout(from.getRunout());
        return to;
    }
}
