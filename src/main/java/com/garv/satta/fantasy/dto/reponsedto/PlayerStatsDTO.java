package com.garv.satta.fantasy.dto.reponsedto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlayerStatsDTO {
    private Long id;
    private String name;
    private Long pickedCount;
    private Long matchplayed;
    private Long pointScored;
    private String teamName;
    private Long lastMatchPoints;
    private String lastMatchPlayedAgainst;
}
