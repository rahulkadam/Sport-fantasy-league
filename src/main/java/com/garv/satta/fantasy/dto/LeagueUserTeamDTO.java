package com.garv.satta.fantasy.dto;

import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.frontoffice.League;
import com.garv.satta.fantasy.model.frontoffice.User;
import lombok.Data;

import java.util.List;

@Data
public class LeagueUserTeamDTO extends BaseDTO {

    private String name;
    private Boolean status;
    private Integer creditbalance;
    private Integer total_score;
    private Integer total_Transfer;
    private Integer used_Transfer;
    private Integer remained_Transfer;
    private Integer current_Used_Transfer;
    private LeagueDTO league;
    private UserDTO user;
    private PlayerDTO captain_player;
    private List<PlayerDTO> teamPlayers;
    private Long fantasyleagueId;
    private Long fantasyUserId;
    private Long team_captain_player_Id;
    private List<Long> user_team_playerIds;

}
