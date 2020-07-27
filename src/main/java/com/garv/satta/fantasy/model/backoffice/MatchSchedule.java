package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import org.joda.time.DateTime;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
public class MatchSchedule extends BaseDaoObject {

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


}
