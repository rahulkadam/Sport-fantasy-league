package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dao.repository.FantasyNoticeRepository;
import com.garv.satta.fantasy.dto.LeagueDTO;
import com.garv.satta.fantasy.dto.MatchDTO;
import com.garv.satta.fantasy.dto.MatchPlayerScoreDTO;
import com.garv.satta.fantasy.dto.PlayerDTO;
import com.garv.satta.fantasy.dto.reponsedto.DashboardDTO;
import com.garv.satta.fantasy.model.monitoring.FantasyNotice;
import com.garv.satta.fantasy.service.*;
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
    private LeagueService leagueService;

    @Autowired
    private MatchPlayerScoreService playerScoreService;

    @Autowired
    private FantasyNoticeRepository noticeRepository;

    @Autowired
    private DashboardService dashboardService;

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

    @GetMapping(value = "list/public")
    public List<LeagueDTO> getLeagueByPublic() {
        return leagueService.getLeagueByPublic();
    }

    @GetMapping(value = "/matches/live")
    public List<MatchDTO> getLiveMatches() {
        return matchService.getLiveMatches();
    }

    @GetMapping(value = "/notice/active/list")
    public FantasyNotice getActiveNotice() {
        return noticeRepository.findFirstByIsActive(Boolean.TRUE);
    }
}
