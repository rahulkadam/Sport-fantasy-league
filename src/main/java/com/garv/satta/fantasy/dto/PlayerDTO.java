package com.garv.satta.fantasy.dto;

import com.garv.satta.fantasy.model.fantasyenum.PlayerEnum;
import lombok.Data;

import java.util.List;

@Data
public class PlayerDTO extends BaseDTO {
    private String name;
    private PlayerEnum type;
    private String Country;
    private float value;
    private List<TeamDTO> teams;
}
