package com.garv.satta.fantasy.model.frontoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true, of = {"id"})
@ToString(exclude = {"created_by", "updated_by", "tournament","leagueUserTeams"}, callSuper = true)
public class League extends BaseDaoObject {

    @NotNull
    private String name;

    private Boolean status;

    private Integer totalUserCount;

    @NotNull
    @Column(unique = true)
    private String leagueCode;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "created_by_id", nullable = false)
    private User created_by;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "updated_by_id", nullable = false)
    private User updated_by;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tournament_id", nullable = false)
    private Tournament tournament;

    @OneToMany(mappedBy = "league", cascade = CascadeType.ALL)
    private List<LeagueUserTeam> leagueUserTeams;

    public League(Long id) {
        super(id);
    }


    public void addLeagueMembers(UserTeam userTeam) {
        LeagueUserTeam leagueUserTeam = new LeagueUserTeam();
        leagueUserTeam.setUserTeam(userTeam);
        leagueUserTeam.setLeague(this);

        if (leagueUserTeams == null) {
            leagueUserTeams = new ArrayList<>();
            leagueUserTeams.add(leagueUserTeam);
            this.setTotalUserCount(1);
            leagueUserTeam.setUserrank(1);
            return;
        }

        leagueUserTeam.setUserrank(leagueUserTeams.size() + 1);

        Predicate<LeagueUserTeam> isLeagueMemberMatch = userTeam1 -> userTeam1.getUserTeam().getId() == leagueUserTeam.getUserTeam().getId();
        LeagueUserTeam findLeagueMember = leagueUserTeams.stream().filter(isLeagueMemberMatch).findAny().orElse(null);
        if (findLeagueMember == null) {
            leagueUserTeams.add(leagueUserTeam);
        }
        this.setTotalUserCount(leagueUserTeams.size());
    }

    public void removeLeague(UserTeam userTeam) {

        if (leagueUserTeams == null) {
            return;
        }
        Predicate<LeagueUserTeam> isLeagueMemberMatch = userTeam1 -> userTeam1.getUserTeam().getId() == userTeam.getId();
        leagueUserTeams.removeIf(isLeagueMemberMatch);
        this.setTotalUserCount(leagueUserTeams.size());
    }

}
