package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.backoffice.TeamSquad;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TeamSquadRepository extends CrudRepository<TeamSquad, Long> {

    List<TeamSquad> findAll();
    TeamSquad findTeamSquadById(Long id);
    TeamSquad findTeamSquadByTeamId(Long id);
}
