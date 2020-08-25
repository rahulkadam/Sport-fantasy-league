package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.frontoffice.PlayerUserTeam;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import com.garv.satta.fantasy.model.idclass.PlayerUserTeamId;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlayerUserTeamRepository extends CrudRepository<PlayerUserTeam, PlayerUserTeamId> {

    @Query("SELECT query.player FROM PlayerUserTeam query join fetch " +
            "query.player.teams teams WHERE query.userTeam = :userTeam")
    List<Player> findPlayerByUserTeam(@Param("userTeam") UserTeam userTeam);
    @Query("SELECT query.userTeam FROM PlayerUserTeam query WHERE query.player = :player")
    List<UserTeam> findUserTeamByPlayer(@Param("player") Player player);
    List<PlayerUserTeam>  findAll();
}
