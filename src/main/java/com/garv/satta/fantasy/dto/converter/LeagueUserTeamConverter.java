package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.LeagueUserTeamDTO;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LeagueUserTeamConverter extends Converter<LeagueUserTeam, LeagueUserTeamDTO> {

    public LeagueUserTeam convertToEntity(LeagueUserTeamDTO dto) {
        return mapper.map(dto, LeagueUserTeam.class);
    }

    public LeagueUserTeamDTO convertToDTO(LeagueUserTeam entity) {
        return mapper.map(entity, LeagueUserTeamDTO.class);

    }

    public List<LeagueUserTeamDTO> convertToDTOList(List<LeagueUserTeam> entityList){
        return mapToDTOList(entityList, LeagueUserTeamDTO.class);
    }

}
