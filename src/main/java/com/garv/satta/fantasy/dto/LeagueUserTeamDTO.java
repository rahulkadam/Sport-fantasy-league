package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serializable;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LeagueUserTeamDTO implements Serializable {

    private Long userId;
    private Long user_team_id;
    private Long league_id;
    private Integer userrank;
    private String userName;
    private String teamName;
    private Integer score;
}
