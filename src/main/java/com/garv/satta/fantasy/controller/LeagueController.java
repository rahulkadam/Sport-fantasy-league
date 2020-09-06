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
    public String createLeague(@RequestBody LeagueDTO leagueDTO) {
        leagueService.createLeague(leagueDTO);
        return "League Created Successfuly";
    }

    @PostMapping(value = "/join/bycode")
    public String joinLeagueByCode(@RequestBody RequestDTO dto) {
        String leagueCode = dto.getLeagueCode();
        leagueService.joinLeagueByCode(leagueCode);
        return "League Joined successfully";
    }

    @GetMapping(value = "list/byuser/{id}")
    public List<LeagueDTO> getLeagueByUserId(@PathVariable(name = "id") Long id) {
        return leagueService.getLeagueByUserId(id);
    }

    @GetMapping(value = "list/public")
    public List<LeagueDTO> getLeagueByPublic() {
        return leagueService.getLeagueByPublic();
    }

}
