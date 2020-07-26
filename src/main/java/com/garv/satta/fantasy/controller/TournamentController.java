package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dao.repository.TournamentRepository;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/fantasy/tournament")
public class TournamentController {

    @Autowired
    private TournamentRepository tournamentRepository;

    @GetMapping(value = "/list")
    @ResponseBody
    public Iterable<Tournament> getTournementList() {
        return tournamentRepository.findAll();
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public Tournament createTournament(@RequestBody Tournament tournament) {
        Tournament tournament1 =  tournamentRepository.save(tournament);
        return tournament;
    }
}
