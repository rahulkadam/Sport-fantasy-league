package com.garv.satta.fantasy.controller.admin;

import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.service.CalculatePointsService;
import com.garv.satta.fantasy.service.MatchPlayerScoreService;
import com.garv.satta.fantasy.service.MatchService;
import com.garv.satta.fantasy.service.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value = "/admin/matchprocess")
public class MatchProcessController {

    @Autowired
    private MatchPlayerScoreService matchPlayerScoreService;

    @Autowired
    private CalculatePointsService calculatePointsService;

    @Autowired
    private MatchService matchService;

    @Autowired
    private TournamentService tournamentService;

    @PostMapping(value = "/init/match")
    @ResponseBody
    public String initializeMatchForTournament(@RequestBody RequestDTO requestDTO) {
        calculatePointsService.initializeMatchForTournament(requestDTO);
        return "Match Initialize successfully";
    }

    @PostMapping(value = "/init/user")
    @ResponseBody
    public String initializeUserScoreForMatch(@RequestBody RequestDTO requestDTO) {
        calculatePointsService.initUserScoreForMatch(requestDTO);
        return "User Team Initialize successfully";
    }

    @PostMapping(value = "/start/match")
    @ResponseBody
    public String startMatch(@RequestBody RequestDTO requestDTO) {
        matchService.startMatch(requestDTO.getMatchId());
        return "Match Started successfully";
    }

    @PostMapping(value = "/complete/match")
    @ResponseBody
    public String completeMatch(@RequestBody RequestDTO requestDTO) {
        matchService.completeMatch(requestDTO.getMatchId());
        return "Match Completed successfully";
    }

    @PostMapping(value = "/lockTournament")
    @ResponseBody
    public String lockTournament(@RequestBody RequestDTO dto) {
        tournamentService.lockTournament(dto);
        return "Tournament Locked successfully";
    }

    @PostMapping(value = "/unlockTournament")
    @ResponseBody
    public String unlockTournament(@RequestBody RequestDTO dto) {
        tournamentService.unlockTournament(dto);
        return "Tournament UnLocked successfully";
    }

    @PostMapping(value = "/reset/lastscore")
    @ResponseBody
    public String resetToLastScore(@RequestBody RequestDTO dto) {
        calculatePointsService.resetToLastScore(dto);
        return "Score reset successfully ";
    }

}
