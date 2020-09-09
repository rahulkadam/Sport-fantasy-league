package com.garv.satta.fantasy.external.DTO.cricinfo;

import com.garv.satta.fantasy.external.DTO.MatchPlayerScoreCricDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class CricInfoMatchData {

    private CricInfoMatchScore matchScore;
    List<MatchPlayerScoreCricDTO> matchPlayerScoreCricDTOS;

    public CricInfoMatchData(CricInfoMatchScore score, List<MatchPlayerScoreCricDTO> list) {
        this.matchScore = score;
        this.matchPlayerScoreCricDTOS = list;
    }
}
