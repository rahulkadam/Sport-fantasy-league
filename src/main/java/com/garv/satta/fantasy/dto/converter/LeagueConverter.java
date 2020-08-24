package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.LeagueDTO;
import com.garv.satta.fantasy.dto.LeagueUserTeamDTO;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import com.garv.satta.fantasy.model.frontoffice.League;
import com.garv.satta.fantasy.model.frontoffice.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class LeagueConverter extends Converter<League, LeagueDTO> {

    @Autowired
    private LeagueUserTeamConverter userTeamConverter;

    public League convertToEntity(LeagueDTO dto) {
        return mapper.map(dto, League.class);
    }

    public League convertToFullEntity(LeagueDTO dto) {
        League league = convertToEntity(dto);
        Long userId = dto.getCreateByUserId();
        User user = new User(userId);
        league.setCreated_by(user);
        league.setUpdated_by(user);
        Long tournamentId = dto.getTournamentId();
        Tournament tournament = new Tournament(tournamentId);
        league.setTournament(tournament);
        return league;
    }

    public LeagueDTO convertToDTO(League entity) {
        return mapper.map(entity, LeagueDTO.class);
    }

    public LeagueDTO convertToFullDTO(League entity) {
        LeagueDTO dto = convertToDTO(entity);
        dto.setTournamentId(entity.getTournament().getId());
        dto.setCreateByUserId(entity.getCreated_by().getId());
        if (!entity.getLeagueUserTeams().isEmpty()) {
            List<LeagueUserTeamDTO> leagueUserTeamDTOS = userTeamConverter.convertToDTOList(entity.getLeagueUserTeams());
            dto.setLeagueUserTeamDTOS(leagueUserTeamDTOS);
        }

        return dto;
    }

    @Override
    public League convertToShortEntity(LeagueDTO dto) {
        return null;
    }

    public List<LeagueDTO> convertToDTOList(List<League> entityList) {
        return mapToDTOList(entityList, LeagueDTO.class);
    }

    public List<LeagueDTO> convertToFullDTOList(List<League> entityList) {
        return entityList.stream()
                .map(entity -> convertToFullDTO(entity))
                .collect(Collectors.toList());
    }

}
