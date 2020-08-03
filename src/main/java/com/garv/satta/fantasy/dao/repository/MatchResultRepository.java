package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.backoffice.MatchResult;
import org.springframework.data.repository.CrudRepository;

public interface MatchResultRepository extends CrudRepository<MatchResult, Long> {

    MatchResult findMatchResultByMatchId(Long id);
    MatchResult findMatchResultById(Long id);

}
