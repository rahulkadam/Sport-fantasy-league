package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dao.repository.TournamentRepository;
import com.garv.satta.fantasy.dto.TournamentDTO;
import com.garv.satta.fantasy.dto.converter.TournamentConverter;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/fantasy/tournament")
public class TournamentController {

    @Autowired
    private TournamentRepository tournamentRepository;

    @Autowired
    private TournamentConverter tournamentConverter;

    @GetMapping(value = "/list")
    @ResponseBody
    public List<TournamentDTO> getTournementList() {
        List<Tournament> tournamentList =  (List) tournamentRepository.findAll();
        return tournamentConverter.convertToDTOList(tournamentList);
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public TournamentDTO createTournament(@RequestBody Tournament tournament) {
        Tournament tournament1 =  tournamentRepository.save(tournament);
        return tournamentConverter.convertToDTO(tournament);
    }
}
