package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.UserTeamDTO;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.service.UserTeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/fantasy/userteam")
public class UserTeamController {

    @Autowired
    private UserTeamService service;

    @GetMapping(value = "/get/user/{id}")
    public List<UserTeamDTO> getUserTeamByUser(@PathVariable(name = "id") Long id) {
        return service.getUserTeamByUser(id);
    }

    @GetMapping(value = "/get/{id}")
    public UserTeamDTO getUserTeamById(@PathVariable(name = "id") Long id) {
        return service.getUserTeamById(id);
    }

    @PostMapping(value = "/create")
    public UserTeamDTO createUserTeam(@RequestBody UserTeamDTO dto) {
        return service.createUserTeam(dto);
    }

    @PostMapping(value = "/add/player")
    public String addPlayerToUserTeam(@RequestBody RequestDTO dto) {
        service.addPlayerToUserTeam(dto);
        return "Player added successfully";
    }

    @PostMapping(value = "/remove/player")
    public String removePlayerFromUserTeam(@RequestBody RequestDTO dto) {
        Long userTeamId = dto.getRemoveFrom();
        Long playerId = dto.getRemove();
        service.removePlayerFromUserTeam(userTeamId, playerId);
        return "Player Removed successfully";
    }
}
