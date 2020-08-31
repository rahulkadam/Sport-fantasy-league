package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.reponsedto.DashboardDTO;
import com.garv.satta.fantasy.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/fantasy/home")
public class DashboardController {

    @Autowired
    private MatchPlayerScoreService playerScoreService;

    @Autowired
    private DashboardService dashboardService;

    @GetMapping(value = "/user/dashboard")
    public DashboardDTO getUserDashboard() {
        return dashboardService.getUserDashboard();
    }


}

