package com.garv.satta.fantasy.external.service;

import com.garv.satta.fantasy.external.DTO.MatchSquadCricDTO;
import com.garv.satta.fantasy.external.DTO.MatchSummaryCricDTO;
import com.garv.satta.fantasy.external.restapi.CricAPIHttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CricAPIService {

    @Autowired
    private CricAPIHttpClient cricAPIHttpClient;

    public MatchSquadCricDTO getMatchSquadDetails(Long matchId) {
        return cricAPIHttpClient.getMatchSquadDetails(matchId);

    }

    public MatchSummaryCricDTO getMatchSummaryDetails(Long matchId) {
        return cricAPIHttpClient.getMatchSummaryDetails(matchId);
    }
}
