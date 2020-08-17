package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeamScorePerMatch;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LeagueUserTeamScorePerMatchRepository extends CrudRepository<LeagueUserTeamScorePerMatch, Long> {

    List<LeagueUserTeamScorePerMatch> findAll();

    LeagueUserTeamScorePerMatch findLeagueUserTeamScorePerMatchById(Long id);

    List<LeagueUserTeamScorePerMatch> findAllByMatchId(Long id);

    List<LeagueUserTeamScorePerMatch> findAllByUserTeamId(Long id);

    List<LeagueUserTeamScorePerMatch> findAllByUserTeamIdAndMatchId(Long userTeamId , Long matchId);

}
