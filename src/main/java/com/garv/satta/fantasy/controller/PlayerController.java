package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.PlayerDTO;
import com.garv.satta.fantasy.dto.converter.PlayerConverter;
import com.garv.satta.fantasy.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/fantasy/player")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private PlayerConverter playerConverter;


    @GetMapping(value = "/list")
    @ResponseBody
    public List<PlayerDTO> getPlayerList() {
        List<PlayerDTO> playerList =  (List)playerService.getPlayerList();
        return playerList;
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public PlayerDTO createPlayer(@RequestBody PlayerDTO playerDTO) {
        PlayerDTO player = playerService.createPlayer(playerDTO);
        return player;
    }
}
