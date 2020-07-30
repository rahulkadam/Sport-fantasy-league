package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import com.garv.satta.fantasy.fantasyenum.GameEnum;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@ToString(exclude = {"teams"}, callSuper = true)
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

    @ManyToMany(mappedBy = "tournament")
    private List<Team> teams;

    public Tournament(Long id) {
        super(id);
    }
}
