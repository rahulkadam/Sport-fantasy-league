package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.Constant.FantasyConstant;
import com.garv.satta.fantasy.dao.repository.PlayerRepository;
import com.garv.satta.fantasy.dao.repository.TeamRepository;
import com.garv.satta.fantasy.dto.PlayerDTO;
import com.garv.satta.fantasy.dto.converter.PlayerConverter;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.fantasyenum.OperationEnum;
import com.garv.satta.fantasy.fantasyenum.PlayerEnum;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.backoffice.Team;
import com.garv.satta.fantasy.validation.PlayerValidator;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sun.net.www.content.text.Generic;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private PlayerConverter playerConverter;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private PlayerValidator validator;

    @Autowired
    private ExcelFileService excelFileService;

    public List<PlayerDTO> getPlayerList() {
        List<Player> playerList = playerRepository.findAll();
        return playerConverter.convertToFullDTOList(playerList);
    }

    public PlayerDTO createPlayer(PlayerDTO playerDTO) {
        Player player = playerConverter.convertToEntity(playerDTO);
        player.setId(null);
        validator.validatePlayerValue(player.getValue());
        player = playerRepository.save(player);
        return playerConverter.convertToDTO(player);
    }

    public void addTeamToPlayer(Long playerId, Long teamId) {
        addRemoveTeamFromPlayer(playerId, teamId, OperationEnum.ADD);
    }

    public void removeTeamFromPlayer(Long playerId, Long teamId) {
        addRemoveTeamFromPlayer(playerId, teamId, OperationEnum.REMOVE);
    }

    public void addRemoveTeamFromPlayer(Long playerId, Long teamId, OperationEnum ops) {
        Player player = playerRepository.findPlayerById(playerId);
        Team team = teamRepository.findTeamById(teamId);

        if (team == null || player == null) {
            throw new GenericException("Team or Player is Not Valid");
        }

        if (OperationEnum.ADD.equals(ops)) {
            player.addTeam(team);
        } else {
            player.removeTeam(team);
        }
        playerRepository.save(player);
    }

    public void uploadPlayerList(MultipartFile file) {
        Iterator<Row> rowList = excelFileService.readData(file);
        List<Player> playerList = new ArrayList<>();

        while (rowList.hasNext()) {
            Row row = rowList.next();
            String name = row.getCell(0).getStringCellValue();
            String country = row.getCell(1).getStringCellValue();
            String type = row.getCell(2).getStringCellValue();
            double value = row.getCell(3).getNumericCellValue();
            Player player = new Player();
            player.setValue((float) value);
            player.setCountry(country);
            player.setName(name);
            player.setType(PlayerEnum.valueOf(type));
            playerList.add(player);
        }
        playerRepository.saveAll(playerList);
    }


    public List<PlayerDTO> getTopPickedPlayer() {
        List<Player> playerList = playerRepository.findAll();
        return playerConverter.convertToFullDTOList(playerList);
    }
}
