package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.garv.satta.fantasy.fantasyenum.PlayerEnum;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlayerDTO extends ShortBaseDTO {
    private String name;
    private PlayerEnum type;
    private String Country;
    private float value;
    private Integer externalpid;
    private Integer totalIplPoints;
    private List<Long> teamIds;
    private List<TeamDTO> teamDTOList;
    private List<String> teamsNameList;
}
