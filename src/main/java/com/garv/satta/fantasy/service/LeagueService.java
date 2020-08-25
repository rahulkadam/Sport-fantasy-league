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
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import com.garv.satta.fantasy.validation.TournamentValidator;
import com.garv.satta.fantasy.validation.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
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

    @Autowired
    private UserService userService;


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
        String leagueCode = LeagueCodeGenerator.randomAlphaNumeric(FantasyConstant.DEFAULT_LEAGUE_CODE_LENGTH);
        league.setLeagueCode(leagueCode);
        league.setStatus(true);
        league = repository.save(league);
        joinLeagueByCode(league.getLeagueCode(), userService.getCurrentUserId());
        return converter.convertToFullDTO(league);
    }

    public void joinLeagueByCode(String leagueCode, Long userId) {
        userId = userService.getCurrentUserId();
        League league = repository.findLeagueByLeagueCode(leagueCode);
        List<UserTeam> userTeamList = userTeamRepository.findUserTeamByUserId(userId);
        Assert.isTrue(userTeamList.size() == 1, "User does not have proper team, please create teams");
        UserTeam userTeam = userTeamList.get(0);
        List<League> leagueList = leagueUserTeamRepository.findLeagueByUserTeam(userTeam);
        Optional<League> leagueObject = leagueList.stream().filter(league1 -> league1.getLeagueCode().equalsIgnoreCase(leagueCode)).findFirst();
        if (leagueObject.isPresent()) {
            throw new GenericException("already member of league : "+ leagueObject.get().getName());
        }
        addRemoveUserTeamFromLeague(league, userTeam.getId(), OperationEnum.ADD);
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
        Assert.notNull(userTeam, "User id is missing, Please logout and login again");
        Assert.notNull(league,"League not found, please check with League admin again");
        if (OperationEnum.ADD.equals(operation)) {
            league.addLeagueMembers(userTeam);
        } else {
            league.removeLeague(userTeam);
        }
        repository.save(league);
    }

    public List<LeagueDTO> getLeagueByUserId(Long id) {
        List<UserTeam> userTeamList = userTeamRepository.findUserTeamByUserId(id);
        if (CollectionUtils.isEmpty(userTeamList)) {
            return new ArrayList<>();
        }
        UserTeam userTeam = userTeamList.stream().findFirst().orElse(null);
        List<League> userLeagueList = leagueUserTeamRepository.findLeagueByUserTeam(userTeam);
        return converter.convertToFullDTOList(userLeagueList);
    }

    public List<LeagueDTO> getDashboardLeaguesByUserTeam(UserTeam userTeam) {
        List<LeagueUserTeam> leagueUserTeams = leagueUserTeamRepository.findLeagueUserTeamByUserTeam(userTeam);
        List<LeagueDTO> leagueDTOS = new ArrayList<>();
        if (CollectionUtils.isEmpty(leagueUserTeams)) {
            return leagueDTOS;
        }
        leagueUserTeams.stream().forEach(leagueUserTeam -> {
            LeagueDTO leagueDTO = converter.convertToDTO(leagueUserTeam.getLeague());
            leagueDTO.setIsMember(true);
            leagueDTO.setUserRank(leagueUserTeam.getUserrank());
            leagueDTOS.add(leagueDTO);
        });
        return leagueDTOS;
    }

    public List<LeagueDTO> getLeagueByPublic() {
        List<League> userLeagueList = repository.findLeagueByPublicLeague(true);
        return converter.convertToFullDTOList(userLeagueList);
    }

    public void joinPublicLeague() {
        List<League> publicLeague = repository.findLeagueByPublicLeague(true);
        if (!CollectionUtils.isEmpty(publicLeague)) {
            publicLeague.stream().forEach((leauge) ->joinLeagueByCode(leauge.getLeagueCode(), userService.getCurrentUserId()));
        }
    }

}
