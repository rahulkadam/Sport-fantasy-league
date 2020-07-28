package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.MatchPlayerScoreDTO;
import com.garv.satta.fantasy.model.backoffice.MatchPlayerScore;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MatchPlayerScoreConverter extends Converter<MatchPlayerScore, MatchPlayerScoreDTO> {

    public MatchPlayerScore convertToEntity(MatchPlayerScoreDTO dto) {
        return mapper.map(dto, MatchPlayerScore.class);
    }

    public MatchPlayerScoreDTO convertToDTO(MatchPlayerScore entity) {
        return mapper.map(entity, MatchPlayerScoreDTO.class);
    }

    @Override
    public MatchPlayerScore convertToFullEntity(MatchPlayerScoreDTO dto) {
        return null;
    }

    @Override
    public MatchPlayerScoreDTO convertToFullDTO(MatchPlayerScore entity) {
        return null;
    }

    @Override
    public MatchPlayerScore convertToShortEntity(MatchPlayerScoreDTO dto) {
        return null;
    }

    public List<MatchPlayerScoreDTO> convertToDTOList(List<MatchPlayerScore> entityList) {
        return mapToDTOList(entityList, MatchPlayerScoreDTO.class);
    }
}
