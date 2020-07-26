package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dao.repository.PlayerRepository;
import com.garv.satta.fantasy.dto.PlayerDTO;
import com.garv.satta.fantasy.model.backoffice.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/fantasy/player")
public class PlayerController {

    @Autowired
    private PlayerRepository playerRepository;

    @GetMapping(value = "/list")
    @ResponseBody
    public Iterable<Player> getPlayerList() {
        return playerRepository.findAll();
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public Player createPlayer(@RequestBody PlayerDTO playerDTO) {
        Player player = PlayerDTO.convertFromDTO(playerDTO);
        return playerRepository.save(player);
    }
}
