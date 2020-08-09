package com.garv.satta.fantasy.validation;

import com.garv.satta.fantasy.dao.repository.GameRepository;
import com.garv.satta.fantasy.dao.repository.UserTeamRepository;
import com.garv.satta.fantasy.model.backoffice.Game;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.backoffice.PlayerCriteria;
import com.garv.satta.fantasy.model.backoffice.TeamCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class GameTeamValidator {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserTeamRepository userTeamRepository;

    public void validateTeamForGame(String gameName, List<Player> playerList) {
        Game game = gameRepository.findGameByName(gameName);
        Assert.notNull(game, "Game Name is Not Valid");
        TeamCriteria teamCriteria = game.getTeamCriteria();
        validateTeamCriteriaForTeam(teamCriteria, playerList);

        List<PlayerCriteria> playerCriteriaList = game.getPlayerCriteriaList();
        validatePlayerCriteriaList(playerCriteriaList, playerList);
    }

    public void validateTeamCriteriaForTeam(TeamCriteria teamCriteria, List<Player> playerList) {
        Integer maxPerTeam = teamCriteria.getMaxPlayerPerTeam();
        Integer totalCount = teamCriteria.getTotalPlayerCount();
        Float totalCredit = teamCriteria.getTotalCredits();

        Assert.isTrue(playerList.size() == totalCount , "Team Player count is not valid, please submit again");
        Double teamValue = playerList.stream().mapToDouble(player -> player.getValue()).sum();
        Assert.isTrue(teamValue <= totalCredit , "Team credit limit exceed, please add proper player again");

        Map<String, Long> playerByTeam = playerList.stream().collect(Collectors.groupingBy(player -> {
            if(player.getTeams().size() > 0) {
                return player.getTeams().get(0).getName();
            } else {
                return "Team Not Present";
            }
        }, Collectors.counting()));
        Optional<Map.Entry<String, Long>> maxEntry = playerByTeam.entrySet().stream().max(Comparator.comparing((e) -> e.getValue()));
        Assert.isTrue(maxEntry.get().getValue() <= maxPerTeam , "Team should not exeedd more player for single team");
    }

    public void validatePlayerCriteriaList(List<PlayerCriteria> playerCriteriaList, List<Player> playerList) {
        Map<String, Long> playerByType = playerList.stream().collect(Collectors.groupingBy(player -> player.getType().toString(), Collectors.counting()));
        playerCriteriaList.stream().forEach(playerCriteria -> validatePlayerCriteriaForTeam(playerCriteria, playerByType));
    }

    public void validatePlayerCriteriaForTeam(PlayerCriteria playerCriteria,  Map<String, Long> playerByType) {
        Integer maxPerTeam = playerCriteria.getMaxPerTeam();
        Integer minPerTeam = playerCriteria.getMinPerTeam();
        String type = playerCriteria.getType();
        Long playerCount = playerByType.get(type);
        Assert.isTrue(playerCount <= maxPerTeam, "Player max limit exceed for type" + type);
        Assert.isTrue(playerCount >= minPerTeam, "Player min limit exceed for type" + type);
    }
}
