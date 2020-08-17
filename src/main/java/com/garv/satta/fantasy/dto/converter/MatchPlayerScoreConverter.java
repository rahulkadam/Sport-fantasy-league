package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.MatchPlayerScoreDTO;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.backoffice.MatchPlayerScore;
import com.garv.satta.fantasy.model.backoffice.Player;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

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

        Match match = new Match(dto.getMatchId());
        matchPlayerScore.setMatch(match);

        return matchPlayerScore;
    }

    @Override
    public MatchPlayerScoreDTO convertToFullDTO(MatchPlayerScore entity) {
        MatchPlayerScoreDTO matchPlayerScoreDTO = convertToDTO(entity);

        Player player = entity.getPlayer();
        Match match = entity.getMatch();

        matchPlayerScoreDTO.setPlayerId(player.getId());
        matchPlayerScoreDTO.setPlayerName(player.getName());
        matchPlayerScoreDTO.setMatchId(match.getId());
        matchPlayerScoreDTO.setMatchDescription(match.getDescription());
        return matchPlayerScoreDTO;
    }

    @Override
    public MatchPlayerScore convertToShortEntity(MatchPlayerScoreDTO dto) {
        return null;
    }

    public List<MatchPlayerScoreDTO> convertToDTOList(List<MatchPlayerScore> entityList) {
        return mapToDTOList(entityList, MatchPlayerScoreDTO.class);
    }

    public List<MatchPlayerScoreDTO> convertToFullDTOList(List<MatchPlayerScore> entityList) {
        return entityList.stream()
                .map(entity -> convertToFullDTO(entity))
                .collect(Collectors.toList());
    }
}
