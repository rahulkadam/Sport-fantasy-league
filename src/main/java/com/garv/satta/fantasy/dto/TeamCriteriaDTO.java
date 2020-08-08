package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TeamCriteriaDTO  extends ShortBaseDTO {
    private Float totalCredits;
    private Integer maxPlayerPerTeam;
    private Integer totalPlayerCount;
    private Long gameId;
    private GameDTO gameDTO;
}
