package com.garv.satta.fantasy.external.service.cricinfo;

import com.garv.satta.fantasy.dao.repository.FantasyConfigRepository;
import com.garv.satta.fantasy.model.monitoring.FantasyConfig;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class CricInfoCrawler {

    @Autowired
    private FantasyConfigRepository fantasyConfigRepository;

    public Document getDocument(String link) throws Exception {
        Document document = Jsoup.connect(link)
                .userAgent("Mozilla")
                .referrer("http://google.com")
                .timeout(5000)
                .get();
        return document;
    }

    public Document getScoreCardDocumentByMatchId(Long id) throws Exception {
        String scoreUrl = getScoreCardURL(id);
        Document document = getDocument(scoreUrl);
        return document;
    }

    public String getScoreCardURL(Long id) {
        String seriesId = getCricInfoSeriesId();
        String scoreUrl = "https://www.espncricinfo.com/series/"+seriesId+"/scorecard/"+id;
        return scoreUrl;
    }

    @Cacheable(cacheNames = "FantasyCache" , keyGenerator = "customKeyGenerator")
    public String getCricInfoSeriesId() {
        FantasyConfig fantasyConfig = fantasyConfigRepository.findConfigByConfigkey("CRIC_INFO_IPL_SERIES_ID");
        return fantasyConfig.getConfigvalue();
    }
}
