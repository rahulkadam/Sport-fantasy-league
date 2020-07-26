package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.backoffice.Player;
import org.springframework.data.repository.CrudRepository;

public interface PlayerRepository extends CrudRepository<Player, Long> {
}
