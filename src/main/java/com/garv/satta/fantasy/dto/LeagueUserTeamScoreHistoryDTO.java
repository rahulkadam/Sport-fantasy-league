package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LeagueUserTeamScoreHistoryDTO extends BaseDTO {

    private Integer current_match_point;
    private Integer totalPoint;
    private Long userTeamId;
    private Long matchResultId;
    private LeagueUserTeamDTO userTeamDTO;
    private MatchResultDTO matchResultDTO;
}
