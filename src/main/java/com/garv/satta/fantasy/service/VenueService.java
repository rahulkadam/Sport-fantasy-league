package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.VenueRepository;
import com.garv.satta.fantasy.dto.VenueDTO;
import com.garv.satta.fantasy.dto.converter.VenueConverter;
import com.garv.satta.fantasy.model.backoffice.Venue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VenueService {

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private VenueConverter converter;

    public List<VenueDTO> getVenueList() {
        List<Venue> venueList =  venueRepository.findAll();
        return converter.convertToDTOList(venueList);
    }

    public VenueDTO getVenueById(Long id) {
        Venue venue =  venueRepository.findVenueById(id);
        return converter.convertToDTO(venue);
    }

    public VenueDTO createVenue(VenueDTO venueDTO) {
        Venue venue = converter.convertToEntity(venueDTO);
        venue.setId(null);
        venue =  venueRepository.save(venue);
        return converter.convertToDTO(venue);
    }
}
