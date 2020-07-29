package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;

@Entity
@NoArgsConstructor
@Data
@ToString(callSuper = true)
public class Game extends BaseDaoObject {

    private String name;
    private String description;
    private Integer playerCount;

    public Game(Long id) {
        super(id);
    }
}
