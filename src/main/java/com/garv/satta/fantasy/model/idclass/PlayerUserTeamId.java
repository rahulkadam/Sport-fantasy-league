package com.garv.satta.fantasy.model.idclass;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode
public class PlayerUserTeamId implements Serializable {

    private Long user_team_id;

    private Long league_id;

    public PlayerUserTeamId(){};

    public PlayerUserTeamId(Long user_team_id, Long league_id) {
        this.league_id = league_id;
        this.user_team_id = user_team_id;
    }
}
