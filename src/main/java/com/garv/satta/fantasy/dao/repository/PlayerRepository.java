package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.backoffice.Player;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PlayerRepository extends CrudRepository<Player, Long> {

    List<Player> findAll();
    Player findPlayerById(Long id);
    Player findPlayerByName(Long id);
    List<Player> findAllById(List<Long> playerIds);
}
