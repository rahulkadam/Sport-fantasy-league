package com.garv.satta.fantasy.external.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlayerCricDTO {
    private String name;
    private Integer pid;
}
