package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.dto.TournamentDTO;
import com.garv.satta.fantasy.service.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/fantasy/tournament")
public class TournamentController {

    @Autowired
    private TournamentService tournamentService;

    @GetMapping(value = "/list")
    @ResponseBody
    public List<TournamentDTO> getTournamentList() {
        return tournamentService.getTournamentList();
    }

    @GetMapping(value = "/get/{id}")
    @ResponseBody
    public TournamentDTO getTournamentById(@PathVariable(name = "id") Long id) {
        return tournamentService.getTournamentById(id);
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public TournamentDTO createTournament(@RequestBody TournamentDTO tournamentDTO) {
        return tournamentService.createTournament(tournamentDTO);
    }

    @PostMapping(value = "/lockTournament")
    @ResponseBody
    public String lockTournament(@RequestBody RequestDTO dto) {
        tournamentService.lockTournament(dto);
        return "Tournament Locked successfully";
    }

    @PostMapping(value = "/unlockTournament")
    @ResponseBody
    public String unlockTournament(@RequestBody RequestDTO dto) {
        tournamentService.unlockTournament(dto);
        return "Tournament UnLocked successfully";
    }

}
