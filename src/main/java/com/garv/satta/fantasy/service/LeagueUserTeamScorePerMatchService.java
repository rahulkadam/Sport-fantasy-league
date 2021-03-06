package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.LeagueUserTeamScorePerMatchRepository;
import com.garv.satta.fantasy.dto.*;
import com.garv.satta.fantasy.dto.converter.LeagueUserTeamScoreHistoryConverter;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeam;
import com.garv.satta.fantasy.model.frontoffice.LeagueUserTeamScorePerMatch;
import com.garv.satta.fantasy.model.frontoffice.UserTeam;
import com.garv.satta.fantasy.service.admin.FantasyConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;
import java.util.Set;

@Service
public class LeagueUserTeamScorePerMatchService {

    @Autowired
    private LeagueUserTeamScorePerMatchRepository leagueUserTeamScorePerMatchRepository;

    @Autowired
    private LeagueUserTeamScoreHistoryConverter converter;

    @Autowired
    private MatchPlayerScoreService matchPlayerScoreService;

    @Autowired
    private PlayerService playerService;

    @Autowired
    private MatchService matchService;

    @Autowired
    private FantasyConfigService fantasyConfigService;

    @Autowired
    private UserTeamService userTeamService;

    public void saveLeagueUserTeamScorePerMatch(UserTeam userTeam, Match match, Integer matchPoint, Integer totalPoint) {

        LeagueUserTeamScorePerMatch leagueUserTeamScorePerMatch = new LeagueUserTeamScorePerMatch();
        leagueUserTeamScorePerMatch.setMatch(match);
        leagueUserTeamScorePerMatch.setUserTeam(userTeam);
        leagueUserTeamScorePerMatch.setTotalPoint(totalPoint);
        leagueUserTeamScorePerMatch.setCurrent_match_point(matchPoint);

        leagueUserTeamScorePerMatchRepository.save(leagueUserTeamScorePerMatch);
    }

    // save for al user Team at the start
    public void saveListAtMatchInit(List<UserTeam> userTeamList, Match match) {
        userTeamList.forEach(userTeam -> saveLeagueUserTeamAtMatchInit(userTeam, match));
    }

    public Boolean isLeagueUserInitializeForMatch(Long matchId) {
        LeagueUserTeamScorePerMatch leagueUserTeamScorePerMatch =
                leagueUserTeamScorePerMatchRepository.findFirstByMatchId(matchId);

        if (leagueUserTeamScorePerMatch == null) {
            return  false;
        }
        return true;
    }

    public void saveLeagueUserTeamAtMatchInit(UserTeam userTeam, Match match) {
        long[] playerIds = userTeam.getPlayerIds().stream().mapToLong(l -> l).toArray();
        LeagueUserTeamScorePerMatch leagueUserTeamScorePerMatch = new LeagueUserTeamScorePerMatch();
        leagueUserTeamScorePerMatch.setMatch(match);
        leagueUserTeamScorePerMatch.setUserTeam(userTeam);
        leagueUserTeamScorePerMatch.setTotalPoint(userTeam.getTotal_score());
        leagueUserTeamScorePerMatch.setCurrent_match_point(0);
        leagueUserTeamScorePerMatch.setPlayerList(playerIds);
        if (userTeam.getCaptain_player() != null) {
            leagueUserTeamScorePerMatch.setCaptain_player(userTeam.getCaptain_player().getId());
        }
        leagueUserTeamScorePerMatchRepository.save(leagueUserTeamScorePerMatch);
    }

    public LeagueUserTeamScoreHistoryDTO getUserScorePerMatch(RequestDTO requestDTO) {
        Long userTeamId = requestDTO.getUserTeamId();
        Long matchId = requestDTO.getMatchId();
        LeagueUserTeamScorePerMatch leagueUserTeamScorePerMatch =
                leagueUserTeamScorePerMatchRepository.findTeamScoreByUserTeamIdAndMatchId(userTeamId, matchId);
        return converter.convertToFullDTO(leagueUserTeamScorePerMatch);
    }

    public LeagueUserTeamScorePerMatch getLeagueUserTeamScorePerMatchByMatch(Long userTeamId) {
        Match match = matchService.getJustStartedMatchList();
        LeagueUserTeamScorePerMatch leagueUserTeamScorePerMatch =
                leagueUserTeamScorePerMatchRepository.findTeamScoreByUserTeamIdAndMatchId(userTeamId, match.getId());
        if (leagueUserTeamScorePerMatch == null || leagueUserTeamScorePerMatch.getPlayerList() == null) {
            throw new GenericException("User Team is not available");
        }
        return leagueUserTeamScorePerMatch;
    }

    public UserTeamDTO getUserTeamDtoFromScorePerMatch(Match match, Long userTeamId) {
        LeagueUserTeamScorePerMatch leagueUserTeamScorePerMatch = getLeagueUserTeamScorePerMatchByMatch(userTeamId);
        long[] playerIds = leagueUserTeamScorePerMatch.getPlayerList();
        List<PlayerDTO> playerList = playerService.getPlayerListbyids(playerIds);
        return converter.getUserTeamDtoFromEntity(leagueUserTeamScorePerMatch, playerList);
    }

    public Long getUserTeamIdFromRequest(RequestDTO requestDTO) {
        Long userTeamId = requestDTO.getUserTeamId();
        if (userTeamId == null) {
            UserTeam userTeam = userTeamService.getAuthenticatedUserTeam();
            if (userTeam == null) {
                throw new GenericException("User Team is not available");
            }
            userTeamId = userTeam.getId();
        }

        return userTeamId;
    }

    public UserTeamDTO getUserTeamByLastCompletedMatch(RequestDTO requestDTO) {
        Long userTeamId = getUserTeamIdFromRequest(requestDTO);
        Match match = matchService.getJustStartedMatchList();
        UserTeamDTO userTeamDTO = getUserTeamDtoFromScorePerMatch(match, userTeamId);
        userTeamDTO.setDescription(match.getDescription());
        return userTeamDTO;
    }

    public List<MatchPlayerScoreDTO> getUserScorePerMatchStats(RequestDTO requestDTO) {
        Long userTeamId = requestDTO.getUserTeamId();
        Long matchId = requestDTO.getMatchId();
        LeagueUserTeamScorePerMatch leagueUserTeamScorePerMatch =
                leagueUserTeamScorePerMatchRepository.findTeamScoreByUserTeamIdAndMatchId(userTeamId, matchId);
        if (leagueUserTeamScorePerMatch == null) {
            return null;
        }
        Assert.notNull(leagueUserTeamScorePerMatch, "Score not found for user");
        long[] playerIds = leagueUserTeamScorePerMatch.getPlayerList();
        return matchPlayerScoreService.getMatchScoreByPlayerIds(matchId, playerIds);
    }

    public LeagueUserTeamScorePerMatch findTeamScoreByUserTeamIdAndMatchId(Long userTeamId, Long matchId) {
        LeagueUserTeamScorePerMatch leagueUserTeamScorePerMatch =
                leagueUserTeamScorePerMatchRepository.findTeamScoreByUserTeamIdAndMatchId(userTeamId, matchId);
        return leagueUserTeamScorePerMatch;
    }

}
