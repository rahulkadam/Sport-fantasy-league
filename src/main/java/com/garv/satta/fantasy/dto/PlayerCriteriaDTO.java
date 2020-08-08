package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlayerCriteriaDTO extends ShortBaseDTO {
    private String type;
    private Integer minPerTeam;
    private Integer maxPerTeam;
    private String shortName;
    private Long gameId;
    private GameDTO gameDTO;
}
