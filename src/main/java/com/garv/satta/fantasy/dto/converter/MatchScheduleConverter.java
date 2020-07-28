package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.MatchScheduleDTO;
import com.garv.satta.fantasy.model.backoffice.MatchSchedule;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MatchScheduleConverter extends Converter<MatchSchedule, MatchScheduleDTO> {

    public MatchSchedule convertToEntity(MatchScheduleDTO dto) {
        return mapper.map(dto, MatchSchedule.class);
    }

    public MatchScheduleDTO convertToDTO(MatchSchedule entity) {
        return mapper.map(entity, MatchScheduleDTO.class);
    }

    @Override
    public MatchSchedule convertToFullEntity(MatchScheduleDTO dto) {
        return null;
    }

    @Override
    public MatchScheduleDTO convertToFullDTO(MatchSchedule entity) {
        return null;
    }

    @Override
    public MatchSchedule convertToShortEntity(MatchScheduleDTO dto) {
        return null;
    }

    public List<MatchScheduleDTO> convertToDTOList(List<MatchSchedule> entityList) {
        return mapToDTOList(entityList, MatchScheduleDTO.class);
    }

}
