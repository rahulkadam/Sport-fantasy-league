package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.VenueDTO;
import com.garv.satta.fantasy.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/fantasy/venue")
public class VenueController {

    @Autowired
    private VenueService venueService;

    @GetMapping(value = "/list")
    @ResponseBody
    public List<VenueDTO> getVenueList() {
        return venueService.getVenueList();
    }

    @GetMapping(value = "/get/{id}")
    @ResponseBody
    public VenueDTO getVenueById(@PathVariable(name = "id") Long id) {
        return venueService.getVenueById(id);
    }

    @PostMapping(value = "/create")
    @ResponseBody
    public VenueDTO createVenue(@RequestBody VenueDTO venue) {
        return venueService.createVenue(venue);
    }

    @PostMapping("/upload/xls/list")
    public String uploadVenueList(@RequestParam("file") MultipartFile file) {
        venueService.uploadVenueList(file);
        return "File Uploaded Successfully";
    }
}
