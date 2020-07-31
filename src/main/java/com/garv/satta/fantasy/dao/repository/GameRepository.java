package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.backoffice.Game;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface GameRepository extends CrudRepository<Game, Long> {

    List<Game> findAll();
    Game findGameById(Long id);
    Game findGameByName(String name);
}
