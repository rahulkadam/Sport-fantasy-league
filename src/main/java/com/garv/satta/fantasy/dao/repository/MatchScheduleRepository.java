package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.backoffice.MatchSchedule;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MatchScheduleRepository extends CrudRepository<MatchSchedule, Long> {

    List<MatchSchedule> findAll();
    MatchSchedule findMatchScheduleById(Long id);

}
