package com.garv.satta.fantasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GameDTO extends BaseDTO {

    private String name;
    private String description;
    private Integer playerCount;
}
