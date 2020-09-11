package com.garv.satta.fantasy.controller.admin;

import com.garv.satta.fantasy.model.monitoring.FantasyError;
import com.garv.satta.fantasy.service.FantasyErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/admin/error")
public class FantasyErrorController {

    @Autowired
    private FantasyErrorService errorService;

    @GetMapping(value = "/list/10")
    @ResponseBody
    public List<FantasyError> getTop10List() {
        return errorService.top10Error();
    }

}
