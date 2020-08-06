package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.frontoffice.League;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import com.garv.satta.fantasy.model.idclass.LeagueUserTeamId;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LeagueUserTeamRepository extends CrudRepository<LeagueUserTeam, LeagueUserTeamId>,
        JpaSpecificationExecutor<LeagueUserTeam> {

    @Query("SELECT query.league FROM LeagueUserTeam query WHERE query.userTeam = :userTeam")
    List<League> findLeagueByUserTeam(@Param("userTeam") UserTeam userTeam);
    @Query("SELECT query.userTeam FROM LeagueUserTeam query WHERE query.league = :league")
    List<UserTeam> findUserTeamByLeague(@Param("league")League league);
    List<LeagueUserTeam>  findAll();

}
