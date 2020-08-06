package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserTeamRepository extends CrudRepository<UserTeam, Long> {

    List<UserTeam> findAll();
    List<UserTeam> findUserTeamByUserId(Long id);
    UserTeam findUserTeamById(Long id);
    List<UserTeam> findUserTeamByTournamentId(Long id);
}
