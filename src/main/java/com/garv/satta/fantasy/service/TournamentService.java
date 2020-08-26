package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.TournamentRepository;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.dto.TournamentDTO;
import com.garv.satta.fantasy.dto.converter.TournamentConverter;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class TournamentService {
    @Autowired
    private TournamentRepository tournamentRepository;

    @Autowired
    private TournamentConverter tournamentConverter;

    public List<TournamentDTO> getTournamentList() {
        List<Tournament> tournamentList = tournamentRepository.findAll();
        return tournamentConverter.convertToFullDTOList(tournamentList);
    }

    /**
     * Creating Tournament for Fantasy
     * @param tournamentDto
     * @return
     */
    public TournamentDTO createTournament(@RequestBody TournamentDTO tournamentDto) {
        Tournament tournament = tournamentConverter.convertToEntity(tournamentDto);
        tournament.setStatus(true);
        tournament.setId(null);
        tournament =  tournamentRepository.save(tournament);
        return tournamentConverter.convertToDTO(tournament);
    }

    public TournamentDTO getTournamentById(Long id) {
        Tournament tournament = tournamentRepository.findTournamentById(id);
        return tournamentConverter.convertToDTO(tournament);
    }

    public TournamentDTO getTournamentByName(String name) {
        Tournament tournament = tournamentRepository.findTournamentByName(name);
        return tournamentConverter.convertToDTO(tournament);
    }

    public void lockTournament(RequestDTO dto) {
        Tournament tournament = tournamentRepository.findTournamentById(dto.getId());
        tournament.setStatus(false);
        tournamentRepository.save(tournament);
    }

    public void unlockTournament(RequestDTO dto) {
        Tournament tournament = tournamentRepository.findTournamentById(dto.getId());
        tournament.setStatus(true);
        tournamentRepository.save(tournament);
    }
}
