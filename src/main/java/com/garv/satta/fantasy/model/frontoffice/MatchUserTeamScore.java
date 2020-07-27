package com.garv.satta.fantasy.model.frontoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import com.garv.satta.fantasy.model.backoffice.MatchDetails;
import com.garv.satta.fantasy.model.backoffice.Player;
import lombok.Data;

import javax.persistence.*;

/**
 * MatchUserTeamScore will store User team  match score, so we will have score of each match for userTeam
 *
 * i.e UserTeam has name : warrior11
 * here, we will get score for each match for warrior11,
 * warrior11 score in match1
 *  * warrior11 score in match2
 */
@Entity
@Data
public class MatchUserTeamScore  extends BaseDaoObject {

    private Integer current_match_point;
    private Integer totalPoint;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_team_id", nullable = false)
    private Player player;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "match_id", nullable = false)
    private MatchDetails matchDetails;

}
