package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserTeamRepository extends JpaRepository<UserTeam, Long> {

    List<UserTeam> findAll();
    @EntityGraph(value = "UserTeam.leagueUserTeams")
    List<UserTeam> findUserTeamByUserId(Long id);
    UserTeam findUserTeamById(Long id);

    @EntityGraph(value = "UserTeam.playerUserTeams")
    Page<UserTeam> findUserTeamByTournamentId(Long id, Pageable pageable);

    @EntityGraph(value = "UserTeam.playerUserTeams")
    List<UserTeam> findUserTeamByTournamentId(Long id);

    @Query("Update UserTeam u Set u.total_score = u.last_score where u.tournament.id = :tid")
    void resetToLastScoreByTournamentId(@Param("tid") Long id);
}
