package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.VenueDTO;
import com.garv.satta.fantasy.model.backoffice.Venue;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class VenueConverter extends Converter<Venue, VenueDTO> {

    public Venue convertToEntity(VenueDTO dto) {
        return mapper.map(dto, Venue.class);
    }

    public VenueDTO convertToDTO(Venue entity) {
        return mapper.map(entity, VenueDTO.class);
    }

    public List<VenueDTO> convertToDTOList(List<Venue> entityList) {
        return mapToDTOList(entityList, VenueDTO.class);
    }

}
