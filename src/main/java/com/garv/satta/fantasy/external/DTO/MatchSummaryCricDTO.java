package com.garv.satta.fantasy.external.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MatchSummaryCricDTO {

    private String type;
    private Integer creditsLeft;
    private MatchDataCricDTO data;


}
