package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dao.repository.PlayerRepository;
import com.garv.satta.fantasy.dto.PlayerDTO;
import com.garv.satta.fantasy.dto.converter.PlayerConverter;
import com.garv.satta.fantasy.model.backoffice.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/fantasy/player")
public class PlayerController {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private PlayerConverter playerConverter;


    @GetMapping(value = "/list")
    @ResponseBody
    public List<PlayerDTO> getPlayerList() {
        List<Player> playerList =  (List)playerRepository.findAll();
        return playerConverter.convertToDTOList(playerList);
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public PlayerDTO createPlayer(@RequestBody PlayerDTO playerDTO) {
        Player player = playerConverter.convertToEntity(playerDTO);
        player = playerRepository.save(player);
        return playerConverter.convertToDTO(player);
    }
}
