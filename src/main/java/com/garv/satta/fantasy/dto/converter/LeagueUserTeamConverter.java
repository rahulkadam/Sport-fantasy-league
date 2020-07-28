package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.LeagueUserTeamDTO;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.frontoffice.League;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import com.garv.satta.fantasy.model.frontoffice.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class LeagueUserTeamConverter extends Converter<LeagueUserTeam, LeagueUserTeamDTO> {

    public LeagueUserTeam convertToEntity(LeagueUserTeamDTO dto) {
        LeagueUserTeam leagueUserTeam = mapper.map(dto, LeagueUserTeam.class);


        Long playerId = dto.getTeam_captain_player_Id();
        if (playerId != null) {
            Player captionPlayer = new Player(playerId);
            leagueUserTeam.setCaptain_player(captionPlayer);
        }

        Long userId = dto.getFantasyUserId();
        if(userId != null) {
            User user = new User(userId);
            leagueUserTeam.setUser(user);
        }

        List<Long> playerIdsList = dto.getUser_team_playerIds();
        if (playerIdsList != null) {
            List<Player> playerList = getPlayerListFromIds(playerIdsList);
            leagueUserTeam.setTeamPlayers(playerList);
        }

        Long leagueId = dto.getFantasyleagueId();
        if (leagueId != null) {
            League league = new League(leagueId);
            leagueUserTeam.setLeague(league);
        }

        return leagueUserTeam;
    }

    private List<Player> getPlayerListFromIds(List<Long> ids) {
        return ids.stream().map(id -> new Player(id)).collect(Collectors.toList());
    }

    public LeagueUserTeamDTO convertToDTO(LeagueUserTeam entity) {
        return mapper.map(entity, LeagueUserTeamDTO.class);

    }

    public List<LeagueUserTeamDTO> convertToDTOList(List<LeagueUserTeam> entityList){
        return mapToDTOList(entityList, LeagueUserTeamDTO.class);
    }
}
