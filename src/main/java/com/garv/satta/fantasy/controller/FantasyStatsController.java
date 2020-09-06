package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.LeagueUserTeamScoreHistoryDTO;
import com.garv.satta.fantasy.dto.MatchDTO;
import com.garv.satta.fantasy.dto.MatchPlayerScoreDTO;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.service.LeagueUserTeamScorePerMatchService;
import com.garv.satta.fantasy.service.MatchPlayerScoreService;
import com.garv.satta.fantasy.service.MatchService;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/public/stats")
public class FantasyStatsController {

    @Autowired
    private MatchPlayerScoreService matchPlayerScoreService;

    @Autowired
    private MatchService matchService;

    @Autowired
    private LeagueUserTeamScorePerMatchService leagueUserTeamScorePerMatchService;

    @PostMapping(value = "/list/playerScoreByMatch")
    public List<MatchPlayerScoreDTO> getPlayerScoreByMatch(@RequestBody RequestDTO dto) {
        return matchPlayerScoreService.findMatchPlayerScoreByMatchId(dto.getId());
    }

    @PostMapping(value = "/list/playerScoreByLiveMatch")
    public List<MatchPlayerScoreDTO> getPlayeScoreByLiveMatch() {
        List<MatchDTO> matchDTOS = matchService.getLiveMatches();
        if (CollectionUtils.isEmpty(matchDTOS)) {
            return new ArrayList<>();
        }
        long[] matchIds = matchDTOS.stream().mapToLong(matchDTO -> matchDTO.getId()).toArray();
        if (matchIds.length > 0) {
            return matchPlayerScoreService.findMatchPlayerScoreByMatchIdIn(matchIds);
        }
        return new ArrayList<>();
    }

    @PostMapping(value = "/list/playerScoringHistory")
    public List<MatchPlayerScoreDTO> getMatchScoreByPlayer(@RequestBody RequestDTO dto) {
        return matchPlayerScoreService.getMatchScoreByPlayer(dto.getId());
    }

    @PostMapping(value = "/list/userScoreHistoryByMatch1")
    public LeagueUserTeamScoreHistoryDTO getUserScorePerMatch(@RequestBody RequestDTO dto) {
        return leagueUserTeamScorePerMatchService.getUserScorePerMatch(dto);
    }

    @PostMapping(value = "/list/userScoreHistoryByMatch")
    public List<MatchPlayerScoreDTO> getUserScorePerMatchStats(@RequestBody RequestDTO dto) {
        return leagueUserTeamScorePerMatchService.getUserScorePerMatchStats(dto);
    }

}
