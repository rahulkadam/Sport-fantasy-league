package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.PlayerDTO;
import com.garv.satta.fantasy.model.backoffice.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PlayerConverter extends Converter<Player, PlayerDTO> {

    @Autowired
    private TeamConverter teamDTOConverter;

    public Player convertToEntity(PlayerDTO playerDTO) {
        Player player = mapper.map(playerDTO, Player.class);
        return player;
    }

    public PlayerDTO convertToDTO(Player player) {
        PlayerDTO playerDTO = mapper.map(player, PlayerDTO.class);
        return playerDTO;
    }

    @Override
    public Player convertToFullEntity(PlayerDTO dto) {
        return null;
    }

    @Override
    public PlayerDTO convertToFullDTO(Player entity) {
        return null;
    }

    @Override
    public Player convertToShortEntity(PlayerDTO dto) {
        return null;
    }

    public List<PlayerDTO> convertToDTOList(List<Player> playerList){
        return mapToDTOList(playerList, PlayerDTO.class);
    }

}
