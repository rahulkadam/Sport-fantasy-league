package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.Constant.FantasyConstant;
import com.garv.satta.fantasy.dao.repository.*;
import com.garv.satta.fantasy.dto.UserTeamDTO;
import com.garv.satta.fantasy.dto.PlayerDTO;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.dto.converter.UserTeamConverter;
import com.garv.satta.fantasy.dto.converter.PlayerConverter;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.fantasyenum.GameEnum;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeamScorePerMatch;
import com.garv.satta.fantasy.model.frontoffice.User;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import com.garv.satta.fantasy.model.monitoring.FantasyConfig;
import com.garv.satta.fantasy.service.admin.FantasyConfigService;
import com.garv.satta.fantasy.validation.GameTeamValidator;
import com.garv.satta.fantasy.validation.PlayerValidator;
import com.garv.satta.fantasy.validation.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserTeamService {

    @Autowired
    private UserTeamRepository repository;

    @Autowired
    private UserTeamConverter converter;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private PlayerUserTeamRepository playerUserTeamRepository;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private FantasyConfigService fantasyConfigService;

    @Autowired
    private PlayerValidator playerValidator;

    @Autowired
    private PlayerConverter playerConverter;

    @Autowired
    private GameTeamValidator gameTeamValidator;

    @Autowired
    private UserService userService;

    @Autowired
    private LeagueService leagueService;

    @Autowired
    private TournamentRepository tournamentRepository;

    @Autowired
    private LeagueUserTeamScorePerMatchRepository leagueUserTeamScorePerMatchRepository;

    public UserTeamDTO getShortUserTeamByUser(Long id) {
        List<UserTeam> userTeamlist = repository.findUserTeamByUserId(id);
        if(CollectionUtils.isEmpty(userTeamlist)) {
            return null;
        }
        UserTeam userTeam = userTeamlist.get(0);
        Integer leagueCount = userTeam.getLeagueUserTeamsCount();
        UserTeamDTO userTeamDTO = converter.convertToDTO(userTeam);
        userTeamDTO.setTotal_leagues(leagueCount);
        return userTeamDTO;
    }

    public List<UserTeamDTO> getUserTeamByUser(Long id) {
        List<UserTeam> userTeamlist = repository.findUserTeamByUserId(id);
        if (CollectionUtils.isEmpty(userTeamlist)) {
            return new ArrayList<>();
        }
        return converter.convertToFullDTOList(userTeamlist);
    }

    public UserTeamDTO getUserTeamById(Long id) {
        UserTeam userTeam = repository.findUserTeamById(id);
        return converter.convertToFullDTO(userTeam);
    }

    public List<PlayerDTO> getPlayerListByUserTeamId(Long id) {
        UserTeam userTeam = repository.findUserTeamById(id);
        Assert.notNull(userTeam, "User Team is not valid, Please check again");

        List<Player> playerList = playerUserTeamRepository.findPlayerByUserTeam(userTeam);
        return playerConverter.convertToFullDTOList(playerList);
    }

    public List<UserTeamDTO> getTop30Users() {
        List<UserTeam> userTeamList = repository.findFirst30ByOrderByIdDesc();
        return converter.convertToFullDTOList(userTeamList);
    }

    public UserTeamDTO createUserTeam(UserTeamDTO userTeamDTO) {
        Long userId = userService.getCurrentUserId();
        List<UserTeam> userTeamList = repository.findUserTeamByUserId(userId);

        if (!CollectionUtils.isEmpty(userTeamList)) {
            throw new GenericException("Team already present, please check with support team for details");
        }
        userValidator.validateUserId(userId);

        List<Tournament> tournamentList = tournamentRepository.findAll();
        Assert.notEmpty(tournamentList, "Tournament Not found, please refresh/ login again");

        UserTeam userTeam = converter.convertToFullEntity(userTeamDTO);
        // TODO tournament logic we will move to front end
        userTeam.setTournament(tournamentList.get(0));
        userTeam.setUser(new User(userId));
        userTeam.setStatus(Boolean.TRUE);
        userTeam.setTotal_Transfer(FantasyConstant.DEFAULT_TOTAL_TRANSFER);
        userTeam.setTotal_score(0);
        userTeam.setRemained_Transfer(FantasyConstant.DEFAULT_TOTAL_TRANSFER);
        userTeam.setCurrent_Used_Transfer(0);
        userTeam.setLast_score(0);
        userTeam.setUsed_Transfer(0);
        userTeam.setCreditbalance(FantasyConstant.DEFAULT_CREDIT_BALANCE);
        userTeam.setTotalbalance(FantasyConstant.DEFAULT_CREDIT_BALANCE);
        userTeam.setCaptain_player(null);
        userTeam = repository.save(userTeam);
        leagueService.joinPublicGlobalLeague(userTeam);
        return converter.convertToFullDTO(userTeam);
    }

    /**
     * Add / Udpate User Team with Player
     * @param dto
     */
    public void addPlayerListToUserTeam(RequestDTO dto) {

        List<Long> playerIdList = dto.getAddList();
        Long userId = userService.getCurrentUserId();
        Long captainId = dto.getCaptainId();
        List<UserTeam> userTeamList = repository.findUserTeamByUserId(userId);
        Assert.notEmpty(userTeamList, "User Team is not valid, Please check again");

        List<Player> playerList = playerRepository.findAllByIdIn(playerIdList);
        UserTeam userTeam = userTeamList.get(0);
        Tournament tournament = userTeam.getTournament();
        // ** adding changes for locking team transfer, we can improve it later by adding lock flag, for now, we will do with status flag on tournament
        Assert.isTrue(tournament.getStatus(), "User Team updation is not valid now, please try after sometime for next match");
        GameEnum gameName = tournament.getSportName();
        gameTeamValidator.validateTeamForGame(gameName.toString(), playerList);

        Double teamValue = playerList.stream().mapToDouble(player -> player.getValue()).sum();
        Float creditBalance = userTeam.getTotalbalance() - (float) ((double) teamValue);
        userTeam.setCreditbalance(creditBalance);

        //TODO enable on 19th Sept

        String value = fantasyConfigService.getTransferCountKeyValue();
        if ("ENABLE".equalsIgnoreCase(value)) {
            List<Player> playerList1 = playerUserTeamRepository.findPlayerByUserTeam(userTeam);
            if (playerList1.isEmpty()) {
                userTeam.setUsed_Transfer(0);
                userTeam.setCreditbalance(creditBalance);
            } else {
                long transferCount = playerList1.size() - playerList1.stream().filter(player -> playerIdList.contains(player.getId())).count();
                Integer usedTransafer = (int) (userTeam.getUsed_Transfer() + transferCount);
                Integer totalTransfer = userTeam.getTotal_Transfer();
                Assert.isTrue(usedTransafer < totalTransfer, "Transfer count exceeded is not Valid");
                userTeam.setUsed_Transfer(usedTransafer);
                userTeam.setRemained_Transfer(userTeam.getTotal_Transfer() - usedTransafer);
            }
        }
        userTeam.setCaptain_player(new Player(captainId));
        userTeam.resetPlayerList(playerList);
        repository.save(userTeam);
    }

    public UserTeam getAuthenticatedUserTeam() {
        Long userId = userService.getAuthenticatedUserId();
        if (userId == null) {
            return null;
        }
        UserTeam userTeam = repository.findFirstByUserId(userId);
        return userTeam;
    }

    public void calculatePointforUserFromForTournament(Long id) {
        UserTeam userTeam  = repository.findUserTeamById(id);
        if (userTeam != null) {
            List<LeagueUserTeamScorePerMatch> scoreList = leagueUserTeamScorePerMatchRepository.findAllByUserTeamId(userTeam.getId());
            Integer totalScore = scoreList.stream().map(a-> a.getCurrent_match_point()).reduce(0, (a, b) -> a+ b);
            userTeam.setTotal_score(totalScore);
            repository.save(userTeam);
        }
    }
}
