package com.garv.satta.fantasy.model.frontoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@ToString(callSuper = true)
public class User extends BaseDaoObject {

    @NotNull
    private String name;
    @NotNull
    private String email;
    private String password;
    private String access_token;
    private String refresh_token;
    private String mobileNumber;
    private String role;

    public User(Long id) {
        super(id);
    }
}
