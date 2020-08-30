package com.garv.satta.fantasy.controller.admin;

import com.garv.satta.fantasy.dao.repository.FantasyNoticeRepository;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.model.monitoring.FantasyNotice;
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


}
