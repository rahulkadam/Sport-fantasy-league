package com.garv.satta.fantasy.model.frontoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;
import java.util.function.Predicate;

@Entity
@Data
@ToString(exclude = {"leagueUserTeams", "user", "captain_player","tournament", "playerUserTeams"}, callSuper = true)
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true, of = {"id"})
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

    @OneToMany(mappedBy = "userTeam")
    private Set<LeagueUserTeam> leagueUserTeams;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "captain_player_id")
    private Player captain_player;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tournament_id")
    private Tournament tournament;

    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL)
    private Set<PlayerUserTeam> playerUserTeams;


    public void addPlayer(Player player) {
        PlayerUserTeam playerUserTeam = new PlayerUserTeam();
        playerUserTeam.setPlayer(player);
        playerUserTeam.setUserTeam(this);
        if (playerUserTeams == null) {
            playerUserTeams = new HashSet<>();
            playerUserTeams.add(playerUserTeam);
            return;
        }

        Predicate<PlayerUserTeam> isplayerMatch = player1 -> player1.getPlayer().getId() == playerUserTeam.getPlayer().getId();
        PlayerUserTeam findPlayer = playerUserTeams.stream().filter(isplayerMatch).findAny().orElse(null);
        if (findPlayer == null) {
            playerUserTeams.add(playerUserTeam);
        }
    }

    public void removePlayer(Player player) {
        if (playerUserTeams == null) {
            return;
        }
        Predicate<PlayerUserTeam> isplayerMatch = player1 -> player1.getPlayer().getId() == player.getId();
        playerUserTeams.removeIf(isplayerMatch);
    }

}
