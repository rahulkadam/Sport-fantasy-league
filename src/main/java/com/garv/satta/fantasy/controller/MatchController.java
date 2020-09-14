package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.MatchDTO;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/fantasy/match")
public class MatchController extends BaseController {

    @Autowired
    private MatchService service;


    @GetMapping(value = "/list")
    @ResponseBody
    public ResponseEntity<List<MatchDTO>> getMatchList() {
        List<MatchDTO> matchList = service.getMatchList();
        return getResponseBodyWithCache(matchList);
    }

    @GetMapping(value = "/completed/list")
    @ResponseBody
    public ResponseEntity<List<MatchDTO>> getCompletedMatchList() {
        List<MatchDTO> matchList = service.getCompletedMatchListWithUserScore();
        return getResponseBodyWithCache(matchList, FOR_5_MIN);
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

    @PostMapping(value = "/update/externalid")
    @ResponseBody
    public String updateExternalMatchIt(@RequestBody RequestDTO requestDTO) {
        service.updateExternalMatchId(requestDTO);
        return "External Match id updated successfully";
    }

    @PostMapping("/upload/xls/list")
    public String uploadTeamList(@RequestParam("file") MultipartFile file) {
        service.uploadTeamList(file);
        return "File Uploaded Successfully";
    }
}
