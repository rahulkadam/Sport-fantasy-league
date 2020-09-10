package com.garv.satta.fantasy.external.restapi;

import com.garv.satta.fantasy.configuration.FantasyProperties;
import com.garv.satta.fantasy.external.DTO.MatchSquadCricDTO;
import com.garv.satta.fantasy.external.DTO.MatchSummaryCricDTO;
import com.garv.satta.fantasy.service.admin.FantasyConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class CricAPIHttpClient {
    private final WebClient webClient;

    private String CRIC_API_KEY = "CRIC_API_KEY"; //kdbnBeYPF3aX2PEEcXGjgowpxwz1  SogCXdf9v4RViTdcxkbFAG55RPB3

    @Autowired
    private FantasyProperties properties;

    @Autowired
    private FantasyConfigService fantasyConfigService;


    public CricAPIHttpClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://cricapi.com/api/").build();
    }

    public MatchSquadCricDTO getMatchSquadDetails(Integer matchId) {
        String path = getPath("/fantasySquad" , matchId);
        MatchSquadCricDTO response = webClient.get().uri(path).retrieve().bodyToMono(MatchSquadCricDTO.class).block();
        return response;
    }

    public MatchSummaryCricDTO getMatchSummaryDetails(Integer matchId) {
        String path = getPath("/fantasySummary" , matchId);
        MatchSummaryCricDTO response = webClient.get().uri(path).retrieve().bodyToMono(MatchSummaryCricDTO.class).block();
        return response;
    }


    private String getPath(String urlPath, Integer uniqueId) {
        String path = urlPath;
        path = path + "?apikey=" + fantasyConfigService.getCricAPITokenKey();
        path = path + "&unique_id=" + uniqueId;
        return path;
    }

}
