package com.garv.satta.fantasy.model;

import lombok.Data;
import org.joda.time.DateTime;

import javax.persistence.*;
import java.io.Serializable;

@MappedSuperclass
@Data
public class BaseDaoObject implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Long id;

    protected DateTime created_at;
    protected DateTime updated_at;

    /* TODO will need to support this also in future, to know who is updating creating data
        protected User created_by;
        protected User updated_by;
    */

    @PrePersist
    public void prePersistData() {
        this.created_at = DateTime.now();
        updated_at =  DateTime.now();
    }

    @PreUpdate
    public void preUpdateData() {
        this.updated_at = DateTime.now();
    }

}
