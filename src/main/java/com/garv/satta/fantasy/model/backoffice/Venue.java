package com.garv.satta.fantasy.model.backoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
public class Venue extends BaseDaoObject {
    @NotNull
    @Column(unique = true)
    private String name;
    @NotNull
    private String city;
    @NotNull
    private String Country;

    public Venue(Long id) {
        super(id);
    }

}
