package com.garv.satta.fantasy.model.frontoffice;


import com.garv.satta.fantasy.model.idclass.LeagueUserTeamId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@IdClass(LeagueUserTeamId.class)
@Data
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class LeagueUserTeam implements Serializable {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_team_id")
    private UserTeam userTeam;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "league_id")
    private League league;

    private Integer userrank;
    private Integer score;

}
