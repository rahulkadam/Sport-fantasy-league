package com.garv.satta.fantasy.model.frontoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.backoffice.MatchResult;
import com.vladmihalcea.hibernate.type.array.LongArrayType;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;

/**
 * LeagueUserTeamScorePerMatch will store User team  match score, so we will have score of each match for userTeam
 *
 * i.e UserTeam has name : warrior11
 * here, we will get score for each match for warrior11,
 * warrior11 score in match1
 *  * warrior11 score in match2
 */
@Entity
@Data
@NoArgsConstructor
@ToString(exclude = {"matchResult", "userTeam", "playerList"})
@TypeDef(name = "json", typeClass = JsonStringType.class)
public class LeagueUserTeamScorePerMatch extends BaseDaoObject {

    private Integer current_match_point;
    private Integer totalPoint;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_team_id", nullable = false)
    private UserTeam userTeam;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    @Type(type = "json")
    @Column(name = "player_list")
    private long[] playerList;

    @Column(name = "captain_player")
    private Long captain_player;

    public LeagueUserTeamScorePerMatch(Long id) {
        super(id);
    }
}
