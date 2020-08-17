package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.MatchPlayerScoreRepository;
import com.garv.satta.fantasy.dao.repository.MatchRepository;
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
        MatchPlayerScore playerScore = converter.convertToFullEntity(dto);
        playerScore.setId(null);
        playerValidator.validatePlayerById(dto.getPlayerId());
        matchValidator.validateMatchById(dto.getMatchId());
        playerValidator.validatePlayerScore(playerScore.getPointscore());
        repository.save(playerScore);
    }

    public List<MatchPlayerScoreDTO> getMatchScoreByPlayer(Long id) {
        List<MatchPlayerScore> matchPlayerScores = repository.findMatchPlayerScoreByPlayerId(id);
        return converter.convertToFullDTOList(matchPlayerScores);
    }

    public List<MatchPlayerScoreDTO> findMatchPlayerScoreByMatchId(Long id) {
        List<MatchPlayerScore> matchPlayerScores = repository.findMatchPlayerScoreByMatchId(id);
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

            MatchPlayerScore matchPlayerScore = new MatchPlayerScore();
            matchPlayerScore.setRun_scored(runs);
            matchPlayerScore.setWicket(wicket);
            matchPlayerScore.setCatches(catches);
            matchPlayerScore.setPointscore(points);
            Player player = playerRepository.findPlayerByName(name);
            matchPlayerScore.setPlayer(player);
            matchPlayerScore.setMatch(new Match(matchId));
            matchPlayerScores.add(matchPlayerScore);

        }

        repository.saveAll(matchPlayerScores);
    }

}
