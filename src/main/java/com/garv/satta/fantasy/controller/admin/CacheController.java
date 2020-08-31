package com.garv.satta.fantasy.controller.admin;


import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.service.admin.CacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value = "/admin/cache")
public class CacheController {

    @Autowired
    private CacheService cacheService;

    @PostMapping(value = "/clearbyname")
    @ResponseBody
    public String clearCacheByName(@RequestBody RequestDTO requestDTO) {
        cacheService.clearCacheByName(requestDTO);
        return "Cache cleared successfully, " + requestDTO.getName();
    }

}
