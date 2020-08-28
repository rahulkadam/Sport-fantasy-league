package com.garv.satta.fantasy.external.DTO;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MatchDataCricDTO {
    @JsonAlias({"man-of-the-match"})
    private String man_of_the_match;
    private List<SquadCricDTO> team;
    private List<PlayerTypeCricDto> batting;
    private List<PlayerTypeCricDto> bowling;
    private List<PlayerTypeCricDto> fielding;


}
