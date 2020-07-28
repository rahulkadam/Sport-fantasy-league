package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class MatchDetails extends BaseDaoObject {

    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "team_winner_id", nullable = false)
    private Team team_winner;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "player_of_match_id", nullable = false)
    private Player matchPlayer;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "match_schedule_id", nullable = false)
    private Match match;

    public MatchDetails(Long id) {
        super(id);
    }

}
