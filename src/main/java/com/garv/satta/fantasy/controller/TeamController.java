package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.TeamDTO;
import com.garv.satta.fantasy.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/fantasy/team")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping(value = "/list")
    @ResponseBody
    public List<TeamDTO> getTeams(@RequestParam(name = "tournament") Integer tournamentId) {
        List<TeamDTO> teamList = teamService.getTeams(tournamentId);
        return teamList;
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public TeamDTO CreateTeamForTournament(@RequestBody TeamDTO teamDTO ) {
        TeamDTO team = teamService.CreateTeamForTournament(teamDTO);
        return team;
    }
}
