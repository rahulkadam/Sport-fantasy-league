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
@Table(name = "MatchGame")
@NoArgsConstructor
@NamedEntityGraph(name = "Match.matchschedule",
        attributeNodes = {
                @NamedAttributeNode("team_host"),
                @NamedAttributeNode("team_away"),
                @NamedAttributeNode("venue"),
                @NamedAttributeNode("matchResult")}
)
@ToString(exclude = {"venue", "team_host", "team_away","tournament", "matchResult", "matchPlayerScore"}, callSuper = true)
public class Match extends BaseDaoObject {

    private String description;

    @NotNull
    private DateTime matchTime;

    private Boolean status;

    private Integer external_mid;

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

    @OneToOne(mappedBy = "match", fetch = FetchType.LAZY)
    private MatchResult matchResult;

    @OneToMany(mappedBy = "match", fetch = FetchType.LAZY)
    private List<MatchPlayerScore> matchPlayerScore;

    public Match(Long id) {
        super(id);
    }

}
