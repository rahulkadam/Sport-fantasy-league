package com.garv.satta.fantasy.model.frontoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Entity
@Data
@ToString(exclude = {"leagues", "user", "captain_player","teamPlayers"}, callSuper = true)
@NoArgsConstructor
public class UserTeam extends BaseDaoObject {

    @NotNull
    @Column(unique = true)
    private String name;
    private Boolean status;

    private Integer creditbalance;

    private Integer total_score;

    private Integer total_Transfer;
    private Integer used_Transfer;
    private Integer remained_Transfer;
    private Integer current_Used_Transfer;

    @ManyToMany(mappedBy = "leagueMembers")
    private List<League> leagues;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "captain_player_id")
    private Player captain_player;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tournament_id")
    private Tournament tournament;

    @ManyToMany
    @JoinTable(
            name = "userteam_player",
            joinColumns = @JoinColumn(name = "user_team_id"),
            inverseJoinColumns = @JoinColumn(name = "player_id"))
    private List<Player> teamPlayers;


    public void addPlayer(Player player) {
        if (teamPlayers == null) {
            teamPlayers = new ArrayList<>();
            teamPlayers.add(player);
            return;
        }

        Predicate<Player> isplayerMatch = player1 -> player1.getId() == player.getId();
        Player findPlayer = teamPlayers.stream().filter(isplayerMatch).findAny().orElse(null);
        if (findPlayer == null) {
            teamPlayers.add(player);
        }
    }

    public void removePlayer(Player player) {
        if (teamPlayers == null) {
            return;
        }
        Predicate<Player> isplayerMatch = player1 -> player1.getId() == player.getId();
        teamPlayers.removeIf(isplayerMatch);
    }

}
