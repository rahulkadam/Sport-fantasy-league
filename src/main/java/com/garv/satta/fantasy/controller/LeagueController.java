package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.LeagueDTO;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.service.LeagueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
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

    @PostMapping(value = "/add/userteam")
    public String addUserTeamToLeague(@RequestBody RequestDTO dto) {
        Long leagueId = dto.getAddTo();
        Long userTeamID = dto.getAdd();
        leagueService.addUserTeamToLeague(leagueId, userTeamID);
        return "User Team added successfully";
    }

    @PostMapping(value = "/join/bycode")
    public String joinLeagueByCode(@RequestBody RequestDTO dto) {
        String leagueCode = dto.getLeagueCode();
        Long userTeamID = dto.getAdd();
        leagueService.joinLeagueByCode(leagueCode, userTeamID);
        return "League Joined successfully";
    }

    @PostMapping(value = "/remove/userteam")
    public String removeUserTeamFromLeague(@RequestBody RequestDTO dto) {
        Long leagueId = dto.getRemoveFrom();
        Long userTeamID = dto.getRemove();
        leagueService.removeUserTeamFromLeague(leagueId, userTeamID);
        return "User Team Removed successfully";
    }

    @GetMapping(value = "list/byuser/{id}")
    public List<LeagueDTO> getLeagueByUserId(@PathVariable(name = "id") Long id) {
        return leagueService.getLeagueByUserId(id);


    }

}
