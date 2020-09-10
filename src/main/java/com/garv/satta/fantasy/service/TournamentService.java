package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.TournamentRepository;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.dto.TournamentDTO;
import com.garv.satta.fantasy.dto.converter.TournamentConverter;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import com.garv.satta.fantasy.service.admin.CacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class TournamentService {
    @Autowired
    private TournamentRepository tournamentRepository;

    @Autowired
    private TournamentConverter tournamentConverter;

    @Autowired
    private CacheService cacheService;

    private final String T_CACHE = "TOURNAMENT_CACHE";

    @Cacheable(cacheNames = T_CACHE , keyGenerator = "customKeyGenerator")
    public List<TournamentDTO> getTournamentList() {
        List<Tournament> tournamentList = tournamentRepository.findAll();
        return tournamentConverter.convertToFullDTOList(tournamentList);
    }

    @Cacheable(cacheNames = T_CACHE , keyGenerator = "customKeyGenerator")
    public List<TournamentDTO> getTournamentShortList() {
        List<Tournament> tournamentList = tournamentRepository.findAll();
        return tournamentConverter.convertToDTOList(tournamentList);
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
        clearTournamentCache();
        return tournamentConverter.convertToDTO(tournament);
    }

    @Cacheable(cacheNames = T_CACHE , keyGenerator = "customKeyGenerator")
    public TournamentDTO getTournamentById(Long id) {
        Tournament tournament = tournamentRepository.findTournamentById(id);
        return tournamentConverter.convertToDTO(tournament);
    }

    @Cacheable(cacheNames = T_CACHE , keyGenerator = "customKeyGenerator")
    public TournamentDTO getTournamentByName(String name) {
        Tournament tournament = tournamentRepository.findTournamentByName(name);
        return tournamentConverter.convertToDTO(tournament);
    }

    @Cacheable(cacheNames = T_CACHE , keyGenerator = "customKeyGenerator")
    public TournamentDTO getFirstActiveTournament() {
        Tournament tournament = tournamentRepository.findFirstByIsActive(Boolean.TRUE);
        return tournamentConverter.convertToDTO(tournament);
    }

    public void lockTournament(RequestDTO dto) {
        Tournament tournament = tournamentRepository.findTournamentById(dto.getId());
        tournament.setStatus(false);
        tournamentRepository.save(tournament);
        clearTournamentCache();
    }

    public void lockTournamentByName(String name) {
        Tournament tournament = tournamentRepository.findTournamentByName(name);
        tournament.setStatus(false);
        tournamentRepository.save(tournament);
        clearTournamentCache();
    }

    public void unlockTournament(RequestDTO dto) {
        Tournament tournament = tournamentRepository.findTournamentById(dto.getId());
        tournament.setStatus(true);
        tournamentRepository.save(tournament);
        clearTournamentCache();
    }

    public void clearTournamentCache() {
        cacheService.evictAllCacheValues(T_CACHE);
    }
}
