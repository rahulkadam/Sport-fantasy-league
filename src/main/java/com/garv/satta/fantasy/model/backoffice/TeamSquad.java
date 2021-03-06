package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Entity
@Data
@ToString(exclude = {"playerList", "team"}, callSuper = true)
@NoArgsConstructor
public class TeamSquad extends BaseDaoObject {

    private String name;
    private Boolean status;
    private Long squadLength;

    @OneToOne
    @JoinColumn(name = "team_id", referencedColumnName = "id")
    private Team team;

    @ManyToMany
    @JoinTable(
            name = "team_squad_player",
            joinColumns = @JoinColumn(name = "team__squad_id"),
            inverseJoinColumns = @JoinColumn(name = "player_id"))
    private List<Player> playerList;

    public TeamSquad(Long id) {
        super(id);
    }

    public void addPlayer(Player player) {
        if (playerList == null) {
            playerList = new ArrayList<>();
            playerList.add(player);
            return;
        }

        Predicate<Player> isplayerMatch = player1 -> player1.getId() == player.getId();
        Player findPlayer = playerList.stream().filter(isplayerMatch).findAny().orElse(null);
        if (findPlayer == null) {
            playerList.add(player);
        }
    }

    public void removePlayer(Player player) {
        if (playerList == null) {
            return;
        }
        Predicate<Player> isplayerMatch = player1 -> player1.getId() == player.getId();
        playerList.removeIf(isplayerMatch);
    }
}
