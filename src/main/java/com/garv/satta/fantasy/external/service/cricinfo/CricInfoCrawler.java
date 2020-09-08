package com.garv.satta.fantasy.external.service.cricinfo;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

@Service
public class CricInfoCrawler {

    public Document getDocument(String link) throws Exception {
        Document document = Jsoup.connect(link).get();
        return document;
    }

    public Document getScoreCardDocumentByMatchId(Long id) throws Exception {
        String scoreUrl = "https://www.espncricinfo.com/series/19496/scorecard/"+id;
        Document document = getDocument(scoreUrl);
        return document;
    }
}
