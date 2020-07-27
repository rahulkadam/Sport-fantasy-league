package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.model.backoffice.Venue;
import com.garv.satta.fantasy.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/fantasy/venue")
public class VenueController {

    @Autowired
    private VenueService venueService;

    @GetMapping(value = "/list")
    @ResponseBody
    public Iterable<Venue> getVenueList() {
        return venueService.getVenueList();
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public Venue createVenue(@RequestBody Venue venue) {
        return venueService.createVenue(venue);
    }
}
