package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.MatchDetailsDTO;
import com.garv.satta.fantasy.service.MatchDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/fantasy/matchdetails")
public class MatchDetailsController {

    @Autowired
    private MatchDetailsService service;

    @PostMapping(value = "/upload/matchresult")
    @ResponseBody
    public String uploadMatchResult(@RequestBody MatchDetailsDTO detailsDTO) {
        service.uploadMatchResult(detailsDTO);
        return "Match Result uploaded successfully";
    }

    @GetMapping(value = "/get/{id}")
    public MatchDetailsDTO getDetailsById(@PathVariable(name = "id") Long id) {
        return service.getDetailsById(id);
    }

    @GetMapping(value = "/get/match/{id}")
    public MatchDetailsDTO getDetailsByMatchScheduleId(@PathVariable(name = "id") Long id) {
        return service.getDetailsByMatchScheduleId(id);
    }

}
