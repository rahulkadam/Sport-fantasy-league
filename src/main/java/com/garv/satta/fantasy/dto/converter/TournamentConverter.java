package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.PlayerDTO;
import com.garv.satta.fantasy.dto.TournamentDTO;
import com.garv.satta.fantasy.model.backoffice.Player;
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

    public List<TournamentDTO> convertToDTOList(List<Tournament> tournamentList){
        return tournamentList.stream()
                .map(entity -> mapper.map(entity, TournamentDTO.class))
                .collect(Collectors.toList());
    }
}
