package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.GameRepository;
import com.garv.satta.fantasy.dao.repository.PlayerCriteriaRepository;
import com.garv.satta.fantasy.dao.repository.TeamCriteriaRepository;
import com.garv.satta.fantasy.dto.GameDTO;
import com.garv.satta.fantasy.dto.PlayerCriteriaDTO;
import com.garv.satta.fantasy.dto.TeamCriteriaDTO;
import com.garv.satta.fantasy.dto.converter.GameConverter;
import com.garv.satta.fantasy.dto.converter.PlayerCriteriaConverter;
import com.garv.satta.fantasy.dto.converter.TeamCriteriaConverter;
import com.garv.satta.fantasy.model.backoffice.Game;
import com.garv.satta.fantasy.model.backoffice.PlayerCriteria;
import com.garv.satta.fantasy.model.backoffice.TeamCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameRepository repository;

    @Autowired
    private GameConverter converter;

    @Autowired
    private TeamCriteriaConverter teamCriteriaConverter;
    @Autowired
    private TeamCriteriaRepository teamCriteriaRepository;

    @Autowired
    private PlayerCriteriaConverter playerCriteriaConverter;

    @Autowired
    private PlayerCriteriaRepository playerCriteriaRepository;

    public GameDTO createGame(GameDTO gameDTO) {
        Game game = converter.convertToEntity(gameDTO);
        game.setId(null);
        game = repository.save(game);
        return converter.convertToDTO(game);
    }

    public GameDTO findGameById(Long id) {
        Game game = repository.findGameById(id);
        return converter.convertToDTO(game);
    }

    @Cacheable(cacheNames = "GameCache" , keyGenerator = "customKeyGenerator")
    public GameDTO findGameByName(String name) {
        Game game = repository.findGameByName(name);
        return converter.convertToFullDTO(game);
    }

    public List<GameDTO> getGameList() {
        List<Game> list = repository.findAll();
        return converter.convertToFullDTOList(list);
    }

    public List<GameDTO> getGameShortList() {
        List<Game> list = repository.findAll();
        return converter.convertToDTOList(list);
    }

    public TeamCriteriaDTO addTeamCriteria(TeamCriteriaDTO teamCriteriaDTO) {
        TeamCriteria teamCriteria = teamCriteriaConverter.convertToEntity(teamCriteriaDTO);
        teamCriteria.setGame(new Game(teamCriteriaDTO.getGameId()));
        teamCriteria = teamCriteriaRepository.save(teamCriteria);
        return teamCriteriaConverter.convertToDTO(teamCriteria);
    }

    public List<TeamCriteriaDTO> getTeamCriteriaList() {
        List<TeamCriteria> teamCriteriaList = teamCriteriaRepository.findAll();
        return teamCriteriaConverter.convertToDTOList(teamCriteriaList);
    }

    public PlayerCriteriaDTO addPlayerCriteria(PlayerCriteriaDTO playerCriteriaDTO) {
        PlayerCriteria playerCriteria = playerCriteriaConverter.convertToEntity(playerCriteriaDTO);
        playerCriteria.setGame(new Game(playerCriteriaDTO.getGameId()));
        playerCriteria = playerCriteriaRepository.save(playerCriteria);
        return playerCriteriaConverter.convertToDTO(playerCriteria);
    }

    public List<PlayerCriteriaDTO> gePlayerCriteriaList() {
        List<PlayerCriteria> playerCriteriaList = playerCriteriaRepository.findAll();
        return playerCriteriaConverter.convertToDTOList(playerCriteriaList);
    }
}
