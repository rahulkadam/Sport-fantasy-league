package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.MatchDTO;
import com.garv.satta.fantasy.model.backoffice.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

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
        MatchResult matchResult = entity.getMatchResult();
        if (matchResult != null) {
            matchDTO.setMatchResult(matchResult.getDescription());
        }
        Team homeTeam = entity.getTeam_host();
        Team awayTeam = entity.getTeam_away();
        Venue venue = entity.getVenue();
        matchDTO.setTeam_away_id(awayTeam.getId());
        matchDTO.setTeam_host_id(homeTeam.getId());
        matchDTO.setTeam_host_name(homeTeam.getName());
        matchDTO.setTeam_away_name(awayTeam.getName());
        matchDTO.setVenue_name(venue.getName());
        matchDTO.setVenueId(venue.getId());

        //Tournament tournament = entity.getTournament();
        // matchDTO.setTournament_id(tournament.getId());
        // matchDTO.setTournament_name(tournament.getName());

        return matchDTO;
    }

    @Override
    public Match convertToShortEntity(MatchDTO dto) {
        return null;
    }

    public List<MatchDTO> convertToDTOList(List<Match> entityList) {
        return mapToDTOList(entityList, MatchDTO.class);
    }

    public List<MatchDTO> convertToFullDTOList(List<Match> entityList) {
        return entityList.stream()
                .map(entity -> convertToFullDTO(entity))
                .collect(Collectors.toList());
    }

}
