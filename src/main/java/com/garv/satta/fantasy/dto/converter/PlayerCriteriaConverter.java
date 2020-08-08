package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.PlayerCriteriaDTO;
import com.garv.satta.fantasy.model.backoffice.PlayerCriteria;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PlayerCriteriaConverter extends Converter<PlayerCriteria, PlayerCriteriaDTO> {
    @Override
    public PlayerCriteria convertToEntity(PlayerCriteriaDTO dto) {
        return mapper.map(dto, PlayerCriteria.class);
    }

    @Override
    public PlayerCriteriaDTO convertToDTO(PlayerCriteria entity) {
        return mapper.map(entity, PlayerCriteriaDTO.class);
    }

    @Override
    public List<PlayerCriteriaDTO> convertToDTOList(List<PlayerCriteria> list) {
        return mapToDTOList(list, PlayerCriteriaDTO.class);
    }

    @Override
    public PlayerCriteria convertToFullEntity(PlayerCriteriaDTO dto) {
        return null;
    }

    @Override
    public PlayerCriteriaDTO convertToFullDTO(PlayerCriteria entity) {
        return null;
    }

    @Override
    public PlayerCriteria convertToShortEntity(PlayerCriteriaDTO dto) {
        return null;
    }
}
