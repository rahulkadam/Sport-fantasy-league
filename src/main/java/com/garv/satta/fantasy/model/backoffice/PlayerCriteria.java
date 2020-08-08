package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.fantasyenum.PlayerEnum;
import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@ToString(exclude = {"game"})
public class PlayerCriteria extends BaseDaoObject {

    @NotNull
    @Column(unique = true)
    private String type;
    private Integer minPerTeam;
    private Integer maxPerTeam;
    private String shortName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    public PlayerCriteria(Long id) {
        super(id);
    }
}
