package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dao.repository.VenueRepository;
import com.garv.satta.fantasy.model.backoffice.Venue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/fantasy/venue")
public class VenueController {

    @Autowired
    private VenueRepository venueRepository;

    @GetMapping(value = "/list")
    @ResponseBody
    public Iterable<Venue> getVenueList() {
        return venueRepository.findAll();
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public Venue createVenue(@RequestBody Venue venue) {
        return venueRepository.save(venue);
    }
}
