package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.LeagueUserTeamDTO;
import com.garv.satta.fantasy.service.LeagueUserTeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/fantasy/userteam")
public class LeagueUserTeamController {

    @Autowired
    private LeagueUserTeamService service;

    @GetMapping(value = "/get/user/{id}")
    public LeagueUserTeamDTO getUserTeamByUser(@PathVariable(name = "id") Long id) {
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
}
