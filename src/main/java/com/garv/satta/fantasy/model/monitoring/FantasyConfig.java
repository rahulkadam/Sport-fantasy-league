package com.garv.satta.fantasy.model.monitoring;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true, of = {"id"})
@ToString
public class FantasyConfig extends BaseDaoObject {

    @NotNull
    @Column(unique = true)
    private String configkey;
    @NotNull
    private String configvalue;

}
