package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.Constant.FantasyConstant;
import com.garv.satta.fantasy.dao.repository.LeagueUserTeamRepository;
import com.garv.satta.fantasy.dao.repository.PlayerRepository;
import com.garv.satta.fantasy.dto.LeagueUserTeamDTO;
import com.garv.satta.fantasy.dto.PlayerDTO;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.dto.converter.LeagueUserTeamConverter;
import com.garv.satta.fantasy.dto.converter.PlayerConverter;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.fantasyenum.OperationEnum;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import com.garv.satta.fantasy.validation.PlayerValidator;
import com.garv.satta.fantasy.validation.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Autowired
    private PlayerConverter playerConverter;

    public List<LeagueUserTeamDTO> getUserTeamByUser(Long id) {
        List<LeagueUserTeam> leagueUserTeamlist = repository.findLeagueUserTeamByUserId(id);
        return converter.convertToDTOList(leagueUserTeamlist);
    }

    public LeagueUserTeamDTO getUserTeamById(Long id) {
        LeagueUserTeam leagueUserTeam = repository.findLeagueUserTeamById(id);
        return converter.convertToFullDTO(leagueUserTeam);
    }

    public List<PlayerDTO> getPlayerListByUserTeamId(Long id) {
        LeagueUserTeam leagueUserTeam = repository.findLeagueUserTeamById(id);
        if (leagueUserTeam == null){
           throw new GenericException("User is not valid, please check again");
        }

        List<Player> playerList = leagueUserTeam.getTeamPlayers();
        return playerConverter.convertToDTOList(playerList);
    }

    public LeagueUserTeamDTO createLeagueUserTeam(LeagueUserTeamDTO userTeamDTO) {
        LeagueUserTeam leagueUserTeam = converter.convertToFullEntity(userTeamDTO);
        userValidator.validateUserId(userTeamDTO.getUserId());
        leagueUserTeam.setStatus(Boolean.TRUE);
        leagueUserTeam.setTotal_Transfer(FantasyConstant.DEFAULT_TOTAL_TRANSFER);
        leagueUserTeam.setTotal_score(0);
        leagueUserTeam.setRemained_Transfer(FantasyConstant.DEFAULT_TOTAL_TRANSFER);
        leagueUserTeam.setCurrent_Used_Transfer(0);
        leagueUserTeam.setUsed_Transfer(0);
        leagueUserTeam = repository.save(leagueUserTeam);
        return converter.convertToFullDTO(leagueUserTeam);
    }

    public void addPlayerToUserTeam(RequestDTO dto) {
        Long leagueuserTeamId = dto.getAddTo();
        Long playerId = dto.getAdd();
        List<Long> addList = dto.getAddList();
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
