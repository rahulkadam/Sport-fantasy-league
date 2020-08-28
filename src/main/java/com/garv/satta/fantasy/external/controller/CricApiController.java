package com.garv.satta.fantasy.external.controller;

import com.garv.satta.fantasy.external.DTO.MatchSquadCricDTO;
import com.garv.satta.fantasy.external.DTO.MatchSummaryCricDTO;
import com.garv.satta.fantasy.external.DTO.PlayerStatsCricDTO;
import com.garv.satta.fantasy.external.service.CricAPIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/process/criciapi")
public class CricApiController {

    @Autowired
    private CricAPIService service;

    @GetMapping(value = "/match/fantasysquad/{id}")
    @ResponseBody
    public MatchSquadCricDTO getMatchSquadDetails(@PathVariable(name = "id") Long matchId) {
        return service.getMatchSquadDetails(matchId);
    }

    @GetMapping(value = "/match/fantasysummary/{id}")
    @ResponseBody
    public List<PlayerStatsCricDTO> getMatchSummaryDetails(@PathVariable(name = "id") Long matchId) {
        return service.getMatchSummaryDetails(matchId);
    }
}
