package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.backoffice.Match;
import org.joda.time.DateTime;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MatchRepository extends CrudRepository<Match, Long> {

    @EntityGraph(value = "Match.matchschedule")
    List<Match> findAllByIsDeleted(Boolean isDeleted);
    Match findMatchById(Long id);
    @EntityGraph(value = "Match.matchschedule")
    List<Match> findUpcomingMatchesByMatchTimeGreaterThanEqualAndIsDeleted(DateTime currentTime, Boolean isDeleted);

    @EntityGraph(value = "Match.matchschedule")
    List<Match> findCompletedMatchesByMatchTimeLessThanEqualAndIsDeleted(DateTime currentTime, Boolean isDeleted);

    @EntityGraph(value = "Match.matchschedule")
    List<Match> findFirst5ByMatchTimeGreaterThanEqualAndIsDeletedOrderByMatchTimeAsc(DateTime currentTime, Boolean isDeleted);
    @EntityGraph(value = "Match.matchschedule")

    List<Match> findFirst2ByMatchTimeGreaterThanEqualAndIsDeletedOrderByMatchTimeAsc(DateTime currentTime, Boolean isDeleted);

    List<Match> findMatchesByStatus(Boolean status);

    Match findFirstByMatchTimeGreaterThanEqualAndIsDeleted(DateTime currentTime, Boolean isDeleted);

}
