package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.LeagueDTO;
import com.garv.satta.fantasy.service.LeagueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/fantasy/league")
public class LeagueController {

    @Autowired
    private LeagueService leagueService;

    @GetMapping(value = "/list")
    @ResponseBody
    public List<LeagueDTO> getleagues() {
        return leagueService.getLeaguesList();
    }

    @GetMapping(value = "/get/{id}")
    @ResponseBody
    public LeagueDTO getLeagueById(@PathVariable(name = "id") Long id) {
        return leagueService.getLeagueById(id);
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public LeagueDTO createLeague(@RequestBody LeagueDTO leagueDTO) {
        return leagueService.createLeague(leagueDTO);
    }
}
