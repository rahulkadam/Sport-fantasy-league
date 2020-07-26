package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dao.repository.TeamRepository;
import com.garv.satta.fantasy.dto.TeamDTO;
import com.garv.satta.fantasy.dto.converter.TeamConverter;
import com.garv.satta.fantasy.model.backoffice.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/fantasy/team")
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    TeamConverter converter;

    @GetMapping(value = "/list")
    @ResponseBody
    public List<TeamDTO> getTeams(@RequestParam(name = "tournament") Integer tournamentId) {
        List<Team> teamList = (List) teamRepository.findAll();
        return converter.convertToDTOList(teamList);
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public TeamDTO CreateTeamForTournament(@RequestBody TeamDTO teamDTO ) {
        Team team = teamRepository.save(converter.convertToEntity(teamDTO));
        return converter.convertToDTO(team);
    }
}
