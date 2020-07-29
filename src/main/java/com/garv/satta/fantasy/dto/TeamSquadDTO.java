package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TeamSquadDTO extends BaseDTO {

    private String name;
    private Boolean status;
    private Long squadLength;

    private Long teamId;
    private List<Long> playerIds;

    private TeamDTO teamDTO;
    private List<PlayerDTO> playerDTOList;

}
