package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.Constant.FantasyConstant;
import com.garv.satta.fantasy.dao.repository.LeagueRepository;
import com.garv.satta.fantasy.dao.repository.LeagueUserTeamRepository;
import com.garv.satta.fantasy.dao.repository.UserTeamRepository;
import com.garv.satta.fantasy.dto.LeagueDTO;
import com.garv.satta.fantasy.dto.converter.LeagueConverter;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.fantasyenum.OperationEnum;
import com.garv.satta.fantasy.model.frontoffice.League;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import com.garv.satta.fantasy.validation.TournamentValidator;
import com.garv.satta.fantasy.validation.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeagueService {

    @Autowired
    private LeagueRepository repository;

    @Autowired
    private LeagueConverter converter;

    @Autowired
    private UserTeamRepository userTeamRepository;

    @Autowired
    private LeagueUserTeamRepository leagueUserTeamRepository;

    @Autowired
    private TournamentValidator tournamentValidator;


    @Autowired
    private UserValidator userValidator;


    public List<LeagueDTO> getLeaguesList() {
        List<League> leagues = repository.findAll();
        return converter.convertToDTOList(leagues);
    }

    public LeagueDTO getLeagueById(Long id) {
        League league = repository.findLeagueById(id);
        return converter.convertToFullDTO(league);
    }

    public LeagueDTO createLeague(LeagueDTO leagueDTO) {
        League league = converter.convertToFullEntity(leagueDTO);
        league.setId(null);
        tournamentValidator.validateTournamentById(leagueDTO.getTournamentId());
        userValidator.validateUserId(leagueDTO.getCreateByUserId());
        String leagueCode = LeagueCodeGenerator.randomAlphaNumeric(FantasyConstant.DEFAULT_LEAGUE_CODE_LENGTH);
        league.setLeagueCode(leagueCode);
        league.setStatus(true);
        league = repository.save(league);
        List<UserTeam> userTeams = userTeamRepository.findUserTeamByUserId(leagueDTO.getCreateByUserId());
        if (userTeams.size() > 0) {
            joinLeagueByCode(league.getLeagueCode(), userTeams.get(0).getId());
        } else {
            throw new GenericException("Please Create User Team first");
        }
        return converter.convertToFullDTO(league);
    }

    public void joinLeagueByCode(String leagueCode, Long userTeamId) {
        League league = repository.findLeagueByLeagueCode(leagueCode);
        UserTeam userTeam = userTeamRepository.findUserTeamById(userTeamId);
        List<League> leagueList = leagueUserTeamRepository.findLeagueByUserTeam(userTeam);
        Optional<League> leagueObject = leagueList.stream().filter(league1 -> league1.getLeagueCode().equalsIgnoreCase(leagueCode)).findFirst();
        if (leagueObject.isPresent()) {
            throw new GenericException("already member of league : "+ leagueObject.get().getName());
        }
        addRemoveUserTeamFromLeague(league, userTeamId, OperationEnum.ADD);
    }

    public void addUserTeamToLeague(Long leagueId, Long userTeamId) {
        League league = repository.findLeagueById(leagueId);
        addRemoveUserTeamFromLeague(league, userTeamId, OperationEnum.ADD);
    }

    public void removeUserTeamFromLeague(Long leagueId, Long userTeamId) {
        League league = repository.findLeagueById(leagueId);
        addRemoveUserTeamFromLeague(league, userTeamId, OperationEnum.REMOVE);
    }

    /**
     * Function to add or remove UserTeam from League
     * @param league
     * @param userTeamId
     * @param operation
     */
    private void addRemoveUserTeamFromLeague(League league, Long userTeamId, OperationEnum operation) {
        UserTeam userTeam = userTeamRepository.findUserTeamById(userTeamId);
        if (userTeam == null || league == null) {
            throw new GenericException("UserTeam Or League is not valid");
        }
        if (OperationEnum.ADD.equals(operation)) {
            league.addLeagueMembers(userTeam);
        } else {
            league.removeLeague(userTeam);
        }
        repository.save(league);
    }

    public List<LeagueDTO> getLeagueByUserId(Long id) {
        List<UserTeam> userTeamList = userTeamRepository.findUserTeamByUserId(id);
        UserTeam userTeam = userTeamList.stream().findFirst().orElse(null);
        if (userTeam == null) {
            throw new GenericException("Unable to find League for User");
        }
        List<League> userLeagueList = leagueUserTeamRepository.findLeagueByUserTeam(userTeam);
        return converter.convertToFullDTOList(userLeagueList);
    }

}
