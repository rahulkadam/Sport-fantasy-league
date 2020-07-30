package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.MatchDTO;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.backoffice.Team;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import com.garv.satta.fantasy.model.backoffice.Venue;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MatchConverter extends Converter<Match, MatchDTO> {

    public Match convertToEntity(MatchDTO dto) {
        return mapper.map(dto, Match.class);
    }

    public MatchDTO convertToDTO(Match entity) {
        return mapper.map(entity, MatchDTO.class);
    }

    @Override
    public Match convertToFullEntity(MatchDTO dto) {
        Match match = convertToEntity(dto);

        Venue venue = new Venue(dto.getVenueId());
        match.setVenue(venue);

        Team hostTeam = new Team(dto.getTeam_host_id());
        match.setTeam_host(hostTeam);

        Team awayTeam = new Team(dto.getTeam_away_id());
        match.setTeam_away(awayTeam);

        Tournament tournament = new Tournament(dto.getTournament_id());
        match.setTournament(tournament);

        return match;
    }

    @Override
    public MatchDTO convertToFullDTO(Match entity) {
        MatchDTO matchDTO = convertToDTO(entity);
        matchDTO.setVenueId(entity.getVenue().getId());
        matchDTO.setTeam_away_id(entity.getTeam_away().getId());
        matchDTO.setTeam_host_id(entity.getTeam_host().getId());
        matchDTO.setTournament_id(entity.getTournament().getId());
        return matchDTO;
    }

    @Override
    public Match convertToShortEntity(MatchDTO dto) {
        return null;
    }

    public List<MatchDTO> convertToDTOList(List<Match> entityList) {
        return mapToDTOList(entityList, MatchDTO.class);
    }

}
