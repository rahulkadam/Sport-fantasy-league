package com.garv.satta.fantasy.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class TournamentDTO implements Serializable {
    private Long id;
    private String name;
    private String country;
    private String sportName;
    private Boolean status;
}
