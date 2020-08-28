package com.garv.satta.fantasy.external.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SquadCricDTO {
    private List<PlayerCricDTO> players;
    private String name;
}
