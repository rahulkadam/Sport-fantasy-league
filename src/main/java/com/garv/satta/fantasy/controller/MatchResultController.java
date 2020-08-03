package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.MatchResultDTO;
import com.garv.satta.fantasy.service.MatchResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value = "/fantasy/matchdetails")
public class MatchResultController {

    @Autowired
    private MatchResultService service;

    @PostMapping(value = "/upload/matchresult")
    @ResponseBody
    public String uploadMatchResult(@RequestBody MatchResultDTO detailsDTO) {
        service.uploadMatchResult(detailsDTO);
        return "Match Result uploaded successfully";
    }

    @GetMapping(value = "/get/{id}")
    public MatchResultDTO getDetailsById(@PathVariable(name = "id") Long id) {
        return service.getResultById(id);
    }

    @GetMapping(value = "/get/match/{id}")
    public MatchResultDTO getDetailsByMatchId(@PathVariable(name = "id") Long id) {
        return service.getResultByMatchId(id);
    }

}
