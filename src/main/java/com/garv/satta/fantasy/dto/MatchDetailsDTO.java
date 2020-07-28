package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MatchDetailsDTO extends BaseDTO {
    private String description;
    private Long team_winner_id;
    private Long matchPlayerId;
    private Long matchScheduleId;
    private TeamDTO teamDTO;
    private PlayerDTO matchPlayerDTO;
    private MatchScheduleDTO matchScheduleDTO;
}
