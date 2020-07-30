package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.LeagueUserTeamDTO;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.service.LeagueUserTeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/fantasy/userteam")
public class LeagueUserTeamController {

    @Autowired
    private LeagueUserTeamService service;

    @GetMapping(value = "/get/user/{id}")
    public List<LeagueUserTeamDTO> getUserTeamByUser(@PathVariable(name = "id") Long id) {
        return service.getUserTeamByUser(id);
    }

    @GetMapping(value = "/get/{id}")
    public LeagueUserTeamDTO getUserTeamById(@PathVariable(name = "id") Long id) {
        return service.getUserTeamById(id);
    }

    @PostMapping(value = "/create")
    public LeagueUserTeamDTO createUserTeam(@RequestBody LeagueUserTeamDTO dto) {
        return service.createLeagueUserTeam(dto);
    }

    @PostMapping(value = "/add/player")
    public String addPlayerToUserTeam(@RequestBody RequestDTO dto) {
        Long leagueuserTeamId = dto.getAddTo();
        Long playerId = dto.getAdd();
        service.addPlayerToUserTeam(leagueuserTeamId, playerId);
        return "Player added successfully";
    }

    @PostMapping(value = "/remove/player")
    public String removePlayerFromUserTeam(@RequestBody RequestDTO dto) {
        Long leagueuserTeamId = dto.getRemoveFrom();
        Long playerId = dto.getRemove();
        service.removePlayerFromUserTeam(leagueuserTeamId, playerId);
        return "Player Removed successfully";
    }
}
