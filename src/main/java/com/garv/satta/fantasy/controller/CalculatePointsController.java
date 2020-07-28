package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.service.CalculatePointsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/process/point")
public class CalculatePointsController {

    @Autowired
    private CalculatePointsService service;

    @GetMapping(value = "/bymatch/{id}")
    public String calculateByMatchId(@PathVariable(name = "id") Long id) {
        service.calculateByMatchId(id);
        return "Points calculated and updated successfully for match : "+ id;
    }
}
