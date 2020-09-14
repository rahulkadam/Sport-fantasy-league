package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.dao.repository.specification.ObjectId;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeamScorePerMatch;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LeagueUserTeamScorePerMatchRepository extends CrudRepository<LeagueUserTeamScorePerMatch, Long> {

    List<LeagueUserTeamScorePerMatch> findAll();

    LeagueUserTeamScorePerMatch findLeagueUserTeamScorePerMatchById(Long id);

    List<LeagueUserTeamScorePerMatch> findAllByMatchId(Long id);

    List<LeagueUserTeamScorePerMatch> findAllByUserTeamId(Long id);

    LeagueUserTeamScorePerMatch findTeamScoreByUserTeamIdAndMatchId(Long userTeamId , Long matchId);
    List<LeagueUserTeamScorePerMatch> findTeamScoreByUserTeamIdAndMatchIdIn(Long userTeamId , long[] matchId);

    LeagueUserTeamScorePerMatch findFirstByMatchId(Long matchId);

    Page<ObjectId> findLeagueUserTeamScorePerMatchIdsByMatchId(Long id, Pageable pageable);

    List<LeagueUserTeamScorePerMatch> findAllByIdIn(long[] id);


}
