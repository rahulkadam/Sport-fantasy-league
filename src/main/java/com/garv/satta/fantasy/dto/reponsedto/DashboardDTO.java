package com.garv.satta.fantasy.dto.reponsedto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.garv.satta.fantasy.dto.LeagueDTO;
import com.garv.satta.fantasy.dto.MatchDTO;
import com.garv.satta.fantasy.dto.MatchPlayerScoreDTO;
import com.garv.satta.fantasy.dto.UserTeamDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DashboardDTO {
    List<LeagueDTO> publicLeagues;
    UserTeamDTO userTeamDTO;
    List<MatchDTO> liveMatches;
    List<MatchPlayerScoreDTO> livePlayerScores;
}
