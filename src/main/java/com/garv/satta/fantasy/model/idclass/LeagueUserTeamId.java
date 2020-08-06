package com.garv.satta.fantasy.model.idclass;

import com.garv.satta.fantasy.model.frontoffice.League;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@EqualsAndHashCode
public class LeagueUserTeamId implements Serializable {

    private UserTeam userTeam;
    private League league;

    public LeagueUserTeamId() {

    }

    public LeagueUserTeamId(UserTeam userteam , League league) {
        this.userTeam = userteam;
        this.league = league;
    }



}
