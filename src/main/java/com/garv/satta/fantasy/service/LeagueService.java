package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.Constant.FantasyConstant;
import com.garv.satta.fantasy.dao.repository.LeagueRepository;
import com.garv.satta.fantasy.dao.repository.LeagueUserTeamRepository;
import com.garv.satta.fantasy.dao.repository.UserTeamRepository;
import com.garv.satta.fantasy.dto.LeagueDTO;
import com.garv.satta.fantasy.dto.TournamentDTO;
import com.garv.satta.fantasy.dto.converter.LeagueConverter;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import com.garv.satta.fantasy.model.frontoffice.League;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import com.garv.satta.fantasy.model.frontoffice.User;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import com.garv.satta.fantasy.service.admin.FantasyConfigService;
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

    @Autowired
    private FantasyErrorService fantasyErrorService;

    @Autowired
    private FantasyConfigService fantasyConfigService;

    @Autowired
    private TournamentService tournamentService;


    public List<LeagueDTO> getLeaguesList() {
        List<League> leagues = repository.findAll();
        return converter.convertToDTOList(leagues);
    }

    public LeagueDTO getLeagueById(Long id) {
        League league = repository.findLeagueById(id);
        return converter.convertToFullDTO(league);
    }

    public void createLeague(LeagueDTO leagueDTO) {
        League league = converter.convertToEntity(leagueDTO);
        Long userId = userService.getCurrentUserId();
        league.setId(null);
        TournamentDTO tournamentDTO = tournamentService.getFirstActiveTournament();
        league.setTournament(new Tournament(tournamentDTO.getId()));
        String leagueCode = LeagueCodeGenerator.randomAlphaNumeric(FantasyConstant.DEFAULT_LEAGUE_CODE_LENGTH);
        league.setLeagueCode(leagueCode);
        league.setStatus(true);
        league.setCreated_by(new User(userId));
        league.setUpdated_by(new User(userId));
        league = repository.save(league);
        joinLeagueByCode(league.getLeagueCode());
    }

    public void joinLeagueByCode(String leagueCode) {
        Long userId = userService.getCurrentUserId();
        League league = repository.findLeagueByLeagueCode(leagueCode);
        Assert.notNull(league,"League not found, please check with League admin again");
        List<UserTeam> userTeamList = userTeamRepository.findUserTeamByUserId(userId);
        Assert.isTrue(userTeamList.size() == 1, "Please create team first and join League");
        UserTeam userTeam = userTeamList.get(0);
        List<League> leagueList = leagueUserTeamRepository.findLeagueByUserTeam(userTeam);
        Optional<League> leagueObject = leagueList.stream().filter(league1 -> league1.getLeagueCode().equalsIgnoreCase(leagueCode)).findFirst();
        if (leagueObject.isPresent()) {
            throw new GenericException("already member of league : "+ leagueObject.get().getName());
        }

        if((league.getPublicLeague() != null && !league.getPublicLeague()) && league.getTotalUserCount() > 20) {
            throw new GenericException("league private member count exceed, can not add more than 20 users in private league");
        }
        league.addLeagueMembers(userTeam);
        repository.save(league);
    }

    public List<LeagueDTO> getLeagueByUserId(Long id) {
        List<UserTeam> userTeamList = userTeamRepository.findUserTeamByUserId(id);
        if (CollectionUtils.isEmpty(userTeamList)) {
            return new ArrayList<>();
        }
        UserTeam userTeam = userTeamList.stream().findFirst().orElse(null);
        List<League> userLeagueList = leagueUserTeamRepository.findLeagueByUserTeam(userTeam);
        return converter.convertToFullDTOListWithUserTeamId(userLeagueList, userTeam.getId());
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
        return converter.convertToDTOList(userLeagueList);
    }

    public void joinPublicGlobalLeague(UserTeam userteam) {
        try {
            List<League> userLeagueList = repository.findLeagueByPublicLeague(true);
            Optional<League> globalLeague = userLeagueList.stream().filter(league -> league.getName().contains("Global")).findFirst();
            if (globalLeague.isPresent()) {
                League l = globalLeague.get();
                joinLeagueByCode(l.getLeagueCode());
                l.addLeagueMembers(userteam);
                repository.save(l);
            }
        } catch (Exception e) {
            fantasyErrorService.logMessage("Unable to add global league for: " + userteam.getId() , e.getMessage());
        }
    }
}
