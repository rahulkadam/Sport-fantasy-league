package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.TeamCriteriaDTO;
import com.garv.satta.fantasy.model.backoffice.TeamCriteria;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class TeamCriteriaConverter extends Converter<TeamCriteria, TeamCriteriaDTO> {
    @Override
    public TeamCriteria convertToEntity(TeamCriteriaDTO dto) {
        return mapper.map(dto, TeamCriteria.class);
    }

    @Override
    public TeamCriteriaDTO convertToDTO(TeamCriteria entity) {
       return mapper.map(entity, TeamCriteriaDTO.class);
    }

    @Override
    public List<TeamCriteriaDTO> convertToDTOList(List<TeamCriteria> list) {
        return mapToDTOList(list, TeamCriteriaDTO.class);
    }

    @Override
    public TeamCriteria convertToFullEntity(TeamCriteriaDTO dto) {
        return null;
    }

    @Override
    public TeamCriteriaDTO convertToFullDTO(TeamCriteria entity) {
        return null;
    }

    @Override
    public TeamCriteria convertToShortEntity(TeamCriteriaDTO dto) {
        return null;
    }
}
