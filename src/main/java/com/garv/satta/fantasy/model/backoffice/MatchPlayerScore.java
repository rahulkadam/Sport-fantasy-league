package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@NoArgsConstructor
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
    private Integer balls;
    private Integer strikeRate;
    private Integer dot_balls;
    private Integer fours;
    private Integer sixes;
    private Float overs;
    private Integer maiden;
    private Integer runs_concede;
    private Float economy;
    private Integer stumped;
    private Integer runout;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tournament_id")
    private Tournament tournament;


    public MatchPlayerScore(Long id) {
        super(id);
    }

    public MatchPlayerScore(Player player, Match match) {
        this.player = player;
        this.match = match;
    }

}
