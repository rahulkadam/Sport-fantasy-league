package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.TeamDTO;
import com.garv.satta.fantasy.model.backoffice.Team;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TeamConverter extends Converter<Team, TeamDTO> {

    public Team convertToEntity(TeamDTO teamDTO) {
        return mapper.map(teamDTO, Team.class);
    }

    public TeamDTO convertToDTO(Team team) {
        TeamDTO teamDTO =  mapper.map(team, TeamDTO.class);
        return teamDTO;
    }

    @Override
    public Team convertToFullEntity(TeamDTO dto) {
        Team team = convertToEntity(dto);
        List<Long> tournamentIds = dto.getTournamentIds();
        if (tournamentIds != null) {
            List<Tournament> tournamentList = tournamentIds.stream().map(tournamentId -> new Tournament(tournamentId)).collect(Collectors.toList());
            team.setTournament(tournamentList);
        }
        return team;
    }

    @Override
    public TeamDTO convertToFullDTO(Team entity) {
        TeamDTO teamDTO =  convertToDTO(entity);
        int totalPlayer = entity.getPlayers().size();
        teamDTO.setPlayerCount(totalPlayer);
        return teamDTO;
    }

    @Override
    public Team convertToShortEntity(TeamDTO dto) {
        return null;
    }

    public List<TeamDTO> convertToDTOList(List<Team> teamList){
        return mapToDTOList(teamList, TeamDTO.class);
    }

    public List<TeamDTO> convertToFullDTOList(List<Team> teamList){
        return teamList.stream()
                .map(entity -> convertToFullDTO(entity))
                .collect(Collectors.toList());
    }


}
