package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
@Data
@NoArgsConstructor
@ToString(exclude = {"game"})
public class TeamCriteria extends BaseDaoObject {

    private Float totalCredits;
    private Integer maxPlayerPerTeam;
    private Integer totalPlayerCount;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    public TeamCriteria(Long id) {
        super(id);
    }
}
