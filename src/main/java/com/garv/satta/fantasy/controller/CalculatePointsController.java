package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.service.CalculatePointsService;
import com.garv.satta.fantasy.service.UserTeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value = "/process/point")
public class CalculatePointsController extends BaseController {

    @Autowired
    private CalculatePointsService service;

    @Autowired
    private UserTeamService userTeamService;

    @GetMapping(value = "/bymatch/{id}")
    public String calculateByMatchId(@PathVariable(name = "id") Long id) {
        service.calculateByMatchId(id);
        return "Points calculated and updated successfully for match : "+ id;
    }

    @GetMapping(value = "/league/ranking/tournament/{id}")
    public String updateLeagueRankingByTournament(@PathVariable(name = "id") Long id) {
        service.updateRankingForLeague(id);
        return "Ranking calculated and updated successfully for Tournament : "+ id;
    }

    @GetMapping(value = "/calculate/point/user/{id}")
    public String calculatePointforUserFromForTournament(@PathVariable(name = "id") Long id) {
        userTeamService.calculatePointforUserFromForTournament(id);
        return "Score calculated for user and updated successfully ";
    }

}
