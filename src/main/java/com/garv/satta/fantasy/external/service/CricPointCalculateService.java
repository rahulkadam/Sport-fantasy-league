package com.garv.satta.fantasy.external.service;

import com.garv.satta.fantasy.external.DTO.MatchPlayerScoreCricDTO;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CricPointCalculateService {

    public Map<Integer, MatchPlayerScoreCricDTO> calculatePointForPlayers(Map<Integer, MatchPlayerScoreCricDTO> playerMap) {
        Map<Integer, MatchPlayerScoreCricDTO> playerMapWithScore = new HashMap<>();
        playerMap.forEach((key,value) -> playerMapWithScore.put(key, calculatePointForPlayer(value)));
        return playerMapWithScore;
    }

    /**
     *
     * @param player
     * @return
     */
    public MatchPlayerScoreCricDTO calculatePointForPlayer(MatchPlayerScoreCricDTO player) {
        Integer points = 0;
        points = calculateBattingPoints(player);
        points = points + calculateBowlingPoints(player);
        points = points + calculateFieldingPoints(player);
        player.setPointscore(points);
        return player;
    }

    public Integer calculateBattingPoints(MatchPlayerScoreCricDTO player) {
        Integer points = 0;

        Integer runs = player.getRuns_scored();
        // not batted , so no runs, and no need to calculate
        if (!isExist(runs)) {
            return 0;
        }
        // if player batted and scored zero runs, then -10
        if (runs == 0) {
            return -10;
        }

        // 1 point per runs
        points = runs;

        // 1 point per fours
        Integer fours = player.getFours();
        if (isPositive(fours)) {
            points = points + fours;
        }

        // 1 point per fours
        Integer sixes = player.getSixes();
        if (isPositive(fours)) {
            points = points + 2 * sixes;
        }

        Integer strikeRate = player.getStrikeRate();
        // strike rate , point calculation
        if (isExist(strikeRate) && runs >= 20) {
            if (strikeRate < 100) {
                points = points - 5;
            } else if (strikeRate >= 120 && strikeRate < 140) {
                points = points + 10;
            } else if (strikeRate >= 120 && strikeRate < 140) {
                points = points + 10;
            } else if (strikeRate >= 140 && strikeRate < 170) {
                points = points + 15;
            } else if (strikeRate >= 170) {
                points = points + 20;
            }
        }

        // Runs , Bonus point calculation
        if (isExist(runs)) {
            if (runs >= 30 && runs < 50) {
                points = points + 5;
            } else if (runs >= 50 && runs < 100) {
                points = points + 15;
            } else if (runs >= 100) {
                points = points + 20;
            }
        }

        return points;
    }

    public Integer calculateBowlingPoints(MatchPlayerScoreCricDTO player) {
        if (!isExist(player.getOvers())) {
            return 0;
        }

        Integer points = 0;

        // 10 point per wicket
        Integer dot_balls = player.getDot_balls();
        if (isPositive(dot_balls)) {
            points = points + dot_balls;
        }

        // 10 point per wicket
        Integer wickets = player.getWicket();
        if (isPositive(wickets)) {
            points = points + 20 * wickets;
        }

        // 10 point per wicket
        Integer maiden = player.getMaiden();
        if (isPositive(maiden)) {
            points = points + 10 * maiden;
        }

        // Runs , Bonus point calculation
        if (isExist(wickets)) {
            if (wickets == 3) {
                points = points + 5;
            } else if (wickets == 4) {
                points = points + 15;
            } else if (wickets > 4) {
                points = points + 20;
            }
        }


        // Economy , Bonus point calculation
        Float economy = player.getEconomy();
        Float overs = player.getOvers();
        if (isExist(economy) && isExist(overs) && overs >= 2) {
            if (economy < 4) {
                points = points + 20;
            } else if (economy >=4 && economy<5) {
                points = points + 15;
            } else if (economy >= 5 && economy <=6) {
                points = points + 10;
            } else if (economy >=10) {
                points = points - 10;
            }
        }
        return points;
    }

    public Integer calculateFieldingPoints(MatchPlayerScoreCricDTO player) {
        Integer points = 0;

        // calculate catches point
        Integer catches = player.getCatches();
        if (isPositive(catches)) {
            points = points + catches*10;
        } else {
            catches = 0;
        }

        // calculate sumping point
        Integer stumping = player.getStumped();
        if (isPositive(stumping)) {
            points = points + stumping*10;
        } else {
            stumping = 0;
        }

        // calculate run out point
        Integer runout = player.getRunout();
        if (isPositive(runout)) {
            points = points + runout*10;
        } else {
            runout = 0;
        }

        // Calculate bonus pointscore
        int total = catches + runout + stumping;
        if (total >=3) {
            points = points + 10;
        }

        return points;
    }


    public Boolean isExist(Float value) {
        return value != null;
    }

    public Boolean isExist(Integer value) {
        return value != null;
    }

    public Boolean isPositive(Integer value) {
        return value != null && value > 0;
    }

    public Boolean isNegative(Integer value) {
        return value != null && value < 0;
    }
}
