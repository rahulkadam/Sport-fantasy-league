package com.garv.satta.fantasy.dto;

import lombok.Data;

import java.util.List;


@Data
public class TeamDTO extends BaseDTO {

    private String name;
    private String country;
    private String owner;
    private List<TournamentDTO> tournament;
}
