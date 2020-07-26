package com.garv.satta.fantasy.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class TeamDTO implements Serializable {

    private Long id;
    private String name;
    private String country;
    private String owner;
    private TournamentDTO tournament;
}
