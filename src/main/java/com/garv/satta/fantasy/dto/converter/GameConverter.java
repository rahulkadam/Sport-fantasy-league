package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.GameDTO;
import com.garv.satta.fantasy.model.backoffice.Game;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GameConverter extends Converter<Game, GameDTO> {
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

    @Override
    public Game convertToFullEntity(GameDTO dto) {
        return null;
    }

    @Override
    public GameDTO convertToFullDTO(Game entity) {
        return null;
    }

    @Override
    public Game convertToShortEntity(GameDTO dto) {
        return null;
    }
}
