package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import com.garv.satta.fantasy.fantasyenum.PlayerEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Entity
@Data
@NoArgsConstructor
@NamedEntityGraph(name = "Player.teams",
        attributeNodes = @NamedAttributeNode("teams")
)
@ToString(exclude = {"teams", "squads"}, callSuper = true)
@EqualsAndHashCode
// @Where(clause = "is_deleted = false")
public class Player extends BaseDaoObject {
    @NotNull
    @Column(unique = true)
    private String name;
    @NotNull
    @Enumerated(EnumType.STRING)
    private PlayerEnum type;
    private String Country;
    private Float value;
    private Integer external_pid;

    @ManyToMany
    @JoinTable(
            name = "team_player",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "player_id"))
    private List<Team> teams;

    @ManyToMany(mappedBy = "playerList")
    private List<TeamSquad> squads;

    public Player(Long id) {
        super(id);
    }


    public void addTeam(Team team) {
        if (teams == null) {
            teams = new ArrayList<>();
            teams.add(team);
            return;
        }

        Predicate<Team> isTeamMatch = team1 -> team1.getId() == team.getId();
        Team findTeam = teams.stream().filter(isTeamMatch).findAny().orElse(null);
        if (findTeam == null) {
            teams.add(team);
        }
    }

    public void removeTeam(Team team) {
        if (teams == null) {
            return;
        }
        Predicate<Team> isTeamMatch = team1 -> team1.getId() == team.getId();
        teams.removeIf(isTeamMatch);
    }

    public List<String> getTeamNames() {
        return this.teams.stream().map(team ->
                team.getName()).collect(Collectors.toList());
    }
}
