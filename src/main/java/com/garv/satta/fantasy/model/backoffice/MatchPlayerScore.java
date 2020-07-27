package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class MatchPlayerScore extends BaseDaoObject{

    private Integer pointscore;
    private Integer run_scored;
    private Integer wicket;
    private Integer catches;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "match_id", nullable = false)
    private MatchDetails matchDetails;

}
