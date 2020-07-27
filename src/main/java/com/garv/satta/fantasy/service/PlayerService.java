package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.PlayerRepository;
import com.garv.satta.fantasy.dto.PlayerDTO;
import com.garv.satta.fantasy.dto.converter.PlayerConverter;
import com.garv.satta.fantasy.model.backoffice.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private PlayerConverter playerConverter;


    public List<PlayerDTO> getPlayerList() {
        List<Player> playerList = playerRepository.findAll();
        return playerConverter.convertToDTOList(playerList);
    }

    public PlayerDTO createPlayer(PlayerDTO playerDTO) {
        Player player = playerConverter.convertToEntity(playerDTO);
        player = playerRepository.save(player);
        return playerConverter.convertToDTO(player);
    }
}
