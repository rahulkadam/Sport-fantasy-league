package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.PlayerDTO;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.dto.converter.PlayerConverter;
import com.garv.satta.fantasy.service.UserTeamService;
import com.garv.satta.fantasy.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/fantasy/player")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private UserTeamService userTeamService;

    @Autowired
    private PlayerConverter playerConverter;

    @GetMapping(value = "/list")
    @ResponseBody
    public List<PlayerDTO> getPlayerList() {
        List<PlayerDTO> playerList =  playerService.getPlayerList();
        return playerList;
    }

    @GetMapping(value = "/list/byuser/{id}")
    @ResponseBody
    public List<PlayerDTO> getPlayerListByUserTeamId(@PathVariable(name = "id") Long id) {
        List<PlayerDTO> playerList =  userTeamService.getPlayerListByUserTeamId(id);
        return playerList;
    }


    @PostMapping(value = "/create")
    @ResponseBody
    public PlayerDTO createPlayer(@RequestBody PlayerDTO playerDTO) {
        PlayerDTO player = playerService.createPlayer(playerDTO);
        return player;
    }

    @PostMapping(value = "/add/team")
    public String addTeamToPlayer(@RequestBody RequestDTO dto) {
        Long playerId = dto.getAddTo();
        Long teamId = dto.getAdd();
        playerService.addTeamToPlayer(playerId, teamId);
        return "User Team added successfully";
    }

    @PostMapping(value = "/remove/team")
    public String removeTeamFromPlayer(@RequestBody RequestDTO dto) {
        Long playerId = dto.getRemoveFrom();
        Long teamId = dto.getRemove();
        playerService.removeTeamFromPlayer(playerId, teamId);
        return "User Team Removed successfully";
    }
}
