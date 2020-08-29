package com.garv.satta.fantasy.external.DTO.converter;

import com.garv.satta.fantasy.external.DTO.MatchPlayerScoreCricDTO;
import com.garv.satta.fantasy.model.backoffice.MatchPlayerScore;
import org.springframework.stereotype.Service;

@Service
public class CricMatchPlayerScoreConverter {

    /**
     * Copying fro DTO to entity for storing to DB
     * @param scoreEntity
     * @param dto
     * @return
     */
    public MatchPlayerScore copyPlayerScoresDataFromCricDTO(MatchPlayerScore scoreEntity, MatchPlayerScoreCricDTO dto) {
        scoreEntity.setRun_scored(dto.getRuns_scored());
        scoreEntity.setWicket(dto.getWicket());
        scoreEntity.setCatches(dto.getCatches());
        scoreEntity.setPointscore(dto.getPointscore());
        scoreEntity.setBalls(dto.getBalls());
        scoreEntity.setRunout(dto.getRunout());
        scoreEntity.setDot_balls(dto.getDot_balls());
        scoreEntity.setEconomy(dto.getEconomy());
        scoreEntity.setFours(dto.getFours());
        scoreEntity.setStumped(dto.getStumped());
        scoreEntity.setSixes(dto.getSixes());
        scoreEntity.setStrikeRate(dto.getStrikeRate());
        scoreEntity.setRuns_concede(dto.getRuns_concede());
        scoreEntity.setMaiden(dto.getMaiden());

        Float overs = parseFloatValue(dto.getOvers());
        scoreEntity.setOvers(overs);
        return scoreEntity;
    }

    public MatchPlayerScore initiateMatchPlayerScore(MatchPlayerScore scoreEntity) {
        scoreEntity.setRun_scored(0);
        scoreEntity.setWicket(0);
        scoreEntity.setCatches(0);
        scoreEntity.setPointscore(0);
        scoreEntity.setBalls(0);
        scoreEntity.setRunout(0);
        scoreEntity.setDot_balls(0);
        scoreEntity.setEconomy(0F);
        scoreEntity.setFours(0);
        scoreEntity.setStumped(0);
        scoreEntity.setSixes(0);
        scoreEntity.setStrikeRate(0);
        scoreEntity.setRuns_concede(0);
        scoreEntity.setMaiden(0);
        scoreEntity.setOvers(0F);
        return scoreEntity;
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
}
