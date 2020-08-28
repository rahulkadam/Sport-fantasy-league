package com.garv.satta.fantasy.external.service;

import com.garv.satta.fantasy.dao.repository.MatchPlayerScoreRepository;
import com.garv.satta.fantasy.dao.repository.MatchRepository;
import com.garv.satta.fantasy.dao.repository.PlayerRepository;
import com.garv.satta.fantasy.external.DTO.MatchPlayerScoreCricDTO;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.backoffice.MatchPlayerScore;
import com.garv.satta.fantasy.model.backoffice.Player;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;

@Service
public class CricMatchPlayerScoreService {

    @Autowired
    private MatchPlayerScoreRepository repository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private CricAPIService cricAPIService;

    public void updateMatchScoreFromCricAPI(Long matchId) {

        Match match = matchRepository.findMatchById(matchId);
        Assert.notNull(match, "Match Id is not Valid, " + matchId);
        Integer externalMatchId = match.getExternal_mid();
        Assert.notNull(externalMatchId, "External Id is Present for , " + matchId);

        List<MatchPlayerScore> matchPlayerScores = new ArrayList<>();
        List<MatchPlayerScoreCricDTO> playerScoreDTOList = cricAPIService.getMatchSummaryDetails(externalMatchId);

        if (CollectionUtils.isEmpty(playerScoreDTOList)) {
            return;
        }

        playerScoreDTOList.stream().forEach(playerScore -> {
            Player player = playerRepository.findPlayerByNameOrExternalpid(playerScore.getName(), playerScore.getPid());
            if (player == null) {
                return;
            }
            if (player.getExternalpid() == null) {
                player.setExternalpid(playerScore.getPid());
                playerRepository.save(player);
            }
            Long playerId = player.getId();
            MatchPlayerScore matchPlayerScore = repository.findPlayerScoreByMatchIdAndPlayerId(matchId, playerId);
            if (matchPlayerScore == null) {
                matchPlayerScore = new MatchPlayerScore(player, match);
            }
            matchPlayerScore = copyPlayerScoresDataFromCricDTO(matchPlayerScore, playerScore);
            matchPlayerScores.add(matchPlayerScore);
        });
        repository.saveAll(matchPlayerScores);
    }


    /**
     * Copying fro DTO to entity for storing to DB
     * @param scoreEntity
     * @param dto
     * @return
     */
    public MatchPlayerScore copyPlayerScoresDataFromCricDTO(MatchPlayerScore scoreEntity, MatchPlayerScoreCricDTO dto) {
        scoreEntity.setRun_scored(dto.getRuns_scored());
        scoreEntity.setWicket(dto.getWicket());
        scoreEntity.setCatches(dto.getCatches());
        scoreEntity.setPointscore(dto.getPointscore());
        scoreEntity.setBalls(dto.getBalls());
        scoreEntity.setRunout(dto.getRunout());
        scoreEntity.setDot_balls(dto.getDot_balls());
        scoreEntity.setEconomy(dto.getEconomy());
        scoreEntity.setFours(dto.getFours());
        scoreEntity.setStumped(dto.getStumped());
        scoreEntity.setSixes(dto.getSixes());
        scoreEntity.setStrikeRate(dto.getStrikeRate());
        scoreEntity.setRuns_concede(dto.getRuns_concede());
        scoreEntity.setMaiden(dto.getMaiden());

        Object overs = dto.getOvers();
        if (overs instanceof Float) {
            scoreEntity.setOvers((Float)dto.getOvers());
        }
        return scoreEntity;
    }


}
