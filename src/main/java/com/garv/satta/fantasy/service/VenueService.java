package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.VenueRepository;
import com.garv.satta.fantasy.dto.VenueDTO;
import com.garv.satta.fantasy.dto.converter.VenueConverter;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.backoffice.Venue;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class VenueService {

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private VenueConverter converter;

    @Autowired
    private ExcelFileService excelFileService;

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

    public void uploadVenueList(MultipartFile file) {
        Iterator<Row> rowList = excelFileService.readData(file);
        List<Venue> venueList = new ArrayList<>();

        while (rowList.hasNext()) {
            Row row = rowList.next();
            String name = row.getCell(0).getStringCellValue();
            String city = row.getCell(2).getStringCellValue();
            String country = row.getCell(1).getStringCellValue();
            Venue venue = new Venue();
            venue.setCity(city);
            venue.setName(name);
            venue.setCountry(country);
            venueList.add(venue);
        }
        venueRepository.saveAll(venueList);
    }
}
