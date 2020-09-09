package com.garv.satta.fantasy.external.service.cricinfo.parser;

import com.garv.satta.fantasy.external.DTO.MatchPlayerScoreCricDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class FieldingParser {

    public Map<Integer, MatchPlayerScoreCricDTO> getFieldingPoints(Map<Integer, MatchPlayerScoreCricDTO> map) {

        Map<String, Integer> catchMap = new HashMap<>();
        Map<String, Integer> runoutMap = new HashMap<>();
        Map<String, Integer> stumpingMap = new HashMap<>();
        Map<String, Integer> playerShortMap = new HashMap<>();
        Map<String, Integer> playerlastNameMap = new HashMap<>();

        try {
            map.values().stream().forEach(value -> {
                playerShortMap.put(value.getShortName().trim(), value.getPid());
                String playerName = value.getName();
                if (!StringUtils.isEmpty(playerName)) {
                    playerName = playerName.substring(playerName.indexOf(" ")).trim();
                }
                playerlastNameMap.put(playerName, value.getPid());
                String dismisal = value.getDismissed();
                if (!StringUtils.isEmpty(dismisal)) {
                    String runout = handleRunout(dismisal);
                    if (!StringUtils.isEmpty(runout)) {
                        if (!runout.contains("/")) {
                            if (runoutMap.get(runout) != null) {
                                runoutMap.put(runout, runoutMap.get(runout) + 1);
                            } else {
                                runoutMap.put(runout, 1);
                            }
                        } else {
                            // handling multiple player fielding in runout
                            String[] playerList = runout.split("/");
                            for(String p: playerList) {
                                if (runoutMap.get(p) != null) {
                                    runoutMap.put(p, runoutMap.get(p) + 1);
                                } else {
                                    runoutMap.put(p, 1);
                                }
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
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return map;
        }

        return map;
    }

    public String handleOut(String dismisal, String type) {
        String starting = "c ";
        String out = "";
        try {
            if (type.equalsIgnoreCase("stumping")) {
                starting = "st ";
            }

            if(dismisal.contains("&") && type.equals("catch")) {
                int from = dismisal.indexOf("b ") + 2;
                out = dismisal.substring(from).trim();
                return out;
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
            log.error(e.getMessage(), e);
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
            log.error(e.getMessage(), e);
            return runout;
        }
    }

}
