package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MatchPlayerScoreDTO extends ShortBaseDTO {

    private Integer pointscore;
    private Integer run_scored;
    private Integer wicket;
    private Integer catches;
    private Long playerId;
    private Long matchId;
    private String playerName;
    private String matchDescription;
    private Long tournamentId;
    private PlayerDTO playerDTO;
    private MatchDTO matchDTO;
    private TournamentDTO tournamentDTO;
}
