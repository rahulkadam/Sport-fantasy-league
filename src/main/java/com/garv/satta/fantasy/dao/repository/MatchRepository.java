package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.backoffice.Match;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MatchRepository extends CrudRepository<Match, Long> {

    List<Match> findAll();
    Match findMatchById(Long id);

}
