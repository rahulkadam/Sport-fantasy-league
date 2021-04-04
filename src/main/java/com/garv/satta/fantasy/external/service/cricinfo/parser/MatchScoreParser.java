package com.garv.satta.fantasy.external.service.cricinfo.parser;

import com.garv.satta.fantasy.external.DTO.cricinfo.CricInfoMatchScore;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MatchScoreParser {

    public CricInfoMatchScore getMatchScore(Document document) {
        try {
            Elements scoreElement = document.getElementsByClass("match-header").select(".teams");
            Element element = scoreElement.get(0);
            Elements teamElement = element.children();
            Element firstTeam = teamElement.get(0);
            Element secondTeam = teamElement.get(1);

            Elements firstteamList = firstTeam.children();
            String firstTeamName = firstteamList.get(0).getElementsByClass("name-detail").get(0).text();
            String firstTeamScore = "";

            if (firstteamList.size() > 1 && firstteamList.get(1) != null) {
                firstTeamScore = firstteamList.get(1).getElementsByClass("score-detail").get(0).text();
            }

            Elements secondteamList = secondTeam.children();
            String secondTeamName = secondteamList.get(0).getElementsByClass("name-detail").get(0).text();
            String secondTeamScore = secondteamList.get(1).getElementsByClass("score-detail").get(0).text();

            if (secondteamList.size() > 1 && secondteamList.get(1) != null) {
                secondTeamScore = secondteamList.get(1).getElementsByClass("score-detail").get(0).text();
            }

            String matchSummary = "";
            Elements summary = document.getElementsByClass("match-header").select(".status-text");
            if (summary.first() != null) {
                matchSummary = summary.first().text();
            }

            CricInfoMatchScore liveMatchScore = new CricInfoMatchScore();
            liveMatchScore.setFirstTeam(firstTeamName);
            liveMatchScore.setFirstTeamScore(firstTeamScore);
            liveMatchScore.setSecondTeam(secondTeamName);
            liveMatchScore.setSecondTeamScore(secondTeamScore);
            liveMatchScore.setSummary(matchSummary);
            return liveMatchScore;
        } catch (Exception e) {
            log.error("Score error : " + e.getMessage());
            return null;
        }

    }
}
