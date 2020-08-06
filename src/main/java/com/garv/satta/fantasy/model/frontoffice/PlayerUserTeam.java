package com.garv.satta.fantasy.model.frontoffice;

import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.idclass.PlayerUserTeamId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@IdClass(PlayerUserTeamId.class)
@EqualsAndHashCode
@ToString
public class PlayerUserTeam implements Serializable {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_team_id")
    private UserTeam userTeam;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id")
    private Player player;

    private Boolean caption;
}