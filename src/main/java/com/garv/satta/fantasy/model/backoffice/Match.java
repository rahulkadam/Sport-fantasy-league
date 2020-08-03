package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.joda.time.DateTime;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Data
@Table(name = "match_schedule")
@NoArgsConstructor
@ToString(exclude = {"venue", "team_host", "team_away","tournament", "matchDetails", "matchPlayerScore"}, callSuper = true)
public class Match extends BaseDaoObject {

    private String description;

    @NotNull
    private DateTime matchTime;

    private Boolean status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "venue_id", nullable = false)
    private Venue venue;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "team_host_id", nullable = false)
    private Team team_host;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "team_away_id", nullable = false)
    private Team team_away;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tournament_id", nullable = false)
    private Tournament tournament;

    @OneToOne(mappedBy = "match")
    private MatchDetails matchDetails;

    @OneToMany(mappedBy = "match")
    private List<MatchPlayerScore> matchPlayerScore;

    public Match(Long id) {
        super(id);
    }

}
