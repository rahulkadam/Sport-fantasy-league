package com.garv.satta.fantasy.model.frontoffice;

import com.garv.satta.fantasy.model.BaseDaoObject;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@ToString(exclude = {"leagueUserTeamList"} , callSuper = true)
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

    @OneToMany(mappedBy = "user")
    private List<LeagueUserTeam> leagueUserTeamList;

    public User(Long id) {
        super(id);
    }
}
