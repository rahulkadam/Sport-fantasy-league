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
    @EqualsAndHashCode.Include
    private Long user_team_id;

    @Id
    @EqualsAndHashCode.Include
    private Long player_id;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_team_id", insertable=false,  updatable=false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private UserTeam userTeam;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id", insertable=false,  updatable=false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Player player;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Boolean caption;
}