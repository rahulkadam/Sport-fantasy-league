package com.garv.satta.fantasy.external.service;

import com.garv.satta.fantasy.external.DTO.MatchPlayerScoreCricDTO;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CricPointCalculateService {

    public Map<Integer, MatchPlayerScoreCricDTO> calculatePointForPlayers(Map<Integer, MatchPlayerScoreCricDTO> playerMap) {
        Map<Integer, MatchPlayerScoreCricDTO> playerMapWithScore = new HashMap<>();
        playerMap.forEach((key, value) -> playerMapWithScore.put(key, calculatePointForPlayer(value)));
        return playerMapWithScore;
    }

    /**
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
        points = points + getPointWithMultiplier(fours, 1);

        // 2 point per sixes
        Integer sixes = player.getSixes();
        points = points + getPointWithMultiplier(sixes, 2);

        // strike rate , point calculation
        Integer strikeRate = player.getStrikeRate();
        points = points + getStrikeRateBattingPoint(strikeRate, runs);
        // Runs , Bonus point calculation
        points = points + getBonusForRuns(runs);
        return points;
    }

    public Integer getPointWithMultiplier(Integer value, Integer multiplier) {
        if (isPositive(value)) {
            return value * multiplier;
        }
        return 0;
    }

    public Integer getBonusForRuns(Integer runs) {
        if (!isExist(runs)) {
            return 0;
        }
        if (runs >= 30 && runs < 50) {
            return 5;
        } else if (runs >= 50 && runs < 100) {
            return 15;
        } else if (runs >= 100) {
            return 20;
        }
        return 0;
    }

    /**
     * @param strikeRate
     * @param runs
     * @return
     */
    public Integer getStrikeRateBattingPoint(Integer strikeRate, Integer runs) {
        // if not exist, or less than 20 runs then ignore
        if (!isExist(strikeRate) || runs < 20) {
            return 0;
        }

        if (strikeRate < 100) {
            return -5;
        } else if (strikeRate >= 120 && strikeRate < 140) {
            return 10;
        } else if (strikeRate >= 140 && strikeRate < 170) {
            return 15;
        } else if (strikeRate >= 170) {
            return 20;
        }
        return 0;
    }

    public Float parseFloatValue(Object value) {
        try {
            if (value == null) {
                return 0F;
            }
            return Float.valueOf(value.toString());
        } catch (Exception e) {
            return 0F;
        }
    }

    public Integer calculateBowlingPoints(MatchPlayerScoreCricDTO player) {

        Float overs = parseFloatValue(player.getOvers());
        if (overs == 0F) {
            return 0;
        }

        Integer points = 0;

        // 1 point per dot balls
        Integer dot_balls = player.getDot_balls();
        if (isPositive(dot_balls)) {
            points = points + dot_balls;
        }

        // 20 point per wicket
        Integer wickets = player.getWicket();
        points = points + getPointWithMultiplier(wickets, 20);

        // 10 point per maiden
        Integer maiden = player.getMaiden();
        points = points + getPointWithMultiplier(maiden, 10);

        // Wickets , Bonus point calculation
        points = points + getWicketPoints(wickets);

        // Economy , Bonus point calculation
        Float economy = player.getEconomy();
        points = points + calculateEconomyPoints(economy, overs);

        return points;
    }

    public Integer getWicketPoints(Integer wickets) {
        if (!isExist(wickets)) {
            return 0;
        }
        if (wickets == 3) {
            return 5;
        } else if (wickets == 4) {
            return 15;
        } else if (wickets > 4) {
            return 20;
        }
        return 0;
    }

    public Integer calculateEconomyPoints(Float economy, Float overs) {
        if (isExist(economy) && isExist(overs) && overs >= 2) {
            if (economy < 4) {
                return  20;
            } else if (economy >= 4 && economy < 5) {
                return  15;
            } else if (economy >= 5 && economy <= 6) {
                return 10;
            } else if (economy >= 10) {
                return -10;
            }
        }
        return 0;
    }

    public Integer calculateFieldingPoints(MatchPlayerScoreCricDTO player) {
        Integer points = 0;

        // calculate catches point
        Integer catches = player.getCatches();
        points = points + getPointWithMultiplier(catches, 10);

        // calculate stumping point
        Integer stumping = player.getStumped();
        points = points + getPointWithMultiplier(stumping, 10);

        // calculate run out point
        Integer runout = player.getRunout();
        points = points + getPointWithMultiplier(runout, 10);

        // Calculate bonus pointscore
        if (points >= 30) {
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

    public Boolean isPositive(Float value) {
        return value != null && value > 0;
    }


    public Boolean isNegative(Integer value) {
        return value != null && value < 0;
    }
}
