package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LeagueDTO extends ShortBaseDTO {

    private String name;
    private Boolean status;
    private String leagueCode;
    private Boolean publicLeague;
    private Integer userRank;
    private Boolean isMember;
    private Integer totalUserCount;
    private Long createByUserId;
    private Long tournamentId;
    private List<Long> userTeamList;
    private UserDTO created_by_UserDTO;
    private UserDTO updated_by_UserDTO;
    private TournamentDTO tournamentDTO;
    private List<LeagueUserTeamDTO> leagueUserTeamDTOS;
}
