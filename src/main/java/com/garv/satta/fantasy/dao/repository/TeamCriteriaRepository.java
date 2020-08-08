package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.dto.TeamCriteriaDTO;
import com.garv.satta.fantasy.model.backoffice.TeamCriteria;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TeamCriteriaRepository extends CrudRepository<TeamCriteria, TeamCriteriaDTO> {
    List<TeamCriteria> findAll();
    List<TeamCriteria> findTeamCriteriaByGame(Long game);
    TeamCriteria findTeamCriteriaById(Long id);
}
