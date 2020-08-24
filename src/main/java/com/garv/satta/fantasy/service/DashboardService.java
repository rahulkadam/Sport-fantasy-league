package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dto.LeagueDTO;
import com.garv.satta.fantasy.dto.UserTeamDTO;
import com.garv.satta.fantasy.dto.reponsedto.DashboardDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private LeagueService leagueService;


    @Autowired UserService userService;

    @Autowired
    private UserTeamService userTeamService;

    /**
     * Get Dashboard Data
     * @return
     */
    public DashboardDTO getUserDashboard() {
        List<LeagueDTO> leagueDTOS = leagueService.getLeagueByPublic();
        List<UserTeamDTO> userTeamDTO = userTeamService.getUserTeamByUser(userService.getCurrentUserId());
        DashboardDTO dashboardDTO = new DashboardDTO();
        dashboardDTO.setPublicLeagues(leagueDTOS);
        dashboardDTO.setUserTeamDTO(userTeamDTO.get(0));
        return dashboardDTO;
    }
}
