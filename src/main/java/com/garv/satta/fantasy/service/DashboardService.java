package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dto.LeagueDTO;
import com.garv.satta.fantasy.dto.MatchDTO;
import com.garv.satta.fantasy.dto.MatchPlayerScoreDTO;
import com.garv.satta.fantasy.dto.UserTeamDTO;
import com.garv.satta.fantasy.dto.reponsedto.DashboardDTO;
import com.garv.satta.fantasy.model.backoffice.MatchPlayerScore;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private LeagueService leagueService;


    @Autowired UserService userService;

    @Autowired
    MatchService matchService;

    @Autowired
    private UserTeamService userTeamService;

    @Autowired
    private MatchPlayerScoreService matchPlayerScoreService;

    /**
     * Get Dashboard Data
     * @return
     */
    public DashboardDTO getUserDashboard() {
        UserTeamDTO userTeamDTO = userTeamService.getShortUserTeamByUser(userService.getCurrentUserId());
        List<LeagueDTO> leagueDTOS = getLeagueForDashboard(userTeamDTO);
        List<MatchDTO> matchDTOS = matchService.getLiveMatches();
        DashboardDTO dashboardDTO = new DashboardDTO();
        dashboardDTO.setPublicLeagues(leagueDTOS);
        dashboardDTO.setUserTeamDTO(userTeamDTO);
        dashboardDTO.setLiveMatches(matchDTOS);
        dashboardDTO.setLivePlayerScores(getLiveMatchPlayeScore(matchDTOS));
        return dashboardDTO;
    }

    private List<LeagueDTO> getLeagueForDashboard(UserTeamDTO userTeamDTO) {
        if (userTeamDTO == null) {
          return leagueService.getLeagueByPublic();
        }
        List<LeagueDTO> leagueDTOS = leagueService.getDashboardLeaguesByUserTeam(new UserTeam(userTeamDTO.getId()));
        List<LeagueDTO> publicLeagues =  leagueService.getLeagueByPublic();
        publicLeagues.stream().forEach(league -> {
            if (!leagueDTOS.contains(league)) {
                leagueDTOS.add(league);
            }
        });
        return leagueDTOS;
    }

    private List<MatchPlayerScoreDTO> getLiveMatchPlayeScore(List<MatchDTO> matchDTOS) {
        List<MatchPlayerScoreDTO> matchPlayerScores = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(matchDTOS)) {
            MatchDTO matchDTO = matchDTOS.get(0);
            matchPlayerScores = matchPlayerScoreService.findMatchPlayerScoreByMatchId(matchDTO.getId());
        }
        return matchPlayerScores;
    }
}
