package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.MatchScheduleRepository;
import com.garv.satta.fantasy.dto.MatchScheduleDTO;
import com.garv.satta.fantasy.dto.converter.MatchScheduleConverter;
import com.garv.satta.fantasy.model.backoffice.MatchSchedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchScheduleService {

    @Autowired
    private MatchScheduleRepository repository;

    @Autowired
    private MatchScheduleConverter converter;

    public List<MatchScheduleDTO> getMatchScheduleList() {
        List<MatchSchedule> matchSchedules = repository.findAll();
        return converter.convertToDTOList(matchSchedules);
    }

    public MatchScheduleDTO getMatchScheduleById(Long id) {
        MatchSchedule matchSchedule = repository.findMatchScheduleById(id);
        return converter.convertToDTO(matchSchedule);
    }

    public MatchScheduleDTO createMatchSchedule(MatchScheduleDTO matchScheduleDTO) {
        MatchSchedule matchSchedule = converter.convertToEntity(matchScheduleDTO);
        matchSchedule = repository.save(matchSchedule);
        return converter.convertToDTO(matchSchedule);
    }
}
