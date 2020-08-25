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
    List<Match> findAll();
    Match findMatchById(Long id);
    @EntityGraph(value = "Match.matchschedule")
    @Query("Select m from Match m where m.matchTime > :current order by m.matchTime desc")
    List<Match> findUpcomingMatches(@Param("current") DateTime currentTime);

    @EntityGraph(value = "Match.matchschedule")
    @Query("Select m from Match m where m.matchTime < :current order by m.matchTime desc")
    List<Match> findCompletedMatches(@Param("current") DateTime currentTime);

}
