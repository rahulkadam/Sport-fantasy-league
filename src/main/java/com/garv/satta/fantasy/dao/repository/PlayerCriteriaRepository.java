package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.backoffice.PlayerCriteria;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PlayerCriteriaRepository extends CrudRepository<PlayerCriteria, Long> {

    List<PlayerCriteria> findAll();
    List<PlayerCriteria> findPlayerCriteriaByGame(Long gameId);
    PlayerCriteria findPlayerCriteriaById(Long id);
}
