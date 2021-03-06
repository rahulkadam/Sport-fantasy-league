package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LeagueUserTeamScoreHistoryDTO extends ShortBaseDTO {

    private Integer current_match_point;
    private Integer totalPoint;
    private Long userTeamId;
    private Long matchId;
    private String matchDesciription;
    private String userName;
    private long[] playerList;
    private UserTeamDTO userTeamDTO;
    private MatchResultDTO matchResultDTO;
}
