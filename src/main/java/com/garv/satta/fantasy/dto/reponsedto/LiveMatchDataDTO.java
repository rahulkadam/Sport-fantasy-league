package com.garv.satta.fantasy.dto.reponsedto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.garv.satta.fantasy.dto.MatchDTO;
import com.garv.satta.fantasy.dto.MatchPlayerScoreDTO;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LiveMatchDataDTO {
    private List<MatchPlayerScoreDTO> playerScoreDTOS;
    private MatchDTO matchDTO;
}
