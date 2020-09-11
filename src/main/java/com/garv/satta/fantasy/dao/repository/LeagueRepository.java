package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.dao.repository.specification.ObjectId;
import com.garv.satta.fantasy.model.frontoffice.League;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeagueRepository extends JpaRepository<League, Long> {

    List<League> findAll();
    List<League> findLeagueByName(String name);
    League findLeagueById(Long id);
    League findLeagueByLeagueCode(String leagueCode);

    @EntityGraph(value = "League.userTeams")
    List<League> findLeagueByTournamentId(Long id);

    Page<ObjectId> findLeagueIdByTournamentId(Long id, Pageable page);

    @EntityGraph(value = "League.userTeams")
    List<League> findLeagueByIdIn(long[] id);

    @EntityGraph(value = "League.userTeams")
    Page<League> findLeagueByTournamentId(Long id, Pageable page);
    List<League> findLeagueByPublicLeague(Boolean isPublic);
}
