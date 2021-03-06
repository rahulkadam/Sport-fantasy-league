package com.garv.satta.fantasy.model.monitoring;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true, of = {"id"})
@ToString
public class FantasyNotice extends BaseDaoObject {

    private String message;
    private String description;

    public FantasyNotice(String name) {
        this.message = name;
    }
}
