package com.garv.satta.fantasy.external.service.cricinfo.parser;

import com.garv.satta.fantasy.external.DTO.MatchPlayerScoreCricDTO;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@Slf4j
public class PlayerParser {

    public MatchPlayerScoreCricDTO parsePlayer(Element node) {
        try {
            MatchPlayerScoreCricDTO player = new MatchPlayerScoreCricDTO();
            player.setPid(getPlayerId(node));
            player.setName(getPlayerName(node));
            String shortName = getShortName(node.text()).trim();
            player.setShortName(shortName);
            if (StringUtils.isEmpty(player.getName())) {
                player.setName(shortName);
            }
            return player;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return null;
        }
    }

    private Integer getPlayerId(Element node) {
        String link = node.select("a").attr("href");
        if (StringUtils.isEmpty(link)) {
            return null;
        }
        int length = "https://www.espncricinfo.com/ci/content/player/".length();
        String[] linkSplit =  link.split("-");
        String playerId = linkSplit[linkSplit.length-1];
        Integer playerIdInt = Integer.parseInt(playerId);
        return playerIdInt;
    }

    private String getPlayerName(Element node) {
        String LinkTitle = node.select("a").attr("title");
        if (StringUtils.isEmpty(LinkTitle)) {
            return "";
        }
        int length2 = "View full profile of ".length();
        String playerName = LinkTitle.substring(length2);
        return playerName;
    }

    private String getShortName(String name) {
        name = name.trim();
        Boolean isCaptain = name.contains("(");
        boolean isWK = name.contains("†");

        if (isCaptain && isWK) {
            int toIndex = name.indexOf("(");
            name = name.substring(0, toIndex).trim();
            toIndex = name.indexOf("†");
            if (toIndex > 0) {
                name = name.substring(0, toIndex).trim();
            }
            return name;
        }

        if (isCaptain) {
            int toIndex = name.indexOf("(");
            name = name.substring(0, toIndex).trim();
            return name;
        }
        if (isWK) {
            int toIndex = name.indexOf("†");
            name = name.substring(0, toIndex).trim();
            return name;
        }
        if (name.indexOf(",") > 0) {
            name = name.substring(0, name.indexOf(","));
        }
        return name;
    }
}
