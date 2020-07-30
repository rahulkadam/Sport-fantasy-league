package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LeagueUserTeamRepository extends CrudRepository<LeagueUserTeam, Long> {

    List<LeagueUserTeam> findAll();
    LeagueUserTeam findLeagueUserTeamByUserId(Long id);
    LeagueUserTeam findLeagueUserTeamById(Long id);
}
