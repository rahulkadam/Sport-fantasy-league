package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@ToString(exclude = {"team_winner", "matchPlayer", "match"}, callSuper = true)
public class MatchResult extends BaseDaoObject {

    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "team_winner_id", nullable = false)
    private Team team_winner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_of_match_id")
    private Player matchPlayer;

    private String hometeamScore;
    private String awayteamscore;


    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "match_schedule_id", nullable = false)
    private Match match;

    public MatchResult(Long id) {
        super(id);
    }

}
