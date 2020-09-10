package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.LeagueUserTeamScoreHistoryDTO;
import com.garv.satta.fantasy.dto.MatchDTO;
import com.garv.satta.fantasy.dto.MatchPlayerScoreDTO;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.dto.reponsedto.LiveMatchDataDTO;
import com.garv.satta.fantasy.service.LeagueUserTeamScorePerMatchService;
import com.garv.satta.fantasy.service.MatchPlayerScoreService;
import com.garv.satta.fantasy.service.MatchService;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/public/stats")
public class FantasyStatsController extends BaseController {

    @Autowired
    private MatchPlayerScoreService matchPlayerScoreService;

    @Autowired
    private MatchService matchService;

    @Autowired
    private LeagueUserTeamScorePerMatchService leagueUserTeamScorePerMatchService;

    @PostMapping(value = "/list/playerScoreByMatch")
    public ResponseEntity<List<MatchPlayerScoreDTO>> getPlayerScoreByMatch(@RequestBody RequestDTO dto) {
        List<MatchPlayerScoreDTO> list = matchPlayerScoreService.findMatchPlayerScoreByMatchId(dto.getId());
        return getResponseBodyWithCache(list, FOR_1_HOUR);
    }

    @PostMapping(value = "/list/playerScoreByLiveMatch")
    public ResponseEntity<LiveMatchDataDTO> getPlayeScoreByLiveMatch() {
        List<MatchDTO> matchDTOS = matchService.getLiveMatches();
        List<MatchPlayerScoreDTO> matchPlayerScoreDTOLIst =  new ArrayList<>();
        LiveMatchDataDTO liveMatchDataDTO = new LiveMatchDataDTO();

        if (CollectionUtils.isEmpty(matchDTOS)) {
            return getResponseBodyWithCache(liveMatchDataDTO, FOR_2_MIN);
        }
        long[] matchIds = matchDTOS.stream().mapToLong(matchDTO -> matchDTO.getId()).toArray();
        matchPlayerScoreDTOLIst =  matchPlayerScoreService.findMatchPlayerScoreByMatchIdIn(matchIds);
        liveMatchDataDTO.setPlayerScoreDTOS(matchPlayerScoreDTOLIst);
        liveMatchDataDTO.setMatchDTO(matchDTOS.get(0));  // returning result for 1 match for now
        return getResponseBodyWithCache(liveMatchDataDTO, FOR_2_MIN);
    }

    @PostMapping(value = "/list/playerScoringHistory")
    public ResponseEntity<List<MatchPlayerScoreDTO>> getMatchScoreByPlayer(@RequestBody RequestDTO dto) {
        List<MatchPlayerScoreDTO> list = matchPlayerScoreService.getMatchScoreByPlayer(dto.getId());
        return getResponseBodyWithCache(list, FOR_1_HOUR);
    }

    @PostMapping(value = "/list/userScoreHistoryByMatch1")
    public ResponseEntity<LeagueUserTeamScoreHistoryDTO> getUserScorePerMatch(@RequestBody RequestDTO dto) {
        return getResponseBodyWithCache(leagueUserTeamScorePerMatchService.getUserScorePerMatch(dto));
    }

    @PostMapping(value = "/list/userScoreHistoryByMatch")
    public ResponseEntity<List<MatchPlayerScoreDTO>> getUserScorePerMatchStats(@RequestBody RequestDTO dto) {
        List<MatchPlayerScoreDTO> list = leagueUserTeamScorePerMatchService.getUserScorePerMatchStats(dto);
        return getResponseBodyWithCache(list, FOR_1_HOUR);
    }

}
