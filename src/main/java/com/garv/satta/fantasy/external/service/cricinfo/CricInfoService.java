package com.garv.satta.fantasy.external.service.cricinfo;

import com.garv.satta.fantasy.external.DTO.MatchPlayerScoreCricDTO;
import com.garv.satta.fantasy.external.service.CricPointCalculateService;
import com.garv.satta.fantasy.external.service.cricinfo.parser.CommonParser;
import com.garv.satta.fantasy.external.service.cricinfo.parser.FieldingParser;
import com.garv.satta.fantasy.external.service.cricinfo.parser.PlayerParser;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CricInfoService {

    @Autowired
    private CricInfoCrawler cricInfoCrawler;

    @Autowired
    private FieldingParser fieldingParser;

    @Autowired
    private PlayerParser playerParser;

    @Autowired
    private CommonParser commonParser;

    @Autowired
    private CricPointCalculateService pointCalculateService;

    public List<MatchPlayerScoreCricDTO> getMatchPlayerScore(Long id) throws Exception {
        Document document = cricInfoCrawler.getScoreCardDocumentByMatchId(id);
        Map<Integer, MatchPlayerScoreCricDTO> map = parsePlayerScoreFromScorePage(document);
        map = fieldingParser.getFieldingPoints(map);
        map = pointCalculateService.calculatePointForPlayers(map);
        return map.values().stream().collect(Collectors.toList());
    }

    /**
     * Get player list of 22 player with scoring stats
     *
     * @param document
     * @return
     */
    public Map<Integer, MatchPlayerScoreCricDTO> parsePlayerScoreFromScorePage(Document document) {
        Map<Integer, MatchPlayerScoreCricDTO> map = new HashMap<>();
        try {
            Elements scoreCardTables = document.select(".match-scorecard-table");
            int size = scoreCardTables.size();
            if (size == 3) {
                // both innings played
                Element firstInnings = scoreCardTables.get(0);
                Element secondInnings = scoreCardTables.get(1);
                map = parsePlayersInningsScore(firstInnings, map);
                map = parsePlayersInningsScore(secondInnings, map);
            } else if (size == 2) {
                // only one innings played
                Element firstInnings = scoreCardTables.get(0);
                map = parsePlayersInningsScore(firstInnings, map);
                map = parseSecondInningsPlayerList(document, map);
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return map;
    }

    /**
     * parse score by  innings scrore table innings batting bowling section
     * + batting +  bowling + yet to bat
     *
     * @param firstInnings
     * @param map
     * @return
     */
    public Map<Integer, MatchPlayerScoreCricDTO> parsePlayersInningsScore(Element firstInnings,
                                                                          Map<Integer, MatchPlayerScoreCricDTO> map) {
        try {
            Element batsmanSection = firstInnings.select(".batsman").get(0);
            Element batsmanScoreList = batsmanSection.getElementsByTag("tbody").get(0);
            Element yetToBatSection = batsmanSection.getElementsByTag("tfoot").get(0);
            parseYetToBat(yetToBatSection, map);
            map = parseBatsmanList(batsmanScoreList, map);
            Element bowlingSection = firstInnings.select(".bowler").get(0);
            Element bowlerList = bowlingSection.getElementsByTag("tbody").get(0);
            map = parseBowlerList(bowlerList, map);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return map;
    }

    public Map<Integer, MatchPlayerScoreCricDTO> parseYetToBat(Element element1,
                                                               Map<Integer, MatchPlayerScoreCricDTO> map) {
        Elements playerListNode = element1.select("a");
        playerListNode.forEach(element -> {
            MatchPlayerScoreCricDTO player = playerParser.parsePlayer(element);
            if (player != null) {
                Integer playerId = player.getPid();
                if (map.get(playerId) == null) {
                    map.put(playerId, player);
                }
            }
        });
        return map;
    }

    /**
     * Parse second innings player list showed in below section
     *
     * @param document
     * @param playerMap
     * @return
     */
    public Map<Integer, MatchPlayerScoreCricDTO> parseSecondInningsPlayerList(Document document,
                                                                              Map<Integer, MatchPlayerScoreCricDTO> playerMap) {
        Elements playerListNode = document.select(".w-100.table.bowler").select("tbody").get(0).children();
        for (Element element : playerListNode) {
            playerMap = updatePlayerAttribute(element, playerMap, "secondInnings");
        }
        return playerMap;
    }

    public Map<Integer, MatchPlayerScoreCricDTO> parseBowlerList(Element batsmanBody, Map<Integer, MatchPlayerScoreCricDTO> playerMap) {
        Elements children = batsmanBody.children();
        for (Element element : children) {
            playerMap = updatePlayerAttribute(element, playerMap, "bowling");
        }
        return playerMap;
    }

    public Map<Integer, MatchPlayerScoreCricDTO> parseBatsmanList(Element batsmanBody, Map<Integer, MatchPlayerScoreCricDTO> playerMap) {
        Elements children = batsmanBody.children();
        for (Element element : children) {
            // adding this to avoid that extra row from cricinfo
            Element element1 = element.selectFirst(".batsman-cell");
            if (element1 != null) {
                playerMap = updatePlayerAttribute(element, playerMap, "batting");
            }
        }
        return playerMap;
    }

    public Map<Integer, MatchPlayerScoreCricDTO> updatePlayerAttribute(Element element,
                                                                       Map<Integer, MatchPlayerScoreCricDTO> playerMap, String type) {
        try {
            MatchPlayerScoreCricDTO player = playerParser.parsePlayer(element.child(0));
            if (player != null) {
                Integer pid = player.getPid();
                if (playerMap.get(pid) != null) {
                    player = playerMap.get(pid);
                }
                player = getPlayerAttributeByType(element, player, type);
                playerMap.put(pid, player);
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return playerMap;
    }

    /**
     * Fetching attribute by type
     *
     * @param element
     * @param player
     * @param type
     * @return
     */
    public MatchPlayerScoreCricDTO getPlayerAttributeByType(Element element, MatchPlayerScoreCricDTO player, String type) {
        switch (type) {
            case "bowling":
                player = parseBowlingAttribute(element, player);
                break;
            case "batting":
                player = parseBattingAttribute(element, player);
                break;
            case "secondInnings":
                break;
        }
        return player;
    }

    /**
     * Paring other attibure of bowler from bowling section
     *
     * @param node
     * @param player
     * @return
     */
    public MatchPlayerScoreCricDTO parseBowlingAttribute(Element node, MatchPlayerScoreCricDTO player) {
        Elements attrNode = node.children();
        player.setOvers(commonParser.getFloat(attrNode, 1));
        player.setMaiden(commonParser.getInteger(attrNode, 2));
        player.setRuns_concede(commonParser.getInteger(attrNode, 3));
        player.setWicket(commonParser.getInteger(attrNode, 4));
        player.setEconomy(commonParser.getFloat(attrNode, 5));
        player.setDot_balls(commonParser.getInteger(attrNode, 6));
        return player;
    }

    /**
     * Parsing other attribute of Batsman from batsman scoring section
     *
     * @param node
     * @param player
     * @return
     */
    public MatchPlayerScoreCricDTO parseBattingAttribute(Element node, MatchPlayerScoreCricDTO player) {
        Elements attrNode = node.children();
        String dismissed = commonParser.getText(attrNode, 1);
        if (!"not out".equalsIgnoreCase(dismissed)) {
            player.setDismissed(dismissed);
        }
        player.setRuns_scored(commonParser.getInteger(attrNode, 2));
        player.setBalls(commonParser.getInteger(attrNode, 3));
        player.setFours(commonParser.getInteger(attrNode, 5));
        player.setSixes(commonParser.getInteger(attrNode, 6));
        float strikeRate = commonParser.getFloat(attrNode, 7);
        player.setStrikeRate((int) strikeRate);
        return player;
    }

}
