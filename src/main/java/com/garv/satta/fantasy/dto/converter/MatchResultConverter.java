package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.MatchResultDTO;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.backoffice.MatchResult;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.backoffice.Team;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MatchResultConverter extends Converter<MatchResult, MatchResultDTO> {

    public MatchResult convertToEntity(MatchResultDTO dto) {
        return mapper.map(dto, MatchResult.class);
    }

    public MatchResultDTO convertToDTO(MatchResult entity) {
        return mapper.map(entity, MatchResultDTO.class);
    }

    @Override
    public MatchResult convertToFullEntity(MatchResultDTO dto) {
        MatchResult matchResult = convertToEntity(dto);

        Team winnerTeam = new Team(dto.getTeam_winner_id());
        matchResult.setTeam_winner(winnerTeam);

        Match match = new Match(dto.getMatchId());
        matchResult.setMatch(match);

        Player matchPlayer = new Player(dto.getMatchPlayerId());
        matchResult.setMatchPlayer(matchPlayer);

        return matchResult;
    }

    @Override
    public MatchResultDTO convertToFullDTO(MatchResult entity) {
        MatchResultDTO matchResultDTO = convertToDTO(entity);
        matchResultDTO.setMatchPlayerId(entity.getMatchPlayer().getId());
        matchResultDTO.setMatchId(entity.getMatch().getId());
        matchResultDTO.setTeam_winner_id(entity.getTeam_winner().getId());
        return matchResultDTO;
    }

    @Override
    public MatchResult convertToShortEntity(MatchResultDTO dto) {
        return null;
    }

    public List<MatchResultDTO> convertToDTOList(List<MatchResult> entityList) {
        return mapToDTOList(entityList, MatchResultDTO.class);
    }

}
