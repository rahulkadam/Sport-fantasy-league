package com.garv.satta.fantasy.model.frontoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.apache.commons.collections4.CollectionUtils;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Entity
@Data
@NamedEntityGraph(name = "UserTeam.leagueUserTeams",
        attributeNodes = @NamedAttributeNode(value = "leagueUserTeams", subgraph = "loadUserTeam"),
        subgraphs = @NamedSubgraph(name = "loadUserTeam",
                attributeNodes = {
                        @NamedAttributeNode("league"),
                        @NamedAttributeNode("userTeam")
        }
        )
)
@ToString(exclude = {"leagueUserTeams", "user", "captain_player","tournament", "playerUserTeams"}, callSuper = true)
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true, of = {"id"})
public class UserTeam extends BaseDaoObject {

    @NotNull
    private String name;
    private Boolean status;

    private Float creditbalance;
    private Float totalbalance;

    private Integer total_score;

    private Integer total_Transfer;
    private Integer used_Transfer;
    private Integer remained_Transfer;
    private Integer current_Used_Transfer;

    @OneToMany(mappedBy = "userTeam", fetch = FetchType.LAZY)
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

    @OneToMany(mappedBy = "userTeam", fetch = FetchType.LAZY,cascade = {CascadeType.ALL}, orphanRemoval = true)
    private Set<PlayerUserTeam> playerUserTeams;

    public void resetPlayerUserTeam() {
        playerUserTeams.clear();
    }

    public void resetPlayerList(List<Player> playerList) {
        resetPlayerUserTeam();
        addPlayerList(playerList);
    }

    public UserTeam(Long id) {
        super(id);
    }

    public void addPlayerList(List<Player> players) {
        players.forEach(player -> addPlayer(player));
    }

    public void addPlayer(Player player) {
        PlayerUserTeam playerUserTeam = new PlayerUserTeam();
        playerUserTeam.setPlayer(player);
        playerUserTeam.setUserTeam(this);
        playerUserTeam.setPlayer_id(playerUserTeam.getPlayer().getId());
        playerUserTeam.setUser_team_id(this.id);
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

    public Set<Long> getPlayerIds() {
        if (CollectionUtils.isNotEmpty(playerUserTeams)) {
            Set<Long> playerIds = playerUserTeams.stream().map(player -> player.getPlayer_id()).collect(Collectors.toSet());
            return playerIds;
        }
        return new TreeSet<>();
    }

    public Integer getLeagueUserTeamsCount() {
        return leagueUserTeams.size();
    }

}
