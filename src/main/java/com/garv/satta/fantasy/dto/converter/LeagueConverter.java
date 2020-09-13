package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dao.repository.LeagueUserTeamRepository;
import com.garv.satta.fantasy.dto.LeagueDTO;
import com.garv.satta.fantasy.dto.LeagueUserTeamDTO;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import com.garv.satta.fantasy.model.frontoffice.League;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import com.garv.satta.fantasy.model.frontoffice.User;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import com.garv.satta.fantasy.service.admin.FantasyConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class LeagueConverter extends Converter<League, LeagueDTO> {

    @Autowired
    private LeagueUserTeamConverter userTeamConverter;

    @Autowired
    private LeagueUserTeamRepository repository;

    @Autowired
    private FantasyConfigService fantasyConfigService;

    public League convertToEntity(LeagueDTO dto) {
        return mapper.map(dto, League.class);
    }

    public League convertToFullEntity(LeagueDTO dto) {
        League league = convertToEntity(dto);
        Long userId = dto.getCreateByUserId();
        User user = new User(userId);
        league.setCreated_by(user);
        league.setUpdated_by(user);
        Long tournamentId = dto.getTournamentId();
        Tournament tournament = new Tournament(tournamentId);
        league.setTournament(tournament);
        return league;
    }

    public LeagueDTO convertToDTO(League entity) {
        return mapper.map(entity, LeagueDTO.class);
    }

    public LeagueDTO convertToFullDTO(League entity) {
        LeagueDTO dto = convertToDTO(entity);
        Boolean isPublicLeague  = entity.getPublicLeague() != null && entity.getPublicLeague();
        List<LeagueUserTeam> leagueUserTeams = entity.getLeagueUserTeams();
        if (!isPublicLeague && !leagueUserTeams.isEmpty()) {
            List<LeagueUserTeamDTO> leagueUserTeamDTOS = userTeamConverter.convertToDTOList(leagueUserTeams);
            dto.setLeagueUserTeamDTOS(leagueUserTeamDTOS);
        }
        dto.setUserRank(10);
        return dto;
    }

    public LeagueDTO convertToFullDTO(League entity, Long userTeamId, boolean showPublicLeague) {
        LeagueDTO dto = convertToDTO(entity);
        Boolean isPublicLeague  = entity.getPublicLeague() != null && entity.getPublicLeague();
        List<LeagueUserTeam> leagueUserTeams = entity.getLeagueUserTeams();
        if (leagueUserTeams.isEmpty()) {
            return dto;
        }
        if (!isPublicLeague || showPublicLeague) {
            LeagueUserTeam leagueUserTeam = leagueUserTeams.stream().filter(team ->team.getUser_team_id().equals(userTeamId)).findFirst().orElse(null);
            List<LeagueUserTeamDTO> leagueUserTeamDTOS = userTeamConverter.convertToDTOList(leagueUserTeams);
            dto.setLeagueUserTeamDTOS(leagueUserTeamDTOS);
            if (leagueUserTeam != null) {
                dto.setUserRank(leagueUserTeam.getUserrank());
            }
            dto.setPublicLeague(false);
        } else {
            LeagueUserTeam leagueUserTeam = repository.findUserRankingByUserTeamAndLeague(new UserTeam(userTeamId), entity);
            if (leagueUserTeam != null) {
                dto.setUserRank(leagueUserTeam.getUserrank());
            }
            dto.setPublicLeague(true);
        }
        return dto;
    }

    @Override
    public League convertToShortEntity(LeagueDTO dto) {
        return null;
    }

    public List<LeagueDTO> convertToDTOList(List<League> entityList) {
        return mapToDTOList(entityList, LeagueDTO.class);
    }

    public List<LeagueDTO> convertToFullDTOList(List<League> entityList) {
        return entityList.stream()
                .map(entity -> convertToFullDTO(entity))
                .collect(Collectors.toList());
    }

    public List<LeagueDTO> convertToFullDTOListWithUserTeamId(List<League> entityList, Long userTeamId) {
        boolean showPublicLeague = fantasyConfigService.getShowPublicLeagueKeyValue();
        return entityList.stream()
                .map(entity -> convertToFullDTO(entity, userTeamId, showPublicLeague))
                .collect(Collectors.toList());
    }

}
