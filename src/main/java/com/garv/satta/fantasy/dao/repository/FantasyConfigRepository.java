package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.monitoring.FantasyConfig;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FantasyConfigRepository extends CrudRepository<FantasyConfig, Long> {

    List<FantasyConfig> findAll();

    FantasyConfig findConfigByConfigkey(String key);
}
