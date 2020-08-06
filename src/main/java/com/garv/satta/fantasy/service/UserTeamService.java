package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.Constant.FantasyConstant;
import com.garv.satta.fantasy.dao.repository.PlayerUserTeamRepository;
import com.garv.satta.fantasy.dao.repository.UserTeamRepository;
import com.garv.satta.fantasy.dao.repository.PlayerRepository;
import com.garv.satta.fantasy.dto.UserTeamDTO;
import com.garv.satta.fantasy.dto.PlayerDTO;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.dto.converter.UserTeamConverter;
import com.garv.satta.fantasy.dto.converter.PlayerConverter;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.fantasyenum.OperationEnum;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import com.garv.satta.fantasy.validation.PlayerValidator;
import com.garv.satta.fantasy.validation.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

@Service
public class UserTeamService {

    @Autowired
    private UserTeamRepository repository;

    @Autowired
    private UserTeamConverter converter;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private PlayerUserTeamRepository playerUserTeamRepository;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private PlayerValidator playerValidator;

    @Autowired
    private PlayerConverter playerConverter;

    public List<UserTeamDTO> getUserTeamByUser(Long id) {
        List<UserTeam> userTeamlist = repository.findUserTeamByUserId(id);
        return converter.convertToDTOList(userTeamlist);
    }

    public UserTeamDTO getUserTeamById(Long id) {
        UserTeam userTeam = repository.findUserTeamById(id);
        return converter.convertToFullDTO(userTeam);
    }

    public List<PlayerDTO> getPlayerListByUserTeamId(Long id) {
        UserTeam userTeam = repository.findUserTeamById(id);
        if (userTeam == null){
           throw new GenericException("User is not valid, please check again");
        }

        List<Player> playerList = playerUserTeamRepository.findPlayerByUserTeam(userTeam);
        return playerConverter.convertToDTOList(playerList);
    }

    public UserTeamDTO createUserTeam(UserTeamDTO userTeamDTO) {
        List<UserTeam> userTeamList = repository.findUserTeamByUserId(userTeamDTO.getUserId());

        if (!CollectionUtils.isEmpty(userTeamList)) {
            throw new GenericException("Team already present, please check with support team for details");
        }
        userValidator.validateUserId(userTeamDTO.getUserId());

        UserTeam userTeam = converter.convertToFullEntity(userTeamDTO);
        userTeam.setStatus(Boolean.TRUE);
        userTeam.setTotal_Transfer(FantasyConstant.DEFAULT_TOTAL_TRANSFER);
        userTeam.setTotal_score(0);
        userTeam.setRemained_Transfer(FantasyConstant.DEFAULT_TOTAL_TRANSFER);
        userTeam.setCurrent_Used_Transfer(0);
        userTeam.setUsed_Transfer(0);
        userTeam.setCaptain_player(null);
        userTeam = repository.save(userTeam);
        return converter.convertToFullDTO(userTeam);
    }

    public void addPlayerToUserTeam(RequestDTO dto) {
        Long userTeamId = dto.getAddTo();
        Long playerId = dto.getAdd();
        List<Long> addList = dto.getAddList();
        if (addList != null) {
            addList.stream().forEach(player -> {
                addRemovePlayerToUserTeam(userTeamId, player, OperationEnum.ADD);
            });
        }
        if (playerId != null) {
            addRemovePlayerToUserTeam(userTeamId, playerId, OperationEnum.ADD);
        }
    }

    public void removePlayerFromUserTeam(Long userTeamId, Long playerId) {
        addRemovePlayerToUserTeam(userTeamId, playerId, OperationEnum.REMOVE);
    }

    private void addRemovePlayerToUserTeam(Long userTeamId, Long playerId, OperationEnum ops) {
        Player player = playerRepository.findPlayerById(playerId);
        UserTeam userTeam = repository.findUserTeamById(userTeamId);

        if (player == null || userTeam == null) {
            throw new GenericException("Player Or UserTeam is not Valid");
        }

        if (OperationEnum.ADD.equals(ops)) {
            userTeam.addPlayer(player);
        } else {
            userTeam.removePlayer(player);
        }
        repository.save(userTeam);

    }
}
