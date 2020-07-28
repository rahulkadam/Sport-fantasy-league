package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.backoffice.MatchPlayerScore;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MatchPlayerScoreRepository extends CrudRepository<MatchPlayerScore, Long> {

    List<MatchPlayerScore> findAll();
    MatchPlayerScore findMatchPlayerScoreById(Long id);

    List<MatchPlayerScore> findMatchPlayerScoreByPlayerId(Long id);

    List<MatchPlayerScore> findMatchPlayerScoreByMatchDetailsId(Long id);

}
