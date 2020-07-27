package com.garv.satta.fantasy.service;

import org.springframework.stereotype.Service;

@Service
public class LeagueService {


    public String getTeams(Integer leagueId) {
        return "League Details" + leagueId;
    }
}
