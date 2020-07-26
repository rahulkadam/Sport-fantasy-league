package com.garv.satta.fantasy.dto;

import com.garv.satta.fantasy.model.backoffice.Tournament;
import lombok.Data;

import java.io.Serializable;

@Data
public class TournamentDTO implements Serializable {
    private Long id;
    private String name;
    private String country;
    private String sportName;
    private Boolean status;

    public TournamentDTO(){}

    public TournamentDTO(Tournament tournament) {
        if (tournament != null ) {
            this.id = tournament.getId();
            this.country = tournament.getCountry();
            this.name = tournament.getName();
            this.sportName = tournament.getSportName();
            this.status = tournament.getStatus();
        }
    }

    public static Tournament getTournament(TournamentDTO dto) {
        if (dto == null) {
            return null;
        }
        Tournament tournament = new Tournament();
        tournament.setCountry(dto.getCountry());
        tournament.setId(dto.getId());
        tournament.setName(dto.getName());
        tournament.setSportName(dto.getSportName());
        tournament.setStatus(dto.getStatus());
        return tournament;
    }
}
