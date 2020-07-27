package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import javax.persistence.*;

@Entity
@Data
public class MatchDetails extends BaseDaoObject {

    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "team_winner_id", nullable = false)
    private Team team_host;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "player_of_match_id", nullable = false)
    private Player matchPlayer;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "match_schedule_id", nullable = false)
    private MatchSchedule matchSchedule;

}
