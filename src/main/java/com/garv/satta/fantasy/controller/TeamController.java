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
    public List<TeamDTO> getTeams() {
        List<TeamDTO> teamList = teamService.getTeams();
        return teamList;
    }

    @GetMapping(value = "/get/{id}")
    @ResponseBody
    public TeamDTO getTeamById(@PathVariable(name = "id") Long id) {
        TeamDTO team = teamService.getTeamsById(id);
        return team;
    }

    @GetMapping(value = "/list/tournamentDTO")
    @ResponseBody
    public List<TeamDTO> getTeams(@RequestParam(name = "id") Long tournamentId) {
        List<TeamDTO> teamList = teamService.getTeamsByTournamentId(tournamentId);
        return teamList;
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public TeamDTO CreateTeamForTournament(@RequestBody TeamDTO teamDTO ) {
        TeamDTO team = teamService.CreateTeamForTournament(teamDTO);
        return team;
    }
}
