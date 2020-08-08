package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TournamentDTO extends ShortBaseDTO {

    private String name;
    private String country;
    private String sportName;
    private Boolean status;
    private int teamCount;
}
