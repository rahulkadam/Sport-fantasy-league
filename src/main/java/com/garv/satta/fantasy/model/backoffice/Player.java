package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import com.garv.satta.fantasy.model.fantasyenum.PlayerEnum;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Player extends BaseDaoObject {
    @NotNull
    @Column(unique = true)
    private String name;
    @NotNull
    @Enumerated(EnumType.STRING)
    private PlayerEnum type;
    private String Country;
    private Float value;

    @ManyToMany
    @JoinTable(
            name = "team_player",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "player_id"))
    private List<Team> teams;

    public Player(Long id) {
        super(id);
    }

}
