package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.TournamentDTO;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TournamentConverter extends Converter<Tournament, TournamentDTO> {

    @Override
    public Tournament convertToEntity(TournamentDTO dto) {
        return mapper.map(dto, Tournament.class);
    }

    @Override
    public TournamentDTO convertToDTO(Tournament entity) {
        return mapper.map(entity, TournamentDTO.class);
    }

    @Override
    public Tournament convertToFullEntity(TournamentDTO dto) {
        return null;
    }

    @Override
    public TournamentDTO convertToFullDTO(Tournament entity) {
        int teamCount = entity.getTeams().size();
        TournamentDTO tournamentDTO = convertToDTO(entity);
        tournamentDTO.setTeamCount(teamCount);
        return tournamentDTO;
    }

    @Override
    public Tournament convertToShortEntity(TournamentDTO dto) {
        return null;
    }

    public List<TournamentDTO> convertToDTOList(List<Tournament> tournamentList){
        return mapToDTOList(tournamentList, TournamentDTO.class);
    }

    public List<TournamentDTO> convertToFullDTOList(List<Tournament> tournamentList){
        return tournamentList.stream()
                .map(entity -> convertToFullDTO(entity))
                .collect(Collectors.toList());
    }
}
