package com.garv.satta.fantasy.model.backoffice;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;

@Entity
@Data
public class MatchDetails implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String description;

    private Date matchTime;

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
