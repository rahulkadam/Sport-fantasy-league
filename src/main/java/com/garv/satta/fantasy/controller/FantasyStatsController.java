package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.LeagueUserTeamScoreHistoryDTO;
import com.garv.satta.fantasy.dto.MatchPlayerScoreDTO;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.service.LeagueUserTeamScorePerMatchService;
import com.garv.satta.fantasy.service.MatchPlayerScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/public/stats")
public class FantasyStatsController {

    @Autowired
    private MatchPlayerScoreService matchPlayerScoreService;

    @Autowired
    private LeagueUserTeamScorePerMatchService leagueUserTeamScorePerMatchService;

    @PostMapping(value = "/list/playerScoreByMatch")
    public List<MatchPlayerScoreDTO> getPlayerScoreByMatch(@RequestBody RequestDTO dto) {
        return matchPlayerScoreService.findMatchPlayerScoreByMatchId(dto.getId());
    }


    @PostMapping(value = "/list/playerScoringHistory")
    public List<MatchPlayerScoreDTO> getMatchScoreByPlayer(@RequestBody RequestDTO dto) {
        return matchPlayerScoreService.getMatchScoreByPlayer(dto.getId());
    }

    @PostMapping(value = "/list/userScoreHistoryByMatch")
    public LeagueUserTeamScoreHistoryDTO getUserScorePerMatch(@RequestBody RequestDTO dto) {
        return leagueUserTeamScorePerMatchService.getUserScorePerMatch(dto);
    }

}
