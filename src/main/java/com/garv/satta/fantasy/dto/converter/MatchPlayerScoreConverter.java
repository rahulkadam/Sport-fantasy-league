package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.MatchPlayerScoreDTO;
import com.garv.satta.fantasy.model.backoffice.MatchDetails;
import com.garv.satta.fantasy.model.backoffice.MatchPlayerScore;
import com.garv.satta.fantasy.model.backoffice.Player;
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
        MatchPlayerScore matchPlayerScore = convertToEntity(dto);

        Player player = new Player(dto.getPlayerId());
        matchPlayerScore.setPlayer(player);

        MatchDetails matchDetails = new MatchDetails(dto.getMatchDetailsId());
        matchPlayerScore.setMatchDetails(matchDetails);

        return matchPlayerScore;
    }

    @Override
    public MatchPlayerScoreDTO convertToFullDTO(MatchPlayerScore entity) {
        MatchPlayerScoreDTO matchPlayerScoreDTO = convertToDTO(entity);

        matchPlayerScoreDTO.setPlayerId(entity.getPlayer().getId());
        matchPlayerScoreDTO.setMatchDetailsId(entity.getMatchDetails().getId());
        return matchPlayerScoreDTO;
    }

    @Override
    public MatchPlayerScore convertToShortEntity(MatchPlayerScoreDTO dto) {
        return null;
    }

    public List<MatchPlayerScoreDTO> convertToDTOList(List<MatchPlayerScore> entityList) {
        return mapToDTOList(entityList, MatchPlayerScoreDTO.class);
    }
}
