package com.garv.satta.fantasy.dto;

import lombok.Data;

@Data
public class MatchDetailsDTO extends BaseDTO {
    private String description;
    private TeamDTO team_winner;
    private PlayerDTO matchPlayer;
    private MatchScheduleDTO matchSchedule;
}
