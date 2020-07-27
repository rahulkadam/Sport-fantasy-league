package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import com.garv.satta.fantasy.model.fantasyenum.GameEnum;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
public class Tournament extends BaseDaoObject {
    @NotNull
    @Column(unique = true)
    private String name;
    @NotNull
    private String country;
    @NotNull
    @Enumerated(EnumType.STRING)
    private GameEnum sportName;
    private Boolean status;
}
