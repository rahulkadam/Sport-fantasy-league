package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.VenueRepository;
import com.garv.satta.fantasy.model.backoffice.Venue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VenueService {

    @Autowired
    private VenueRepository venueRepository;

    public Iterable<Venue> getVenueList() {
        return venueRepository.findAll();
    }

    public Venue createVenue(Venue venue) {
        return venueRepository.save(venue);
    }
}
