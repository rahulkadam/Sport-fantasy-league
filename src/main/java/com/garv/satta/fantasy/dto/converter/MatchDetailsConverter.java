package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.MatchDetailsDTO;
import com.garv.satta.fantasy.model.backoffice.MatchDetails;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MatchDetailsConverter extends Converter<MatchDetails, MatchDetailsDTO> {

    public MatchDetails convertToEntity(MatchDetailsDTO dto) {
        return mapper.map(dto, MatchDetails.class);
    }

    public MatchDetailsDTO convertToDTO(MatchDetails entity) {
        return mapper.map(entity, MatchDetailsDTO.class);
    }

    @Override
    public MatchDetails convertToFullEntity(MatchDetailsDTO dto) {
        return null;
    }

    @Override
    public MatchDetailsDTO convertToFullDTO(MatchDetails entity) {
        return null;
    }

    @Override
    public MatchDetails convertToShortEntity(MatchDetailsDTO dto) {
        return null;
    }

    public List<MatchDetailsDTO> convertToDTOList(List<MatchDetails> entityList) {
        return mapToDTOList(entityList, MatchDetailsDTO.class);
    }

}
