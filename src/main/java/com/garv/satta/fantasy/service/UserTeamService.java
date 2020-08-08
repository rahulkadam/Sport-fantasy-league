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

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

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
        userTeam.setCreditbalance(FantasyConstant.DEFAULT_CREDIT_BALANCE);
        userTeam.setTotalbalance(FantasyConstant.DEFAULT_CREDIT_BALANCE);
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

    public void addPlayerListToUserTeam(RequestDTO dto) {
        Long userTeamId = dto.getAddTo();
        List<Long> addList = dto.getAddList();
        if (addList.size() != FantasyConstant.DEFAULT_SQUAD_LENGTH) {
            throw new GenericException("Please check team player list again again");
        }
        List<Player> playerList = new ArrayList<>();
        final AtomicReference<Float> teamValue = new AtomicReference<>(0f);
        if (addList != null) {
            addList.stream().forEach(playerId -> {
                Player player = playerRepository.findPlayerById(playerId);
                if (player == null) {
                    throw new GenericException("Player is not Valid :" + playerId);
                }
                playerList.add(player);
                Float value = teamValue.get() + player.getValue();
                teamValue.set(value);
            });
        }

        UserTeam userTeam = repository.findUserTeamById(userTeamId);

        Float creditBalance = userTeam.getTotalbalance() - teamValue.get();
        if (creditBalance < 0) {
            throw new GenericException("Team value exceeded, please check again");
        }
        userTeam.setCreditbalance(creditBalance);
        if (userTeam == null) {
            throw new GenericException("UserTeam is not Valid");
        }

        List<Player> playerList1 = playerUserTeamRepository.findPlayerByUserTeam(userTeam);
        if (playerList1.isEmpty()) {
         userTeam.setUsed_Transfer(0);
         userTeam.setCreditbalance(creditBalance);
        } else {
            long transferCount = playerList1.size() - playerList1.stream().filter(player -> addList.contains(player.getId())).count();
            Integer usedTransafer = (int) (userTeam.getUsed_Transfer() + transferCount);
            if (usedTransafer > userTeam.getTotal_Transfer()) {
                throw new GenericException("Transfer count exceeded is not Valid");
            }
            userTeam.setUsed_Transfer(usedTransafer);
            userTeam.setRemained_Transfer(userTeam.getTotal_Transfer() - usedTransafer);
        }

        userTeam.resetPlayerList(playerList);
        repository.save(userTeam);
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
