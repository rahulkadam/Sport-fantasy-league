package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.PlayerDTO;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.dto.converter.PlayerConverter;
import com.garv.satta.fantasy.service.UserTeamService;
import com.garv.satta.fantasy.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/fantasy/player")
public class PlayerController  extends BaseController {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private UserTeamService userTeamService;

    @Autowired
    private PlayerConverter playerConverter;

    @GetMapping(value = "/list")
    @ResponseBody
    public ResponseEntity<List<PlayerDTO>> getPlayerList() {
        List<PlayerDTO> playerList =  playerService.getPlayerList();
        return getResponseBodyWithCache(playerList, FOR_1_DAY);
    }

    @GetMapping(value = "/list/byuser/{id}")
    @ResponseBody
    public List<PlayerDTO> getPlayerListByUserTeamId(@PathVariable(name = "id") Long id) {
        List<PlayerDTO> playerList =  playerService.getPlayerListByUserTeamIdForLeagueView(id);
        return playerList;
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public PlayerDTO createPlayer(@RequestBody PlayerDTO playerDTO) {
        PlayerDTO player = playerService.createPlayer(playerDTO);
        return player;
    }

    @PostMapping(value = "/update/externalid")
    @ResponseBody
    public String updateExternalMatchIt(@RequestBody RequestDTO requestDTO) {
        playerService.updateExternalPlayerId(requestDTO);
        return "External Player id updated successfully";
    }

    @PostMapping(value = "/add/team")
    public String addTeamToPlayer(@RequestBody RequestDTO dto) {
        Long playerId = dto.getAddTo();
        Long teamId = dto.getAdd();
        playerService.addTeamToPlayer(playerId, teamId);
        return "User Team added successfully";
    }

    @PostMapping(value = "/remove/team")
    public String removeTeamFromPlayer(@RequestBody RequestDTO dto) {
        Long playerId = dto.getRemoveFrom();
        Long teamId = dto.getRemove();
        playerService.removeTeamFromPlayer(playerId, teamId);
        return "User Team Removed successfully";
    }

    @PostMapping("/upload/xls/list")
    public String uploadPlayerList(@RequestParam("file") MultipartFile file) {
        playerService.uploadPlayerList(file);
        return "File Uploaded Successfully";
    }
}
