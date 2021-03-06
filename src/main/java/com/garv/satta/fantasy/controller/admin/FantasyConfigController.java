package com.garv.satta.fantasy.controller.admin;

import com.garv.satta.fantasy.dao.repository.FantasyConfigRepository;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.model.monitoring.FantasyConfig;
import com.garv.satta.fantasy.service.admin.CacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/admin/config")
public class FantasyConfigController {

    @Autowired
    private FantasyConfigRepository repository;

    @Autowired
    private CacheService cacheService;

    @PostMapping(value = "/add")
    @ResponseBody
    public String addConfig(@RequestBody RequestDTO requestDTO) {
        FantasyConfig fantasyConfig = new FantasyConfig();
        fantasyConfig.setConfigkey(requestDTO.getKey());
        fantasyConfig.setConfigvalue(requestDTO.getValue());
        repository.save(fantasyConfig);
        return "Notice saved successfully";
    }

    @PostMapping(value = "/findbykey")
    @ResponseBody
    public FantasyConfig getValueByKey(@RequestBody RequestDTO requestDTO) {
        FantasyConfig fantasyConfig = repository.findConfigByConfigkey(requestDTO.getKey());
        return fantasyConfig;
    }

    @PostMapping(value = "/update")
    @ResponseBody
    public FantasyConfig updateValueByKey(@RequestBody RequestDTO requestDTO) {
        FantasyConfig fantasyConfig = repository.findConfigByConfigkey(requestDTO.getKey());
        if (fantasyConfig == null) {
            fantasyConfig = new FantasyConfig();
            fantasyConfig.setConfigkey(requestDTO.getKey());
        }
        fantasyConfig.setConfigvalue(requestDTO.getValue());
        fantasyConfig =  repository.save(fantasyConfig);
        cacheService.clearFantasyCache();
        return fantasyConfig;
    }

    @GetMapping(value = "/list")
    @ResponseBody
    public List<FantasyConfig> getList() {
        return repository.findAll();
    }

}
