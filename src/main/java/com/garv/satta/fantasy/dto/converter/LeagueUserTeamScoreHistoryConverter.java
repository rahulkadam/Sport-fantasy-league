package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.LeagueUserTeamScoreHistoryDTO;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeamScorePerMatch;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LeagueUserTeamScoreHistoryConverter extends Converter<LeagueUserTeamScorePerMatch, LeagueUserTeamScoreHistoryDTO> {

    public LeagueUserTeamScorePerMatch convertToEntity(LeagueUserTeamScoreHistoryDTO dto) {
        return mapper.map(dto, LeagueUserTeamScorePerMatch.class);
    }

    public LeagueUserTeamScoreHistoryDTO convertToDTO(LeagueUserTeamScorePerMatch entity) {
        return mapper.map(entity, LeagueUserTeamScoreHistoryDTO.class);

    }

    @Override
    public LeagueUserTeamScorePerMatch convertToFullEntity(LeagueUserTeamScoreHistoryDTO dto) {
        return null;
    }

    @Override
    public LeagueUserTeamScoreHistoryDTO convertToFullDTO(LeagueUserTeamScorePerMatch entity) {
        return null;
    }

    @Override
    public LeagueUserTeamScorePerMatch convertToShortEntity(LeagueUserTeamScoreHistoryDTO dto) {
        return null;
    }

    public List<LeagueUserTeamScoreHistoryDTO> convertToDTOList(List<LeagueUserTeamScorePerMatch> entityList){
        return mapToDTOList(entityList, LeagueUserTeamScoreHistoryDTO.class);
    }

}
