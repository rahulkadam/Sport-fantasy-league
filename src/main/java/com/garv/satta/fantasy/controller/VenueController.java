package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.dto.VenueDTO;
import com.garv.satta.fantasy.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/fantasy/venue")
public class VenueController  extends BaseController {

    @Autowired
    private VenueService venueService;

    @GetMapping(value = "/list")
    @ResponseBody
    public ResponseEntity<List<VenueDTO>> getVenueList() {
        List<VenueDTO> venueDTOList =  venueService.getVenueList();
        return getResponseBodyWithCache(venueDTOList, FOR_1_DAY);
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
