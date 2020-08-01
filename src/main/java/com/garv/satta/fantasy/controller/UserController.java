package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.UserDTO;
import com.garv.satta.fantasy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/fantasy/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/list")
    @ResponseBody
    public List<UserDTO> getUserList() {
        return userService.getUserList();
    }

    @GetMapping(value = "/get/{id}")
    @ResponseBody
    public UserDTO getUserById(@PathVariable(name = "id") Long id) {
        return userService.getUserById(id);
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public UserDTO createUser(@RequestBody UserDTO userDTO) {
        return userService.createUser(userDTO);
    }
}
