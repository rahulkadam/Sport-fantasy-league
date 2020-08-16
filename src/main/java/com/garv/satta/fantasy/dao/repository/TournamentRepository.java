package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.backoffice.Tournament;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TournamentRepository extends CrudRepository<Tournament, Long> {

    List<Tournament> findAll();

    Tournament findTournamentByName(String name);

    Tournament findTournamentById(Long id);

    List<Tournament> findTournamentByStatus(Boolean status);

}
