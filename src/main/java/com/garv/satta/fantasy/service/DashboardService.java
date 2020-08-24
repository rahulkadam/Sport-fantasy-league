package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dto.LeagueDTO;
import com.garv.satta.fantasy.dto.UserTeamDTO;
import com.garv.satta.fantasy.dto.reponsedto.DashboardDTO;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
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
        UserTeamDTO userTeamDTO = userTeamService.getShortUserTeamByUser(userService.getCurrentUserId());
        List<LeagueDTO> leagueDTOS = getLeagueForDashboard(userTeamDTO);
        DashboardDTO dashboardDTO = new DashboardDTO();
        dashboardDTO.setPublicLeagues(leagueDTOS);
        dashboardDTO.setUserTeamDTO(userTeamDTO);
        return dashboardDTO;
    }

    private List<LeagueDTO> getLeagueForDashboard(UserTeamDTO userTeamDTO) {
        List<LeagueDTO> leagueDTOS = leagueService.getDashboardLeaguesByUserTeam(new UserTeam(userTeamDTO.getId()));
        List<LeagueDTO> publicLeagues =  leagueService.getLeagueByPublic();
        publicLeagues.stream().forEach(league -> {
            if (!leagueDTOS.contains(league)) {
                leagueDTOS.add(league);
            }
        });
        return leagueDTOS;
    }
}
