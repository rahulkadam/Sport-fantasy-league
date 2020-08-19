package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.UserTeamDTO;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.frontoffice.League;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import com.garv.satta.fantasy.model.frontoffice.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserTeamConverter extends Converter<UserTeam, UserTeamDTO> {

    public UserTeam convertToEntity(UserTeamDTO dto) {
        UserTeam userTeam = mapper.map(dto, UserTeam.class);
        return userTeam;
    }

    public UserTeam convertToFullEntity(UserTeamDTO dto) {
        UserTeam userTeam = convertToEntity(dto);

        if (dto.getTeam_captain_player_Id() != null) {
            Player captionPlayer = new Player(dto.getTeam_captain_player_Id());
            userTeam.setCaptain_player(captionPlayer);
        }

        User user = new User(dto.getUserId());
        userTeam.setUser(user);

        Long leagueId = dto.getLeagueId();
        if (leagueId != null) {
            List<League> leagueList = new ArrayList<>();
            League league = new League(leagueId);
            leagueList.add(league);
            ///userTeam.setLeagues(leagueList);
        }

        return userTeam;
    }

    public UserTeamDTO convertToDTO(UserTeam entity) {
        return mapper.map(entity, UserTeamDTO.class);
    }

    @Override
    public UserTeamDTO convertToFullDTO(UserTeam entity) {
        UserTeamDTO userTeamDTO = convertToDTO(entity);
        Player captain = entity.getCaptain_player();
        if (captain != null) {
            userTeamDTO.setTeam_captain_player_Id(captain.getId());
            userTeamDTO.setCaptainName(captain.getName());
        }
        userTeamDTO.setUserId(entity.getUser().getId());
        return userTeamDTO;
    }

    @Override
    public UserTeam convertToShortEntity(UserTeamDTO dto) {
        return null;
    }

    public List<UserTeamDTO> convertToDTOList(List<UserTeam> entityList) {
        return mapToDTOList(entityList, UserTeamDTO.class);
    }

    public List<UserTeamDTO> convertToFullDTOList(List<UserTeam> entityList) {
        return entityList.stream()
                .map(entity -> convertToFullDTO(entity))
                .collect(Collectors.toList());
    }
}
