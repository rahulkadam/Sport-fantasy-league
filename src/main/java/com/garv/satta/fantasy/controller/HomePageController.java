package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.MatchDTO;
import com.garv.satta.fantasy.dto.MatchPlayerScoreDTO;
import com.garv.satta.fantasy.dto.PlayerDTO;
import com.garv.satta.fantasy.service.MatchPlayerScoreService;
import com.garv.satta.fantasy.service.MatchService;
import com.garv.satta.fantasy.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/public/home")
public class HomePageController {

    @Autowired
    private MatchService matchService;

    @Autowired
    private PlayerService playerService;

    @Autowired
    private MatchPlayerScoreService playerScoreService;

    @GetMapping(value = "/comingmatches")
    public List<MatchDTO> getUpcomingMatches() {
        return matchService.getUpComingMatchList();
    }

    @GetMapping(value = "/topPlayerScore")
    public List<MatchPlayerScoreDTO> getTopPerformer() {
        return playerScoreService.getTopPerformerPlayer();
    }

    @GetMapping(value = "/topPickedPlayer")
    public List<PlayerDTO> getTopPickedPlayer() {
        return playerService.getTopPickedPlayer();
    }

}
