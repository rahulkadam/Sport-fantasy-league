package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GameDTO extends ShortBaseDTO {

    private String name;
    private String description;
    private Integer playerCount;
    private TeamCriteriaDTO teamCriteriaDTO;
    private List<PlayerCriteriaDTO> playerCriteriaDTOList;
}
