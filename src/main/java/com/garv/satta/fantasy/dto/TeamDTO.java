package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TeamDTO extends BaseDTO {

    @NotNull
    private String name;
    private String country;
    private String owner;
    private String shortName;
    private List<Long> tournamentIds;
    private List<TournamentDTO> tournamentDTOList;
}
