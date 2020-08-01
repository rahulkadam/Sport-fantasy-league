package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.MatchPlayerScoreDTO;
import com.garv.satta.fantasy.service.MatchPlayerScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/fantasy/match/playerscore")
public class MatchPlayerScoreController {

    @Autowired
    private MatchPlayerScoreService service;

    @PostMapping(value = "/upload")
    @ResponseBody
    public String uploadPlayerScoreforMatch(@RequestBody MatchPlayerScoreDTO dto) {
        service.uploadPlayerScoreforMatch(dto);
        return "Score updated successfully";
    }

    @GetMapping(value = "list/player/{id}")
    @ResponseBody
    public List<MatchPlayerScoreDTO> getMatchScoreByPlayer(@PathVariable(name = "id") Long id) {
        return service.getMatchScoreByPlayer(id);
    }

}
