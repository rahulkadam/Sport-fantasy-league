package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
public class Team extends BaseDaoObject {
    @NotNull
    @Column(unique = true)
    private String name;
    @NotNull
    private String Country;
    private String owner;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tournament_id", nullable = false)
    private Tournament tournament;
}
