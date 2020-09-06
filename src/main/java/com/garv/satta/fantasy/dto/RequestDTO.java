package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestDTO extends ShortBaseDTO {
    private String name;
    private String description;
    private String key;
    private String velue;
    private String otherString;
    private Long addTo;
    private Long add;
    private Long captainId;
    private Long userTeamId;
    private Long matchId;
    private Long playerId;
    private Integer externalId;
    private List<Long> addList;
    private Long removeFrom;
    private Long remove;
    private List<Long> removeList;
    private String leagueCode;
}
