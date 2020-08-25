package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@NamedEntityGraph(name = "MatchPlayerScore.full",
        attributeNodes = {
                @NamedAttributeNode("player"),
                @NamedAttributeNode(value = "match", subgraph = "match")},
                subgraphs = @NamedSubgraph(name = "match", attributeNodes = @NamedAttributeNode("matchResult"))

)
@ToString(exclude = {"match", "player", "tournament"}, callSuper = true)
public class MatchPlayerScore extends BaseDaoObject {

    private Integer pointscore;
    private Integer run_scored;
    private Integer wicket;
    private Integer catches;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tournament_id")
    private Tournament tournament;

}
