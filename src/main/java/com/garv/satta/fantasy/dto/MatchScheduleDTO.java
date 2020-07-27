package com.garv.satta.fantasy.dto;

import lombok.Data;
import org.joda.time.DateTime;

@Data
public class MatchScheduleDTO extends BaseDTO {
    private String description;
    private DateTime matchTime;
    private Boolean status;
    private VenueDTO venue;
    private TeamDTO team_host;
    private TeamDTO team_away;
    private TournamentDTO tournament;
}
