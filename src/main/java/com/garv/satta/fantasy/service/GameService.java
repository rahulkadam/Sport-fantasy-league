package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.GameRepository;
import com.garv.satta.fantasy.dto.GameDTO;
import com.garv.satta.fantasy.dto.converter.GameConverter;
import com.garv.satta.fantasy.model.backoffice.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameRepository repository;

    @Autowired
    private GameConverter converter;

    public GameDTO createGame(GameDTO gameDTO) {
        Game game = converter.convertToEntity(gameDTO);
        game = repository.save(game);
        return converter.convertToDTO(game);
    }

    public GameDTO findGameById(Long id) {
        Game game = repository.findGameById(id);
        return converter.convertToDTO(game);
    }

    public List<GameDTO> getGameList() {
        List<Game> list = repository.findAll();
        return converter.convertToDTOList(list);
    }

}
