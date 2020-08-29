package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.monitoring.TaskSchedular;
import org.springframework.data.repository.CrudRepository;

public interface TaskSchedularRepository extends CrudRepository<TaskSchedular, Long> {

    TaskSchedular findTaskById(Long id);
    TaskSchedular findTaskByName(String name);
    
}
