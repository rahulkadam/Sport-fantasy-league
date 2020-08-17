package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.MatchDTO;
import com.garv.satta.fantasy.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/fantasy/match")
public class MatchController {

    @Autowired
    private MatchService service;


    @GetMapping(value = "/list")
    @ResponseBody
    public List<MatchDTO> getMatchList() {
        return service.getMatchList();
    }

    @GetMapping(value = "/get/{id}")
    @ResponseBody
    public MatchDTO getMatchById(@PathVariable(name = "id") Long id) {
        return service.getMatchById(id);
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public MatchDTO createMatch(@RequestBody MatchDTO venue) {
        return service.createMatch(venue);
    }

    @PostMapping("/upload/xls/list")
    public String uploadTeamList(@RequestParam("file") MultipartFile file) {
        service.uploadTeamList(file);
        return "File Uploaded Successfully";
    }
}
