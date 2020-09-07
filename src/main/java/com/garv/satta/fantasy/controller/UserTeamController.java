package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.PlayerDTO;
import com.garv.satta.fantasy.dto.UserTeamDTO;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.service.UserTeamService;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/fantasy/userteam")
public class UserTeamController  extends BaseController {

    @Autowired
    private UserTeamService service;

    @GetMapping(value = "/get/user/{id}")
    public List<UserTeamDTO> getUserTeamByUser(@PathVariable(name = "id") Long id) {
        return service.getUserTeamByUser(id);
    }

    @GetMapping(value = "/get/userteam/data/{id}")
    public UserTeamDTO getUserTeamDetailsForUser(@PathVariable(name = "id") Long id) {
        List<UserTeamDTO> userTeamDTOList =  service.getUserTeamByUser(id);
        if (!CollectionUtils.isEmpty(userTeamDTOList)) {
            UserTeamDTO dto = userTeamDTOList.get(0);
            List<PlayerDTO> playerList = service.getPlayerListByUserTeamId(dto.getId());
            dto.setTeamPlayersPlayerDTOList(playerList);
            return dto;
        }
        return null;
    }

    @GetMapping(value = "/get/{id}")
    public UserTeamDTO getUserTeamById(@PathVariable(name = "id") Long id) {
        return service.getUserTeamById(id);
    }

    @PostMapping(value = "/create")
    public UserTeamDTO createUserTeam(@RequestBody UserTeamDTO dto) {
        return service.createUserTeam(dto);
    }

    @PostMapping(value = "/add/player")
    public String addPlayerToUserTeam(@RequestBody RequestDTO dto) {
        service.addPlayerListToUserTeam(dto);
        return "Player added successfully";
    }

}
