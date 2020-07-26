package com.garv.satta.fantasy.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/fantasy/league}")
public class LeagueController {

    @GetMapping(value = "/get/{id}")
    @ResponseBody
    String getTeams(@PathVariable(name = "id") Integer leagueId) {
        return "League Details" + leagueId;
    }
}
