package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.frontoffice.League;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LeagueRepository extends CrudRepository<League, Long> {

    List<League> findAll();
    List<League> findLeagueByName(String name);
    League findLeagueById(Long id);
    League findLeagueByLeagueCode(String leagueCode);

    @EntityGraph(value = "League.userTeams")
    List<League> findLeagueByTournamentId(Long id);
    List<League> findLeagueByPublicLeague(Boolean isPublic);
}
