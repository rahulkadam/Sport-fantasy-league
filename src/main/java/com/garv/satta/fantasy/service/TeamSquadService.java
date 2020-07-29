package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.PlayerRepository;
import com.garv.satta.fantasy.dao.repository.TeamSquadRepository;
import com.garv.satta.fantasy.dto.TeamSquadDTO;
import com.garv.satta.fantasy.dto.converter.TeamSquadDTOConverter;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.backoffice.TeamSquad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamSquadService {

    @Autowired
    private TeamSquadDTOConverter converter;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private TeamSquadRepository teamSquadRepository;


    public TeamSquadDTO createTeamSquad(TeamSquadDTO dto) {
        TeamSquad teamSquad = converter.convertToFullEntity(dto);
        teamSquad = teamSquadRepository.save(teamSquad);
        return converter.convertToFullDTO(teamSquad);
    }

    public TeamSquadDTO findSquadByTeamId(Long id) {
        TeamSquad teamSquad = teamSquadRepository.findTeamSquadByTeamId(id);
        return converter.convertToFullDTO(teamSquad);
    }

    public void addPlayerToSquad(Long squadId, Long playedId) {
        Player player = playerRepository.findPlayerById(playedId);
        TeamSquad squad = teamSquadRepository.findTeamSquadById(squadId);

        if ( squad != null && player != null) {
            List<Player> playerList = squad.getPlayerList();
            Long squadLength = squad.getSquadLength();
            // Squad count should not exceed
            if (playerList != null && (squadLength == null || playerList.size() < squadLength-1 )) {
                squad.addPlayer(player);
                teamSquadRepository.save(squad);
            }
        } else {
            throw new GenericException("Unable to add , player or squad is not valid");
        }
    }

    public void removePlayerFromSquad(Long squadId, Long playedId) {
        Player player = playerRepository.findPlayerById(playedId);
        TeamSquad squad = teamSquadRepository.findTeamSquadById(squadId);

        if (squad != null && player != null) {
            squad.removePlayer(player);
            teamSquadRepository.save(squad);
        } else {
            throw new GenericException("Unable to Remove , player or squad is not valid");
        }
    }
}
