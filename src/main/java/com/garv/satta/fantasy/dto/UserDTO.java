package com.garv.satta.fantasy.dto;

import lombok.Data;

@Data
public class UserDTO extends BaseDTO {
    private String name;
    private String email;
    private String password;
    private String access_token;
    private String refresh_token;
    private String mobileNumber;
    private String role;

}
