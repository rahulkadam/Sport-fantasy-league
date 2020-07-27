package com.garv.satta.fantasy.dto;

import lombok.Data;

@Data
public class TournamentDTO extends BaseDTO {

    private String name;
    private String country;
    private String sportName;
    private Boolean status;
}
