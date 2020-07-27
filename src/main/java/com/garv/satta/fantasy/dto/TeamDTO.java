package com.garv.satta.fantasy.dto;

import lombok.Data;


@Data
public class TeamDTO extends BaseDTO {

    private String name;
    private String country;
    private String owner;
    private TournamentDTO tournament;
}
