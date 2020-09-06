package com.garv.satta.fantasy.external.DTO;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MatchPlayerScoreCricDTO {

    private Integer pid;
    private String batsman;
    private String name;
    private String bowler;
    private String fielder;
    @JsonAlias({"R"})
    private Integer runs_scored;
    @JsonAlias({"B"})
    private Integer balls;
    @JsonAlias({"SR"})
    private Integer strikeRate;
    @JsonAlias({"dismissal-info"})
    private String dismissed;
    @JsonAlias({"0s"})
    private Integer dot_balls;
    @JsonAlias({"4s"})
    private Integer fours;
    @JsonAlias({"6s"})
    private Integer sixes;
    @JsonAlias({"O"})
    private Object overs;
    @JsonAlias({"M"})
    private Integer maiden;
    @JsonAlias({"W"})
    private Integer wicket;
    private Integer runs_concede;
    @JsonAlias({"Econ"})
    private Float economy;
    @JsonAlias({"catch"})
    private Integer catches;
    private Integer stumped;
    private Integer runout;
    private Integer pointscore;
}
