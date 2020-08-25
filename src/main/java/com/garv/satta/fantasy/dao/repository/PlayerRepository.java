package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.backoffice.Player;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PlayerRepository extends CrudRepository<Player, Long> {

    @EntityGraph(value = "Player.teams")
    List<Player> findAll();
    Player findPlayerById(Long id);
    Player findPlayerByName(String name);
    List<Player> findAllByIdIn(List<Long> playerIds);
}
