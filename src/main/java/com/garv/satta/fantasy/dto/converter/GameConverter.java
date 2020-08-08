package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.GameDTO;
import com.garv.satta.fantasy.dto.PlayerCriteriaDTO;
import com.garv.satta.fantasy.dto.TeamCriteriaDTO;
import com.garv.satta.fantasy.model.backoffice.Game;
import com.garv.satta.fantasy.model.backoffice.PlayerCriteria;
import com.garv.satta.fantasy.model.backoffice.TeamCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class GameConverter extends Converter<Game, GameDTO> {

    @Autowired
    private TeamCriteriaConverter teamCriteriaConverter;

    @Autowired
    private PlayerCriteriaConverter playerCriteriaConverter;

    @Override
    public Game convertToEntity(GameDTO dto) {
        return mapper.map(dto, Game.class);
    }

    @Override
    public GameDTO convertToDTO(Game entity) {
        return mapper.map(entity, GameDTO.class);
    }

    @Override
    public List<GameDTO> convertToDTOList(List<Game> list) {
        return mapToDTOList(list, GameDTO.class);
    }

    public List<GameDTO> convertToFullDTOList(List<Game> list) {
        return list.stream()
                .map(entity -> convertToFullDTO(entity))
                .collect(Collectors.toList());
    }

    @Override
    public Game convertToFullEntity(GameDTO dto) {
        return null;
    }

    @Override
    public GameDTO convertToFullDTO(Game entity) {
        GameDTO gameDTO = convertToDTO(entity);
        TeamCriteria teamCriteria = entity.getTeamCriteria();
        TeamCriteriaDTO teamCriteriaDTO = teamCriteriaConverter.convertToDTO(teamCriteria);
        gameDTO.setTeamCriteriaDTO(teamCriteriaDTO);

        List<PlayerCriteria> playerCriteriaList = entity.getPlayerCriteriaList();
        List<PlayerCriteriaDTO> playerCriteriaDTOList = playerCriteriaConverter.convertToDTOList(playerCriteriaList);
        gameDTO.setPlayerCriteriaDTOList(playerCriteriaDTOList);
        return gameDTO;
    }

    @Override
    public Game convertToShortEntity(GameDTO dto) {
        return null;
    }
}
