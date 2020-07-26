package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.TeamDTO;
import com.garv.satta.fantasy.model.backoffice.Team;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TeamConverter extends Converter<Team, TeamDTO> {

    public Team convertToEntity(TeamDTO teamDTO) {
        return mapper.map(teamDTO, Team.class);
    }

    public TeamDTO convertToDTO(Team team) {
        TeamDTO teamDTO =  mapper.map(team, TeamDTO.class);
        return teamDTO;
    }

    public List<TeamDTO> convertToDTOList(List<Team> teamList){
        return mapToDTOList(teamList, TeamDTO.class);
    }

}
