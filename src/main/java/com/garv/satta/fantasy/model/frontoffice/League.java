package com.garv.satta.fantasy.model.frontoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
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
@NoArgsConstructor
@ToString(exclude = {"created_by", "updated_by", "tournament","leagueMembers"}, callSuper = true)
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

    @ManyToMany
    @JoinTable(
            name = "league_userteam",
            joinColumns = @JoinColumn(name = "league_id"),
            inverseJoinColumns = @JoinColumn(name = "userteam_id"))
    private List<UserTeam> leagueMembers;

    public League(Long id) {
        super(id);
    }


    public void addLeagueMembers(UserTeam userTeam) {
        if (leagueMembers == null) {
            leagueMembers = new ArrayList<>();
            leagueMembers.add(userTeam);
            this.setTotalUserCount(1);
            return;
        }

        Predicate<UserTeam> isLeagueMemberMatch = userTeam1 -> userTeam1.getId() == userTeam.getId();
        UserTeam findLeagueMember = leagueMembers.stream().filter(isLeagueMemberMatch).findAny().orElse(null);
        if (findLeagueMember == null) {
            leagueMembers.add(userTeam);
        }
        this.setTotalUserCount(leagueMembers.size());
    }

    public void removeLeague(UserTeam userTeam) {
        if (leagueMembers == null) {
            return;
        }
        Predicate<UserTeam> isLeagueMemberMatch = userTeam1 -> userTeam1.getId() == userTeam.getId();
        leagueMembers.removeIf(isLeagueMemberMatch);
        this.setTotalUserCount(leagueMembers.size());
    }

}
