package com.garv.satta.fantasy.model.frontoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import com.garv.satta.fantasy.model.backoffice.MatchDetails;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

/**
 * LeagueUserTeamScorePerMatch will store User team  match score, so we will have score of each match for userTeam
 *
 * i.e LeagueUserTeam has name : warrior11
 * here, we will get score for each match for warrior11,
 * warrior11 score in match1
 *  * warrior11 score in match2
 */
@Entity
@Data
@NoArgsConstructor
@ToString(exclude = {"matchDetails", "userTeam"})
public class LeagueUserTeamScorePerMatch extends BaseDaoObject {

    private Integer current_match_point;
    private Integer totalPoint;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_team_id", nullable = false)
    private LeagueUserTeam userTeam;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "match_details_id", nullable = false)
    private MatchDetails matchDetails;

}