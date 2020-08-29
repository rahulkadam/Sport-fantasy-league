package com.garv.satta.fantasy.external.controller;

import com.garv.satta.fantasy.external.DTO.MatchSquadCricDTO;
import com.garv.satta.fantasy.external.DTO.MatchPlayerScoreCricDTO;
import com.garv.satta.fantasy.external.service.CricAPIService;
import com.garv.satta.fantasy.external.service.CricMatchPlayerScoreService;
import com.garv.satta.fantasy.external.service.CricPointCalculateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/process/criciapi")
public class CricApiController {

    @Autowired
    private CricAPIService service;

    @Autowired
    private CricMatchPlayerScoreService cricMatchPlayerScoreService;

    @GetMapping(value = "/match/fantasysquad/{id}")
    @ResponseBody
    public MatchSquadCricDTO getMatchSquadDetails(@PathVariable(name = "id") Integer matchId) {
        return service.getMatchSquadDetails(matchId);
    }

    @GetMapping(value = "/match/fantasysummary/{id}")
    @ResponseBody
    public List<MatchPlayerScoreCricDTO> getMatchSummaryDetails(@PathVariable(name = "id") Integer matchId) {
        return service.getMatchSummaryDetails(matchId);
    }

    @GetMapping(value = "/match/update/score/{id}")
    @ResponseBody
    public String updateScoreFromCricAPIForMatch(@PathVariable(name = "id") Long matchId) {
        cricMatchPlayerScoreService.updateMatchScoreFromCricAPI(matchId);
        return "Score updated successfully from CricAPI for ," + matchId;
    }

    @GetMapping(value = "/match/initiate/squad/{id}")
    @ResponseBody
    public String initiateSquadFromCricAPIByMatchId(@PathVariable(name = "id") Long matchId) {
        cricMatchPlayerScoreService.initiateMatchPlayerSquadFromCricAPI(matchId);
        return "Match Squad Initiated successfully from CricAPI for ," + matchId;
    }

}
