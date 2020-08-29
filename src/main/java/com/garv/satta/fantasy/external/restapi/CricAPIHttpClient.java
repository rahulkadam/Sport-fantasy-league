package com.garv.satta.fantasy.external.restapi;

import com.garv.satta.fantasy.configuration.FantasyProperties;
import com.garv.satta.fantasy.external.DTO.MatchSquadCricDTO;
import com.garv.satta.fantasy.external.DTO.MatchSummaryCricDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class CricAPIHttpClient {
    private final WebClient webClient;

    private String key = "SogCXdf9v4RViTdcxkbFAG55RPB3"; //kdbnBeYPF3aX2PEEcXGjgowpxwz1

    @Autowired
    private FantasyProperties properties;


    public CricAPIHttpClient(WebClient.Builder webClientBuilder) {
        //String url = properties.getCricAPIURL();
        //key = properties.getCricAPIKey();
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
        path = path + "?apikey=" + key;
        path = path + "&unique_id=" + uniqueId;
        return path;
    }

}