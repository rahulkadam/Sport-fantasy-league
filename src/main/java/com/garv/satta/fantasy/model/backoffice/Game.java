package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@Data
@NamedEntityGraph(name = "Game.criteria",
        attributeNodes = {
        @NamedAttributeNode("teamCriteria"), @NamedAttributeNode("playerCriteriaList")}
)
@ToString(exclude = {"teamCriteria", "playerCriteriaList"}, callSuper = true)
public class Game extends BaseDaoObject {

    @Column(unique = true)
    private String name;
    private String description;
    private Integer playerCount;

    @OneToOne(mappedBy = "game", fetch = FetchType.LAZY)
    private TeamCriteria teamCriteria;

    @OneToMany(mappedBy = "game", fetch = FetchType.LAZY)
    private List<PlayerCriteria> playerCriteriaList;

    public Game(Long id) {
        super(id);
    }
}
