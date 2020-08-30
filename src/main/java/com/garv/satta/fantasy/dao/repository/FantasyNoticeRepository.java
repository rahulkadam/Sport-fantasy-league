package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.monitoring.FantasyError;
import com.garv.satta.fantasy.model.monitoring.FantasyNotice;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FantasyNoticeRepository extends CrudRepository<FantasyNotice, Long> {

    List<FantasyNotice> findAll();
    FantasyNotice findNoticeById(Long id);
    FantasyNotice findFirstByIsActive(Boolean status);
}
