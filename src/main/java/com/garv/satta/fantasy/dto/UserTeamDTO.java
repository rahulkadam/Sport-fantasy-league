package com.garv.satta.fantasy.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserTeamDTO extends BaseDTO {

    private String name;
    private String description;
    private Boolean status;
    private Integer creditbalance;
    private Integer totalbalance;
    private Integer total_score;
    private Integer last_score;
    private Integer total_Transfer;
    private Integer total_leagues;
    private Integer used_Transfer;
    private Integer remained_Transfer;
    private Integer current_Used_Transfer;
    private Long tournament_id;
    private List<LeagueDTO> leagueDTOList;
    private UserDTO userDTO;
    private PlayerDTO captain_playerDTO;
    private List<PlayerDTO> teamPlayersPlayerDTOList;
    private Long leagueId;
    private Long userId;
    private String userName;
    private String emailId;
    private Long team_captain_player_Id;
    private String captainName;
    private List<Long> user_team_playerIds;

}
