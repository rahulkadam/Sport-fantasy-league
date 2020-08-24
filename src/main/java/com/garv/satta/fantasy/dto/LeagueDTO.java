package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import java.util.List;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        LeagueDTO leagueDTO = (LeagueDTO) o;
        return Objects.equals(leagueCode, leagueDTO.leagueCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), leagueCode);
    }
}
