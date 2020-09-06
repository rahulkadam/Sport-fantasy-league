package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.MatchPlayerScoreRepository;
import com.garv.satta.fantasy.dao.repository.PlayerRepository;
import com.garv.satta.fantasy.dto.MatchPlayerScoreDTO;
import com.garv.satta.fantasy.dto.converter.MatchPlayerScoreConverter;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.backoffice.MatchPlayerScore;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.validation.MatchResultValidator;
import com.garv.satta.fantasy.validation.MatchValidator;
import com.garv.satta.fantasy.validation.PlayerValidator;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class MatchPlayerScoreService {

    @Autowired
    private MatchPlayerScoreRepository repository;

    @Autowired
    private MatchPlayerScoreConverter converter;

    @Autowired
    private PlayerValidator playerValidator;

    @Autowired
    private PlayerService playerService;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private MatchResultValidator matchResultValidator;

    @Autowired
    private MatchValidator matchValidator;

    @Autowired
    private ExcelFileService excelFileService;

    public void uploadPlayerScoreforMatch(@RequestBody MatchPlayerScoreDTO dto) {
        MatchPlayerScore playerScore = repository.findPlayerScoreByMatchIdAndPlayerId(dto.getMatchId(), dto.getPlayerId());

        if (playerScore == null) {
            playerScore = converter.convertToFullEntity(dto);
            playerScore.setId(null);
        } else {
            playerScore = converter.updateEntity(playerScore, dto);
        }
        playerValidator.validatePlayerById(dto.getPlayerId());
        matchValidator.validateMatchById(dto.getMatchId());
        playerValidator.validatePlayerScore(playerScore.getPointscore());
        repository.save(playerScore);
    }

    /**
     * Initalizing and storing player score with 0 at the start of match
     * @param matchId
     * @param tournamentId
     * @param playerIds
     */
    public void saveInitPlayerScoreForMatch(Long matchId, Long tournamentId, Set<Long> playerIds) {
        List<MatchPlayerScore> matchPlayerScoreList = new ArrayList<>();
        playerIds.forEach(playerId -> {
            MatchPlayerScore playerScore = converter.initEntity(matchId, tournamentId, playerId);
            matchPlayerScoreList.add(playerScore);
        });
        repository.saveAll(matchPlayerScoreList);
    }

    public List<MatchPlayerScoreDTO> getMatchScoreByPlayer(Long id) {
        List<MatchPlayerScore> matchPlayerScores = repository.findMatchPlayerScoreByPlayerId(id);
        return converter.convertToFullDTOList(matchPlayerScores);
    }

    public List<MatchPlayerScoreDTO> getMatchScoreByPlayerIds(Long matchId, long[] playerIds) {
        List<MatchPlayerScore> matchPlayerScores = repository.findMatchPlayerScoreByMatchIdAndPlayerIdIn(matchId, playerIds);
        return converter.convertToFullDTOList(matchPlayerScores);
    }

    /**
     * Check if Match is Already initialize or Not
     * @param matchId
     * @return
     */
    public Boolean isMatchAlreadyInitialize(Long matchId) {
        MatchPlayerScore matchPlayerScore = repository.findFirstByMatchId(matchId);

        if (matchPlayerScore == null){
            return false;
        }
        return true;
    }

    public List<MatchPlayerScoreDTO> findMatchPlayerScoreByMatchId(Long id) {
        List<MatchPlayerScore> matchPlayerScores = repository.findMatchPlayerScoreByMatchId(id);
        return converter.convertToFullDTOList(matchPlayerScores);
    }

    @Cacheable(cacheNames = "LiveScoreCache", keyGenerator = "customKeyGenerator")
    public List<MatchPlayerScoreDTO> findMatchPlayerScoreByMatchIdIn(long[] ids) {
        List<MatchPlayerScore> matchPlayerScores = repository.findMatchPlayerScoreByMatchIdIn(ids);
        return converter.convertToFullDTOList(matchPlayerScores);
    }

    public List<MatchPlayerScoreDTO> getTopPerformerPlayer() {
        List<MatchPlayerScore> matchPlayerScores = repository.findAll();
        return converter.convertToFullDTOList(matchPlayerScores);
    }

    public void uploadMatchPlayeScoreList(MultipartFile file) {
        Iterator<Row> rowList = excelFileService.readData(file);
        List<MatchPlayerScore> matchPlayerScores = new ArrayList<>();

        rowList.next();  // skipping title
        while (rowList.hasNext()) {
            Row row = rowList.next();
            String name = row.getCell(0).getStringCellValue();
            int runs = (int) row.getCell(3).getNumericCellValue();
            int catches = (int) row.getCell(3).getNumericCellValue();
            int wicket = (int) row.getCell(3).getNumericCellValue();
            int points = (int) row.getCell(3).getNumericCellValue();
            Long matchId = (long) row.getCell(3).getNumericCellValue();

            Player player = playerRepository.findPlayerByName(name);
            Long playerId = player.getId();
            MatchPlayerScore matchPlayerScore = repository.findPlayerScoreByMatchIdAndPlayerId(matchId, playerId);
            if (matchPlayerScore == null) {
                Match match = new Match(matchId);
                matchPlayerScore = new MatchPlayerScore(player, match);
            }
            matchPlayerScore.setRun_scored(runs);
            matchPlayerScore.setWicket(wicket);
            matchPlayerScore.setCatches(catches);
            matchPlayerScore.setPointscore(points);
            matchPlayerScores.add(matchPlayerScore);

        }

        repository.saveAll(matchPlayerScores);
    }

}
