package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.GameDTO;
import com.garv.satta.fantasy.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/fantasy/game")
public class GameController {

    @Autowired
    private GameService service;

    @PostMapping(value = "/create")
    public GameDTO createGame(@RequestBody GameDTO gameDTO) {
        return service.createGame(gameDTO);
    }

    @GetMapping(value = "/get/{id}")
    public GameDTO getGameById(@PathVariable(name = "id") Long id) {
        return service.findGameById(id);
    }

    @GetMapping(value = "/list")
    public List<GameDTO> getGameList() {
        return service.getGameList();
    }
}
