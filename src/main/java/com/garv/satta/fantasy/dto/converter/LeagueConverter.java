package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.LeagueDTO;
import com.garv.satta.fantasy.model.frontoffice.League;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LeagueConverter extends Converter<League, LeagueDTO> {

    public League convertToEntity(LeagueDTO dto) {
        return mapper.map(dto, League.class);
    }

    public LeagueDTO convertToDTO(League entity) {
        return mapper.map(entity, LeagueDTO.class);
    }

    public List<LeagueDTO> convertToDTOList(List<League> entityList) {
        return mapToDTOList(entityList, LeagueDTO.class);
    }

}
