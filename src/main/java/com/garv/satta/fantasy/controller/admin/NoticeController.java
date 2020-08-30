package com.garv.satta.fantasy.controller.admin;

import com.garv.satta.fantasy.dao.repository.FantasyNoticeRepository;
import com.garv.satta.fantasy.dao.repository.TaskSchedularRepository;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.model.monitoring.FantasyNotice;
import com.garv.satta.fantasy.model.monitoring.TaskSchedular;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/admin/notice")
public class NoticeController {

    @Autowired
    private FantasyNoticeRepository repository;

    @Autowired
    private TaskSchedularRepository taskSchedularRepository;

    @PostMapping(value = "/add")
    @ResponseBody
    public String addNotice(@RequestBody RequestDTO requestDTO) {
        String msg = requestDTO.getName();
        repository.save(new FantasyNotice(msg));
        return "Notice saved successfully";
    }

    @PostMapping(value = "/remove")
    @ResponseBody
    public String removeNotice(@RequestBody RequestDTO requestDTO) {
        Long id = requestDTO.getId();
        FantasyNotice notice = repository.findNoticeById(id);
        Assert.notNull(notice, "Notice is not avaialble");
        notice.setIsActive(false);
        repository.save(notice);
        return "Notice Updated successfully";
    }

    @GetMapping(value = "/list")
    public List<FantasyNotice> getNoticeList() {
        return repository.findFantasyNoticeByIsActive(Boolean.TRUE);
    }

    @GetMapping(value = "/taskschedular/toggle")
    public String toggleTaskSchedular() {
        String taskName = "CRIC_API_TASK";
        TaskSchedular taskSchedular = taskSchedularRepository.findTaskByName(taskName);
        taskSchedular.setIsActive(!taskSchedular.getIsActive());
        String action = taskSchedular.getIsActive() ? "Started" : "Stopped";
        taskSchedularRepository.save(taskSchedular);
        return "Task Schedular " + action + " Successfully";
    }

}
