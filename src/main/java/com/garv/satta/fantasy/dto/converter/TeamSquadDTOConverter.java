package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.TeamSquadDTO;
import com.garv.satta.fantasy.model.backoffice.Team;
import com.garv.satta.fantasy.model.backoffice.TeamSquad;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TeamSquadDTOConverter extends Converter<TeamSquad, TeamSquadDTO> {
    @Override
    public TeamSquad convertToEntity(TeamSquadDTO dto) {
        return mapper.map(dto, TeamSquad.class);
    }

    @Override
    public TeamSquadDTO convertToDTO(TeamSquad entity) {
        return mapper.map(entity, TeamSquadDTO.class);
    }

    @Override
    public List<TeamSquadDTO> convertToDTOList(List<TeamSquad> list) {
        return null;
    }

    @Override
    public TeamSquad convertToFullEntity(TeamSquadDTO dto) {
        TeamSquad teamSquad = convertToEntity(dto);

        Long teamId = dto.getTeamId();
        Team team = new Team(teamId);
        teamSquad.setTeam(team);

        if (dto.getSquadLength() == null) {
            teamSquad.setSquadLength(15L);
        }

        return teamSquad;
    }

    @Override
    public TeamSquadDTO convertToFullDTO(TeamSquad entity) {
        TeamSquadDTO teamSquadDTO = convertToDTO(entity);
        teamSquadDTO.setTeamId(entity.getTeam().getId());
        return teamSquadDTO;
    }

    @Override
    public TeamSquad convertToShortEntity(TeamSquadDTO dto) {
        return null;
    }
}
