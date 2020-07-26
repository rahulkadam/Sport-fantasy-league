package com.garv.satta.fantasy.model;

import lombok.Data;
import org.joda.time.DateTime;

import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

@MappedSuperclass
@Data
public class BaseDaoObject {

    protected DateTime created_at;
    protected DateTime updated_at;

    @PrePersist
    public void perPersistData() {
        this.created_at = DateTime.now();
        updated_at =  DateTime.now();
    }

    @PreUpdate
    public void perUpdateData() {
        this.updated_at = DateTime.now();
    }

}
