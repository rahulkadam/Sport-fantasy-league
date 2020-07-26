package com.garv.satta.fantasy.model.frontoffice;

import com.garv.satta.fantasy.model.backoffice.Player;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.util.List;

@Entity
@Data
public class UserTeam implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private Boolean status;

    private Integer creditbalance;

    private Integer total_score;

    private Integer total_Transfer;
    private Integer used_Transfer;
    private Integer remained_Transfer;
    private Integer current_Used_Transfer;

    private Date created_at;
    private Date updated_at;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "league_id", nullable = false)
    private League league;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "captain_player_id", nullable = false)
    private Player captain_player;

    @ManyToMany
    @JoinTable(
            name = "userteam_player",
            joinColumns = @JoinColumn(name = "userteam_id"),
            inverseJoinColumns = @JoinColumn(name = "player_id"))
    private List<Player> teamPlayers;
}
