package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.monitoring.FantasyError;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FantasyErrorRepository extends CrudRepository<FantasyError, Long> {

    List<FantasyError> findAll();

    List<FantasyError> findFirst30ByOrderByIdDesc();


}
