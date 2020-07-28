package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.LeagueUserTeamDTO;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.frontoffice.League;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import com.garv.satta.fantasy.model.frontoffice.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class LeagueUserTeamConverter extends Converter<LeagueUserTeam, LeagueUserTeamDTO> {

    public LeagueUserTeam convertToEntity(LeagueUserTeamDTO dto) {
        LeagueUserTeam leagueUserTeam = mapper.map(dto, LeagueUserTeam.class);
        return leagueUserTeam;
    }

    public LeagueUserTeam convertToFullEntity(LeagueUserTeamDTO dto) {
        LeagueUserTeam leagueUserTeam = convertToEntity(dto);


        Player captionPlayer = new Player(dto.getTeam_captain_player_Id());
        leagueUserTeam.setCaptain_player(captionPlayer);

        User user = new User(dto.getUserId());
        leagueUserTeam.setUser(user);

        Long leagueId = dto.getLeagueId();
        if (leagueId != null) {
            List<League> leagueList = new ArrayList<>();
            League league = new League(leagueId);
            leagueList.add(league);
            leagueUserTeam.setLeagues(leagueList);
        }

        return leagueUserTeam;
    }

    public LeagueUserTeamDTO convertToDTO(LeagueUserTeam entity) {
        return mapper.map(entity, LeagueUserTeamDTO.class);
    }

    @Override
    public LeagueUserTeamDTO convertToFullDTO(LeagueUserTeam entity) {
        LeagueUserTeamDTO leagueUserTeamDTO = convertToDTO(entity);
        leagueUserTeamDTO.setTeam_captain_player_Id(entity.getCaptain_player().getId());
        leagueUserTeamDTO.setUserId(entity.getUser().getId());
        return leagueUserTeamDTO;
    }

    @Override
    public LeagueUserTeam convertToShortEntity(LeagueUserTeamDTO dto) {
        return null;
    }

    public List<LeagueUserTeamDTO> convertToDTOList(List<LeagueUserTeam> entityList) {
        return mapToDTOList(entityList, LeagueUserTeamDTO.class);
    }
}
