package com.garv.satta.fantasy.external.DTO;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlayerStatsCricDTO {

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
    @JsonAlias({"4s"})
    private Integer fours;
    @JsonAlias({"6s"})
    private Integer sixes;
    @JsonAlias({"O"})
    private Float overs;
    @JsonAlias({"M"})
    private Integer mainden;
    @JsonAlias({"W"})
    private Integer wickets;
    private Integer runs_concede;
    @JsonAlias({"Ecom"})
    private Float economy;
    @JsonAlias({"catch"})
    private Integer catches;
    private Integer stumped;
    private Integer rouout;
    private Integer points;

    public PlayerStatsCricDTO(Integer pid, String name) {
        this.pid = pid;
        this.name = name;
    }
}
