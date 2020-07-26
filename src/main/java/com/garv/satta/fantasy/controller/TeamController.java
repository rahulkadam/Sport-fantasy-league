package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dao.repository.TeamRepository;
import com.garv.satta.fantasy.dto.TeamDTO;
import com.garv.satta.fantasy.model.backoffice.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/fantasy/team")
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;

    @GetMapping(value = "/list")
    @ResponseBody
    public Iterable<Team> getTeams(@RequestParam(name = "tournament") Integer tournamentId) {
        return teamRepository.findAll();
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public TeamDTO CreateTeamForTournament(@RequestBody TeamDTO teamDTO ) {
        Team team = teamRepository.save(TeamDTO.getTeam(teamDTO));
        return new TeamDTO(team);

    }
}
