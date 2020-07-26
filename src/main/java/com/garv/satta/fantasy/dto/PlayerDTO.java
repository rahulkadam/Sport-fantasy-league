package com.garv.satta.fantasy.dto;

import com.garv.satta.fantasy.model.fantasyenum.PlayerEnum;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class PlayerDTO implements Serializable {
    private Long id;
    private String name;
    private PlayerEnum type;
    private String Country;
    private float value;
    private List<TeamDTO> teams;
}
