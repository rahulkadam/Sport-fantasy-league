package com.garv.satta.fantasy.model.frontoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Data
public class League extends BaseDaoObject {

    @NotNull
    private String name;

    private Boolean status;

    @NotNull
    private String leagueCode;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User created_by;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "updated_by", nullable = false)
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

}
