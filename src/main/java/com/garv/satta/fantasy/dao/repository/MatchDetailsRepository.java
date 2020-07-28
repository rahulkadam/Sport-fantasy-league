package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.backoffice.MatchDetails;
import org.springframework.data.repository.CrudRepository;

public interface MatchDetailsRepository extends CrudRepository<MatchDetails, Long> {

    MatchDetails findMatchDetailsByMatchId(Long id);
    MatchDetails findMatchDetailsById(Long id);

}
