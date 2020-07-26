package com.garv.satta.fantasy.dto;

import com.garv.satta.fantasy.model.backoffice.Team;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
public class TeamDTO implements Serializable {

    private Long id;
    private String name;
    private String country;
    private String owner;
    private TournamentDTO tournamentDTO;

    public TeamDTO() { }

    public TeamDTO(Team team) {
        this.id = team.getId();
        this.name = team.getName();
        this.country = team.getCountry();
        this.owner = team.getOwner();
        this.tournamentDTO = new TournamentDTO(team.getTournament());
    }

    public static Team getTeam(TeamDTO dto) {
        Team team = new Team();
        team.setId(dto.getId());
        team.setCountry(dto.getCountry());
        team.setName(dto.getName());
        team.setOwner(dto.getOwner());
        team.setTournament(TournamentDTO.getTournament(dto.getTournamentDTO()));
        return team;
    }

    public static List<TeamDTO> convertToDTOSet(List<Team> teamSet) {

        List<TeamDTO> teamDTOS = new ArrayList<>();
        teamSet.forEach(team -> {
            teamDTOS.add(new TeamDTO(team));
        });
        return teamDTOS;
    }

    public static List<Team> convertFromDTOSet(List<TeamDTO> teamDTOSet) {

        List<Team> teamSet = new ArrayList<>();
        teamDTOSet.forEach(team -> {
            teamSet.add(TeamDTO.getTeam(team));
        });
        return teamSet;
    }
}
