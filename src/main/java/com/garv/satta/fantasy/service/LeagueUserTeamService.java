package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.Constant.FantasyConstant;
import com.garv.satta.fantasy.dao.repository.LeagueUserTeamRepository;
import com.garv.satta.fantasy.dao.repository.PlayerRepository;
import com.garv.satta.fantasy.dto.LeagueUserTeamDTO;
import com.garv.satta.fantasy.dto.converter.LeagueUserTeamConverter;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.fantasyenum.OperationEnum;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import com.garv.satta.fantasy.validation.PlayerValidator;
import com.garv.satta.fantasy.validation.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LeagueUserTeamService {

    @Autowired
    private LeagueUserTeamRepository repository;

    @Autowired
    private LeagueUserTeamConverter converter;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private PlayerValidator playerValidator;

    public LeagueUserTeamDTO getUserTeamByUser(Long id) {
        LeagueUserTeam leagueUserTeam = repository.findLeagueUserTeamByUserId(id);
        return converter.convertToFullDTO(leagueUserTeam);
    }

    public LeagueUserTeamDTO getUserTeamById(Long id) {
        LeagueUserTeam leagueUserTeam = repository.findLeagueUserTeamById(id);
        return converter.convertToFullDTO(leagueUserTeam);
    }

    public LeagueUserTeamDTO createLeagueUserTeam(LeagueUserTeamDTO userTeamDTO) {
        LeagueUserTeam leagueUserTeam = converter.convertToFullEntity(userTeamDTO);
        userValidator.validateUserId(userTeamDTO.getUserId());
        leagueUserTeam.setTotal_Transfer(FantasyConstant.DEFAULT_TOTAL_TRANSFER);
        leagueUserTeam.setTotal_score(0);
        leagueUserTeam.setRemained_Transfer(FantasyConstant.DEFAULT_TOTAL_TRANSFER);
        leagueUserTeam.setCurrent_Used_Transfer(0);
        leagueUserTeam.setUsed_Transfer(0);
        leagueUserTeam = repository.save(leagueUserTeam);
        return converter.convertToFullDTO(leagueUserTeam);
    }

    public void addPlayerToUserTeam(Long leagueuserTeamId, Long playerId) {
        addRemovePlayerToUserTeam(leagueuserTeamId, playerId, OperationEnum.ADD);
    }

    public void removePlayerFromUserTeam(Long leagueuserTeamId, Long playerId) {
        addRemovePlayerToUserTeam(leagueuserTeamId, playerId, OperationEnum.REMOVE);
    }

    private void addRemovePlayerToUserTeam(Long leagueuserTeamId, Long playerId, OperationEnum ops) {
        Player player = playerRepository.findPlayerById(playerId);
        LeagueUserTeam leagueUserTeam = repository.findLeagueUserTeamById(leagueuserTeamId);

        if (player == null || leagueUserTeam == null) {
            throw new GenericException("Player Or UserTeam is not Valid");
        }

        if (OperationEnum.ADD.equals(ops)) {
            leagueUserTeam.addPlayer(player);
        } else {
            leagueUserTeam.removePlayer(player);
        }
        repository.save(leagueUserTeam);

    }
}
