package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.joda.time.DateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MatchDTO extends BaseDTO {
    private String description;
    private DateTime matchTime;
    private Boolean status;
    private Long venueId;
    private Long team_host_id;
    private Long team_away_id;
    private Long tournament_id;
    private VenueDTO venueDTO;
    private TeamDTO team_hostTeamDTO;
    private TeamDTO team_awayTeamDTO;
    private TournamentDTO tournamentDTO;
}
