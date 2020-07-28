package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.MatchScheduleDTO;
import com.garv.satta.fantasy.service.MatchScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/fantasy/matchschedule")
public class MatchScheduleController {

    @Autowired
    private MatchScheduleService service;


    @GetMapping(value = "/list")
    @ResponseBody
    public List<MatchScheduleDTO> getMatchScheduleList() {
        return service.getMatchScheduleList();
    }

    @GetMapping(value = "/get/{id}")
    @ResponseBody
    public MatchScheduleDTO getMatchScheduleById(@PathVariable(name = "id") Long id) {
        return service.getMatchScheduleById(id);
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public MatchScheduleDTO createMatchSchedule(@RequestBody MatchScheduleDTO venue) {
        return service.createMatchSchedule(venue);
    }
}
