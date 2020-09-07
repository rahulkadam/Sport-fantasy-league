package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.LeagueUserTeamDTO;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import com.garv.satta.fantasy.model.frontoffice.User;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class LeagueUserTeamConverter extends Converter<LeagueUserTeam, LeagueUserTeamDTO> {
    @Override
    public LeagueUserTeam convertToEntity(LeagueUserTeamDTO dto) {
        return mapper.map(dto, LeagueUserTeam.class);
    }

    @Override
    public LeagueUserTeamDTO convertToDTO(LeagueUserTeam entity) {
       LeagueUserTeamDTO leagueUserTeamDTO =  mapper.map(entity, LeagueUserTeamDTO.class);
       UserTeam userTeam = entity.getUserTeam();
       User user = userTeam.getUser();
       leagueUserTeamDTO.setUserId(user.getId());
       leagueUserTeamDTO.setUserName(user.getName());
       leagueUserTeamDTO.setScore(userTeam.getTotal_score());
       leagueUserTeamDTO.setTeamName(userTeam.getName());
       return leagueUserTeamDTO;
    }

    @Override
    public List<LeagueUserTeamDTO> convertToDTOList(List<LeagueUserTeam> list) {
        return list.stream()
                .map(entity -> convertToDTO(entity))
                .collect(Collectors.toList());
    }

    @Override
    public LeagueUserTeam convertToFullEntity(LeagueUserTeamDTO dto) {
        return null;
    }

    @Override
    public LeagueUserTeamDTO convertToFullDTO(LeagueUserTeam entity) {
        return null;
    }

    @Override
    public LeagueUserTeam convertToShortEntity(LeagueUserTeamDTO dto) {
        return null;
    }
}
