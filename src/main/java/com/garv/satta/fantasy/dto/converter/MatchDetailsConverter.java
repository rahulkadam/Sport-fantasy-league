package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.MatchDetailsDTO;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.backoffice.MatchDetails;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.backoffice.Team;
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
        MatchDetails matchDetails = convertToEntity(dto);

        Team winnerTeam = new Team(dto.getTeam_winner_id());
        matchDetails.setTeam_winner(winnerTeam);

        Match match = new Match(dto.getMatchId());
        matchDetails.setMatch(match);

        Player matchPlayer = new Player(dto.getMatchPlayerId());
        matchDetails.setMatchPlayer(matchPlayer);

        return matchDetails;
    }

    @Override
    public MatchDetailsDTO convertToFullDTO(MatchDetails entity) {
        MatchDetailsDTO matchDetailsDTO = convertToDTO(entity);
        matchDetailsDTO.setMatchPlayerId(entity.getMatchPlayer().getId());
        matchDetailsDTO.setMatchId(entity.getMatch().getId());
        matchDetailsDTO.setTeam_winner_id(entity.getTeam_winner().getId());
        return matchDetailsDTO;
    }

    @Override
    public MatchDetails convertToShortEntity(MatchDetailsDTO dto) {
        return null;
    }

    public List<MatchDetailsDTO> convertToDTOList(List<MatchDetails> entityList) {
        return mapToDTOList(entityList, MatchDetailsDTO.class);
    }

}
