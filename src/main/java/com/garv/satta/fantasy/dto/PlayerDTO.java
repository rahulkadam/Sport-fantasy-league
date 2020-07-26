package com.garv.satta.fantasy.dto;

import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.fantasyenum.PlayerEnum;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class PlayerDTO implements Serializable {

    private Long id;
    private String name;
    private PlayerEnum type;
    private String Country;
    private float value;
    private List<TeamDTO> teamDTOSet;

    public PlayerDTO(){}

    public PlayerDTO(Player player) {
        if (player != null) {
            this.Country = player.getCountry();
            this.id = player.getId();
            this.type = player.getType();
            this.name = player.getName();
            this.value = player.getValue();
            this.teamDTOSet = TeamDTO.convertToDTOSet(player.getTeams());
        }
    }

    public static Player convertFromDTO(PlayerDTO playerDTO) {
        if(playerDTO == null) {
            return null;
        }
        Player player = new Player();
        player.setCountry(playerDTO.getCountry());
        player.setName(playerDTO.getName());
        player.setId(playerDTO.getId());
        player.setType(playerDTO.getType());
        player.setValue(playerDTO.getValue());
        player.setTeams(TeamDTO.convertFromDTOSet(playerDTO.getTeamDTOSet()));

        return player;
    }



}
