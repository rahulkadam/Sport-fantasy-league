package com.garv.satta.fantasy.dto;

import com.garv.satta.fantasy.model.backoffice.MatchDetails;
import lombok.Data;

@Data
public class LeagueUserTeamScoreHistoryDTO extends BaseDTO {

    private Integer current_match_point;
    private Integer totalPoint;
    private LeagueUserTeamDTO userTeam;
    private MatchDetailsDTO matchDetails;
}
