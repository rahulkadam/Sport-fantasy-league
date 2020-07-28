package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.dto.TeamSquadDTO;
import com.garv.satta.fantasy.service.TeamSquadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/fantasy/teamsquad")
public class TeamSquadController {

    @Autowired
    private TeamSquadService service;

    @PostMapping(value = "/createsquad")
    public TeamSquadDTO createTeamSquad(@RequestBody TeamSquadDTO dto) {
        return service.createTeamSquad(dto);
    }

    @GetMapping(value = "/get/team/{id}")
    public TeamSquadDTO getSquadByTeamId(@PathVariable(name = "id") Long id) {
        return service.findSquadByTeamId(id);
    }

    @PostMapping(value = "/add/player")
    public String addPlayerToTeamSquad(@RequestBody RequestDTO dto) {
        Long playerId = dto.getAdd();
        Long squadId = dto.getAddTo();
        service.addPlayerToSquad(squadId, playerId);
        return "Player added successfully to squad";
    }

    @PostMapping(value = "/remove/player")
    public String removePlayerFromTeamSquad(@RequestBody RequestDTO dto) {
        Long playerId = dto.getRemove();
        Long squadId = dto.getRemoveFrom();
        service.removePlayerFromSquad(squadId, playerId);
        return "Player Removed successfully from squad";
    }

}
