package com.garv.satta.fantasy.dto;

import lombok.Data;
import org.joda.time.DateTime;

import java.io.Serializable;

@Data
public class BaseDTO implements Serializable {
    protected Long id;
    protected DateTime created_at;
    protected DateTime updated_at;
}
