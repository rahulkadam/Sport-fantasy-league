package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.GameDTO;
import com.garv.satta.fantasy.dto.PlayerCriteriaDTO;
import com.garv.satta.fantasy.dto.TeamCriteriaDTO;
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

    @GetMapping(value = "/get/byname/{name}")
    public GameDTO getGameByUserTeamId(@PathVariable(name = "name") String name) {
        return service.findGameByName(name);
    }


    @GetMapping(value = "/list")
    public List<GameDTO> getGameList() {
        return service.getGameList();
    }

    @GetMapping(value = "/short/list")
    public List<GameDTO> getGameShortList() {
        return service.getGameShortList();
    }

    @PostMapping(value = "/addTeamCriteria")
    public TeamCriteriaDTO addTeamCriteria(@RequestBody TeamCriteriaDTO teamCriteriaDTO) {
        return service.addTeamCriteria(teamCriteriaDTO);
    }

    @GetMapping(value = "/list/teamcriteria")
    public List<TeamCriteriaDTO> getTeamCriteriaList() {
        return service.getTeamCriteriaList();
    }

    @PostMapping(value = "/addPlayerCriteria")
    public PlayerCriteriaDTO addPlayerCriteria(@RequestBody PlayerCriteriaDTO playerCriteriaDTO) {
        return service.addPlayerCriteria(playerCriteriaDTO);
    }

    @GetMapping(value = "/list/playercriteria")
    public List<PlayerCriteriaDTO> getplayerCriteriaList() {
        return service.gePlayerCriteriaList();
    }

}
