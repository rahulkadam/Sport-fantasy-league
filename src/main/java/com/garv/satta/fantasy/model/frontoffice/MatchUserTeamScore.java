package com.garv.satta.fantasy.model.frontoffice;

import com.garv.satta.fantasy.model.backoffice.MatchDetails;
import com.garv.satta.fantasy.model.backoffice.Player;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
public class MatchUserTeamScore  implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Integer current_match_point;
    private Integer totalPoint;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_team_id", nullable = false)
    private Player player;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "match_id", nullable = false)
    private MatchDetails matchDetails;

}
