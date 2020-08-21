package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.apache.commons.collections4.CollectionUtils;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Entity
@Data
@NoArgsConstructor
@ToString(exclude = {"tournament", "players"}, callSuper = true)
public class Team extends BaseDaoObject {
    @NotNull
    @Column(unique = true)
    private String name;
    @NotNull
    private String Country;
    private String owner;
    private String shortName;

    @ManyToMany
    @JoinTable(
            name = "team_tournament",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "tournament_id"))
    private List<Tournament> tournament;

    @ManyToMany(mappedBy = "teams")
    private List<Player> players;

    public Team(Long id) {
        super(id);
    }

    public void addTournament(Tournament tournamentobj) {
        if (tournament == null) {
            tournament = new ArrayList<>();
            tournament.add(tournamentobj);
            return;
        }

        Predicate<Tournament> isTeamMatch = tournament1 -> tournament1.getId() == tournamentobj.getId();
        Tournament findTournament = tournament.stream().filter(isTeamMatch).findAny().orElse(null);
        if (findTournament == null) {
            tournament.add(tournamentobj);
        }
    }

    public void removeTournament(Tournament tournamentObj) {
        if (tournament == null) {
            return;
        }
        Predicate<Tournament> isTournamentMatch = tournament1 -> tournament1.getId() == tournamentObj.getId();
        tournament.removeIf(isTournamentMatch);
    }

    public Set<Long> getPlayerIds() {
        if (CollectionUtils.isNotEmpty(players)) {
            Set<Long> playerIds = players.stream().map(player -> player.getId()).collect(Collectors.toSet());
            return playerIds;
        }
        return new TreeSet<>();
    }

}
