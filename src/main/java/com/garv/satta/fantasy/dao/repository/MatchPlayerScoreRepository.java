package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.backoffice.MatchPlayerScore;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MatchPlayerScoreRepository extends CrudRepository<MatchPlayerScore, Long> {

    List<MatchPlayerScore> findAll();
    MatchPlayerScore findMatchPlayerScoreById(Long id);

    @EntityGraph(value = "MatchPlayerScore.full")
    List<MatchPlayerScore> findMatchPlayerScoreByPlayerId(Long id);

    @EntityGraph(value = "MatchPlayerScore.full")
    List<MatchPlayerScore> findMatchPlayerScoreByMatchId(Long id);

    @EntityGraph(value = "MatchPlayerScore.full")
    List<MatchPlayerScore> findMatchPlayerScoreByMatchIdIn(long[] matchids);

    @EntityGraph(value = "MatchPlayerScore.full")
    MatchPlayerScore findPlayerScoreByMatchIdAndPlayerId(Long matchId, Long playerId);

    @EntityGraph(value = "MatchPlayerScore.full")
    List<MatchPlayerScore> findMatchPlayerScoreByMatchIdAndPlayerIdIn(Long matchId, long[] playerId);

    MatchPlayerScore findFirstByMatchId(Long matchId);

}
