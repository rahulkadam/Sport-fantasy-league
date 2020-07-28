package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.backoffice.Team;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TeamRepository extends CrudRepository<Team, Long> {

    List<Team> findTeamByTournamentId(Long id);

    Team findTeamById(Long id);
}
