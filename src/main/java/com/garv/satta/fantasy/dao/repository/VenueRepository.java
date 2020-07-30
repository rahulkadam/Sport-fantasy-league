package com.garv.satta.fantasy.dao.repository;

import com.garv.satta.fantasy.model.backoffice.Venue;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface VenueRepository extends CrudRepository<Venue, Long> {

    List<Venue> findAll();
    Venue findVenueById(Long id);
    Venue findByName(String name);
}
