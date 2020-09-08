package com.garv.satta.fantasy.external.service.cricinfo;

import com.garv.satta.fantasy.external.DTO.MatchPlayerScoreCricDTO;
import com.garv.satta.fantasy.external.service.CricPointCalculateService;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

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
    private CricPointCalculateService pointCalculateService;

    public List<MatchPlayerScoreCricDTO> getMatchPlayerScore(Long id) throws Exception {
        Document document = cricInfoCrawler.getScoreCardDocumentByMatchId(id);
        Map<Integer, MatchPlayerScoreCricDTO> map = getPlayerScoreFromScorePage(document);
        map = getFieldingPoints(map);
        map = pointCalculateService.calculatePointForPlayers(map);
        return map.values().stream().collect(Collectors.toList());
    }

    public Map<Integer, MatchPlayerScoreCricDTO> getPlayerScoreFromScorePage(Document document) {
        Map<Integer, MatchPlayerScoreCricDTO> map = new HashMap<>();
        try {
            Elements scoreCardTables = document.select(".match-scorecard-table");
            int size = scoreCardTables.size();

            // both innings played
            if (size == 3) {
                Element firstInnings = scoreCardTables.get(0);
                Element secondInnings = scoreCardTables.get(1);
                map = parsePlayersInningsScore(firstInnings, map);
                map = parsePlayersInningsScore(secondInnings, map);
            } else if (size == 2) {
                // only one innings played
                Element firstInnings = scoreCardTables.get(0);
                map = parsePlayersInningsScore(firstInnings, map);
                map = getSecondInningsPlayerList(document, map);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return map;
    }

    /**
     * parse score by  innings scrore table innings batting bowling section
     * + batting +  bowling + yeto to bat
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
            getYetToBat(yetToBatSection, map);
            map = getBatsmanList(batsmanScoreList, map);
            Element bowlingSection = firstInnings.select(".bowler").get(0);
            Element bowlerList = bowlingSection.getElementsByTag("tbody").get(0);
            map = getBowlerList(bowlerList, map);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return map;
    }


    public Map<Integer, MatchPlayerScoreCricDTO> getSecondInningsPlayerList(Document document,
                                                                            Map<Integer, MatchPlayerScoreCricDTO> map) {
        Elements playerListNode =  document.select(".w-100.table.bowler").select("tbody").get(0).children();
        playerListNode.forEach(element -> {
            MatchPlayerScoreCricDTO player = parsePlayer(element.child(0));
            if (player != null) {
                Integer playerId = player.getPid();
                if(map.get(playerId) == null) {
                    map.put(playerId, player);
                }
            }
        });
        return map;
    }

    public Map<Integer, MatchPlayerScoreCricDTO> getYetToBat(Element element1,
                                                             Map<Integer, MatchPlayerScoreCricDTO> map) {

        Elements playerListNode =  element1.select("a");
        playerListNode.forEach(element -> {
            MatchPlayerScoreCricDTO player = parsePlayer(element);
            if (player != null) {
                Integer playerId = player.getPid();
                if(map.get(playerId) == null) {
                    map.put(playerId, player);
                }
            }
        });
        return map;
    }

    public Map<Integer, MatchPlayerScoreCricDTO> getBowlerList(Element batsmanBody, Map<Integer, MatchPlayerScoreCricDTO> playerMap) {
        Elements children = batsmanBody.children();
        children.forEach(element -> {
            MatchPlayerScoreCricDTO player = parsePlayer(element.child(0));
            if (player != null) {
                Integer pid = player.getPid();
                if (playerMap.get(pid) != null) {
                    player = playerMap.get(pid);
                }
                player = getBowlingAttribute(element, player);
                playerMap.put(pid, player);
            }
        });
        return playerMap;
    }

    public Map<Integer, MatchPlayerScoreCricDTO> getBatsmanList(Element batsmanBody, Map<Integer, MatchPlayerScoreCricDTO> playerMap) {
        Elements children = batsmanBody.children();
        children.forEach(element -> {
            Element element1 = element.selectFirst(".batsman-cell");
            if (element1 != null) {
                MatchPlayerScoreCricDTO player = parsePlayer(element.child(0));
                if (player != null) {
                    Integer pid = player.getPid();
                    if (playerMap.get(pid) != null) {
                        player = playerMap.get(pid);
                    }
                    player = getBattingAttribute(element, player);
                    playerMap.put(pid, player);
                }
            }
        });
        return playerMap;
    }

    public MatchPlayerScoreCricDTO getBowlingAttribute(Element node, MatchPlayerScoreCricDTO player) {
        Elements attrNode = node.children();
        player.setOvers(getFloat(attrNode.get(1)));
        player.setMaiden(getInteger(attrNode.get(2)));
        player.setRuns_concede(getInteger(attrNode.get(3)));
        player.setWicket(getInteger(attrNode.get(4)));
        player.setEconomy(getFloat(attrNode.get(5)));
        player.setDot_balls(getInteger(attrNode.get(6)));
        return player;
    }

    public MatchPlayerScoreCricDTO getBattingAttribute(Element node, MatchPlayerScoreCricDTO player) {
        Elements attrNode = node.children();
        player.setDismissed(getText(attrNode.get(1)));
        player.setRuns_scored(getInteger(attrNode.get(2)));
        player.setBalls(getInteger(attrNode.get(3)));
        player.setFours(getInteger(attrNode.get(5)));
        player.setSixes(getInteger(attrNode.get(6)));
        float strikeRate = getFloat(attrNode.get(7));
        player.setStrikeRate((int) strikeRate);
        return player;
    }

    public String getShortName(String name) {
        try {
            name = name.trim();
            if (name.contains("(c)")) {
                name = name.substring(0, name.length() - 4);
                return name;
            }
            if (name.contains("†")) {
                name = name.substring(0, name.length() - 2);
                return name;
            }
        } catch (Exception e) {
            return name;
        }
        return name;
    }

    public Map<Integer, MatchPlayerScoreCricDTO> getFieldingPoints(Map<Integer, MatchPlayerScoreCricDTO> map) {

        Map<String, Integer> catchMap = new HashMap<>();
        Map<String, Integer> runoutMap = new HashMap<>();
        Map<String, Integer> stumpingMap = new HashMap<>();
        Map<String, Integer> playerShortMap = new HashMap<>();
        Map<String, Integer> playerlastNameMap = new HashMap<>();

        map.values().stream().forEach(value -> {
            playerShortMap.put(value.getShortName().trim(), value.getPid());
            String playerName = value.getName();
            playerName = playerName.substring(playerName.indexOf(" ")).trim();
            playerlastNameMap.put(playerName, value.getPid());
            String dismisal = value.getDismissed();
            if (!StringUtils.isEmpty(dismisal)) {
                String runout = handleRunout(dismisal);
                if (!StringUtils.isEmpty(runout)) {
                    if (!runout.contains("/")) {
                        // String[] playerList = runout.split("/");
                        if (runoutMap.get(runout) != null) {
                            runoutMap.put(runout, runoutMap.get(runout) + 1);
                        } else {
                            runoutMap.put(runout, 1);
                        }
                    }
                }
                String catchout = handleOut(dismisal, "catch");
                if (!StringUtils.isEmpty(catchout)) {
                    if (catchMap.get(catchout) != null) {
                        catchMap.put(catchout, catchMap.get(catchout) + 1);
                    } else {
                        catchMap.put(catchout, 1);
                    }
                }

                String stumping = handleOut(dismisal, "stumping");
                if (!StringUtils.isEmpty(stumping)) {
                    if (stumpingMap.get(stumping) != null) {
                        stumpingMap.put(stumping, stumpingMap.get(stumping) + 1);
                    } else {
                        stumpingMap.put(stumping, 1);
                    }
                }
            }
        });

        stumpingMap.forEach((key, value) -> {
            Integer playerId = playerlastNameMap.get(key);
            if (playerId == null) {
                playerId = playerShortMap.get(key);
            }
            if (playerId != null) {
                MatchPlayerScoreCricDTO player = map.get(playerId);
                player.setStumped(value);
                map.put(playerId, player);
            }
        });

        catchMap.forEach((key, value) -> {
            Integer playerId = playerlastNameMap.get(key);
            if (playerId == null) {
                playerId = playerShortMap.get(key);
            }
            if (playerId != null) {
                MatchPlayerScoreCricDTO player = map.get(playerId);
                player.setCatches(value);
                map.put(playerId, player);
            }
        });

        runoutMap.forEach((key, value) -> {
            Integer playerId = playerlastNameMap.get(key);
            if (playerId == null) {
                playerId = playerShortMap.get(key);
            }
            if (playerId != null) {
                MatchPlayerScoreCricDTO player = map.get(playerId);
                player.setRunout(value);
                map.put(playerId, player);
            }
        });

        return map;
    }

    public String handleOut(String dismisal, String type) {
        String starting = "c ";
        String out = "";
        try {
            if (type.equalsIgnoreCase("stumping")) {
                starting = "st ";
            }
            if (dismisal.startsWith(starting)) {
                int to = dismisal.indexOf(" b");
                out = dismisal.substring(starting.length(), to).trim();
                if (out.contains("†")) {
                    out = out.substring(1);
                }
            }
            return out;
        } catch (Exception e) {
            return "";
        }
    }

    public String handleRunout(String dismisal) {
        String runout = "";
        try {
            if (dismisal.contains("run out")) {
                int from = dismisal.indexOf('(');
                int to = dismisal.indexOf('(');
                runout = dismisal.substring(from, to);
            }
            return runout;
        } catch (Exception e) {
            return runout;
        }
    }

    public String getText(Element node) {
        return node.text();
    }

    public static Float getFloat(Element node) {
        try {
            String number = node.text();
            return Float.valueOf(number);
        } catch (Exception e) {
            return 0F;
        }
    }

    public static Integer getInteger(Element node) {
        try {
            String number = node.text();
            return Integer.parseInt(number);
        } catch (Exception e) {
            return 0;
        }
    }

    public MatchPlayerScoreCricDTO parsePlayer(Element node) {
        try {
            MatchPlayerScoreCricDTO player = new MatchPlayerScoreCricDTO();
            player.setPid(getPlayerId(node));
            player.setName(getPlayerName(node));
            String shortName = getShortName(node.text()).trim();
            if(shortName.indexOf(",") > 0) {
                shortName = shortName.substring(0, shortName.indexOf(",")-1);
            }
            player.setBatsman(shortName);
            player.setShortName(shortName);
            return player;
        } catch (Exception e) {
            return null;
        }
    }

    public Integer getPlayerId(Element node) {
        String link = node.select("a").attr("href");
        int length = "https://www.espncricinfo.com/ci/content/player/".length();
        String playerId = link.substring(length, link.length() - 5);
        Integer playerIdInt = Integer.parseInt(playerId);
        return playerIdInt;
    }

    public String getPlayerName(Element node) {
        String LinkTitle = node.select("a").attr("title");
        int length2 = "View full profile of ".length();
        String playerName = LinkTitle.substring(length2);
        return playerName;
    }

}
