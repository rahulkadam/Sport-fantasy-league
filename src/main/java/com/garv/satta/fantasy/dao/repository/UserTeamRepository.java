package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.dao.repository.specification.ObjectId;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import com.garv.satta.fantasy.model.monitoring.FantasyError;
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

    Page<ObjectId> findUserTeamIdsByTournamentId(Long id,Pageable pageable);

    @EntityGraph(value = "UserTeam.leagueUserTeams")
    Page<UserTeam> findUserTeamByTournamentId(Long id, Pageable pageable);

    @EntityGraph(value = "UserTeam.leagueUserTeams")
    List<UserTeam> findUserTeamByTournamentId(Long id);

    @EntityGraph(value = "UserTeam.playerUserTeams")
    List<UserTeam> findUserTeamByIdIn(long[] id);

    @Query("Update UserTeam u Set u.total_score = u.last_score where u.tournament.id = :tid")
    void resetToLastScoreByTournamentId(@Param("tid") Long id);

    List<UserTeam> findFirst30ByOrderByIdDesc();

}
