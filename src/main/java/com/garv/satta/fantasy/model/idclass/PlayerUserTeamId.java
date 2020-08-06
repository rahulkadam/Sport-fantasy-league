package com.garv.satta.fantasy.model.idclass;

import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@EqualsAndHashCode
public class PlayerUserTeamId implements Serializable {

    private Player player;
    private UserTeam userTeam;

    public PlayerUserTeamId(){};

    public PlayerUserTeamId(Player player, UserTeam userTeam) {
        this.player = player;
        this.userTeam = userTeam;
    }
}
