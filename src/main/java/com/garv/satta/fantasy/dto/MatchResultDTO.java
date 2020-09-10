package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MatchResultDTO extends BaseDTO {
    private String description;
    private String hometeamScore;
    private String awayteamscore;
    private Long team_winner_id;
    private Long matchPlayerId;
    private Long matchId;
    private TeamDTO winnerTeamDTO;
    private PlayerDTO matchPlayerDTO;
    private MatchDTO matchDTO;
}
