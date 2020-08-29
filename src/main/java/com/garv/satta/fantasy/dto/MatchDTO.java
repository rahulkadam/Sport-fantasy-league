package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.joda.time.DateTime;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MatchDTO extends ShortBaseDTO {
    private String description;
    private DateTime matchTime;
    private Boolean status;
    private Long venueId;
    private Long team_host_id;
    private Long team_away_id;
    private Long tournament_id;
    private Long matchResultId;
    private String team_host_name;
    private String team_away_name;
    private String tournament_name;
    private String venue_name;
    private Integer external_mid;
    private VenueDTO venueDTO;
    private TeamDTO team_hostTeamDTO;
    private TeamDTO team_awayTeamDTO;
    private TournamentDTO tournamentDTO;
    private MatchResultDTO matchResultDTO;
    private List<MatchPlayerScoreDTO> matchPlayerScoreDTOList;
}
