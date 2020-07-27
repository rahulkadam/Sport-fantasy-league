package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.service.LeagueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/fantasy/league}")
public class LeagueController {

    @Autowired
    private LeagueService leagueService;

    @GetMapping(value = "/get/{id}")
    @ResponseBody
    public String getTeams(@PathVariable(name = "id") Integer leagueId) {
        return leagueService.getTeams(leagueId);
    }
}
