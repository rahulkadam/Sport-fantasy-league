package com.garv.satta.fantasy.dto;

import com.garv.satta.fantasy.model.backoffice.MatchDetails;
import com.garv.satta.fantasy.model.backoffice.Player;
import lombok.Data;

@Data
public class MatchPlayerScoreDTO extends BaseDTO {

    private Integer pointscore;
    private Integer run_scored;
    private Integer wicket;
    private Integer catches;
    private PlayerDTO player;
    private MatchDetailsDTO matchDetails;
}
