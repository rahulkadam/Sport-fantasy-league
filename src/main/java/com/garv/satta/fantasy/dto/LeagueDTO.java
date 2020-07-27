package com.garv.satta.fantasy.dto;

import com.garv.satta.fantasy.model.backoffice.Tournament;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import com.garv.satta.fantasy.model.frontoffice.User;
import lombok.Data;
import java.util.List;

@Data
public class LeagueDTO extends BaseDTO{

    private String name;
    private Boolean status;
    private String leagueCode;
    private User created_by;
    private User updated_by;
    private Tournament tournament;
    private List<LeagueUserTeamDTO> leagueMembers;
}
