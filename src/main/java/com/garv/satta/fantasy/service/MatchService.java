package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.MatchRepository;
import com.garv.satta.fantasy.dto.*;
import com.garv.satta.fantasy.dto.converter.MatchConverter;
import com.garv.satta.fantasy.fantasyenum.MatchStateEnum;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.backoffice.Team;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import com.garv.satta.fantasy.model.backoffice.Venue;
import com.garv.satta.fantasy.service.admin.CacheService;
import com.garv.satta.fantasy.validation.TeamValidator;
import com.garv.satta.fantasy.validation.TournamentValidator;
import org.apache.poi.ss.usermodel.Row;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class MatchService {

    @Autowired
    private MatchRepository repository;

    @Autowired
    private MatchConverter converter;

    @Autowired
    private TeamValidator teamValidator;

    @Autowired
    private TournamentValidator tournamentValidator;

    @Autowired
    private TeamService teamService;

    @Autowired
    private VenueService venueService;

    @Autowired
    private TournamentService tournamentService;

    @Autowired
    private ExcelFileService excelFileService;

    @Autowired
    private CacheService cacheService;

    private final String MATCH_CACHE_NAME = "MatchCache";

    @Cacheable(cacheNames = MATCH_CACHE_NAME, keyGenerator = "customKeyGenerator")
    public List<MatchDTO> getMatchList() {
        List<Match> matches = repository.findAllByIsDeleted(false);
        return converter.convertToFullDTOList(matches);
    }

    @Cacheable(cacheNames = MATCH_CACHE_NAME, keyGenerator = "customKeyGenerator")
    public List<MatchDTO> getUpComingTOP5MatchList() {
        DateTime currentTime = new DateTime();
        List<Match> matches = repository.findFirst5ByMatchTimeGreaterThanEqualAndIsDeleted(currentTime, Boolean.FALSE);
        return converter.convertToFullDTOList(matches);
    }

    @Cacheable(cacheNames = MATCH_CACHE_NAME, keyGenerator = "customKeyGenerator")
    public List<MatchDTO> getUpComingAllMatchList() {
        DateTime currentTime = new DateTime();
        List<Match> matches = repository.findFirst5ByMatchTimeGreaterThanEqualAndIsDeleted(currentTime, Boolean.FALSE);
        return converter.convertToFullDTOList(matches);
    }

    @Cacheable(cacheNames = "LiveScoreCache", keyGenerator = "customKeyGenerator")
    public List<MatchDTO> getLiveMatches() {
        List<Match> matches = repository.findMatchesByStatus(Boolean.TRUE);
        return converter.convertToFullDTOList(matches);
    }

    @Cacheable(cacheNames = "LiveScoreCache", keyGenerator = "customKeyGenerator")
    public List<MatchDTO> getLiveMatchesShortDto() {
        List<Match> matches = repository.findMatchesByStatus(Boolean.TRUE);
        return converter.convertToDTOList(matches);
    }

    public MatchDTO getMatchStartingInNext1Hour() {
        DateTime currentTime = new DateTime();
        Match match = repository.findFirstByMatchTimeGreaterThanEqualAndIsDeleted(currentTime, false);
        return converter.convertToDTO(match);
    }

    @Cacheable(cacheNames = MATCH_CACHE_NAME, keyGenerator = "customKeyGenerator")
    public List<MatchDTO> getCompletedMatchList() {
        DateTime currentTime = new DateTime();
        List<Match> matches = repository.findCompletedMatchesByMatchTimeLessThanEqualAndIsDeleted(currentTime, false);
        return converter.convertToFullDTOList(matches);
    }


    public MatchDTO getMatchById(Long id) {
        Match match = repository.findMatchById(id);
        return converter.convertToFullDTO(match);
    }

    public void startMatch(Long matchId) {
        changeMatchStatus(matchId, Boolean.TRUE, MatchStateEnum.IN_PROGRESS);
    }

    public void completeMatch(Long matchId) {
        changeMatchStatus(matchId, Boolean.FALSE, MatchStateEnum.COMPLETED);
    }

    public void changeMatchStatus(Long matchId, Boolean status, MatchStateEnum matchState) {
        Match match = repository.findMatchById(matchId);
        Assert.notNull(match,"Match id is not valid" + matchId );
        match.setIsActive(status);
        match.setStatus(status);
        match.setState(matchState);
        repository.save(match);
        clearMatchCache();
    }

    public void updateExternalMatchId(RequestDTO dto) {
        Long matchId = dto.getMatchId();
        Integer externalId = dto.getExternalId();
        Match match = repository.findMatchById(matchId);
        Assert.notNull(match,"Match id is Not Valid" + matchId );
        Assert.notNull(externalId, "External Match id is not valid");
        match.setExternal_mid(externalId);
        repository.save(match);
        clearMatchCache();
    }

    public MatchDTO createMatch(MatchDTO matchDTO) {
        Match match = converter.convertToFullEntity(matchDTO);
        match.setId(null);
        Long hostTeamId = matchDTO.getTeam_host_id();
        Long awayTeamId = matchDTO.getTeam_away_id();
        Long tournamentId = matchDTO.getTournament_id();

        teamValidator.validateTeamById(hostTeamId);
        teamValidator.validateTeamById(awayTeamId);
        tournamentValidator.validateTournamentById(tournamentId);

        List<Long> teamIdList = new ArrayList<>(Arrays.asList(awayTeamId, hostTeamId));
        tournamentValidator.validateTeamsInTournament(matchDTO.getTournament_id(), teamIdList);

        match = repository.save(match);
        clearMatchCache();
        return converter.convertToFullDTO(match);
    }

    public void uploadTeamList(MultipartFile file) {
        Iterator<Row> rowList = excelFileService.readData(file);
        Map<String, Long> map = new HashMap<>();
        Map<String, String> mapWithShortName = new HashMap<>();
        List<Match> matchList = new ArrayList<>();

        rowList.next();  // Skipping title of excel header
        while (rowList.hasNext()) {
            Row row = rowList.next();
            String home_team_name = row.getCell(0).getStringCellValue();
            String away_team_name = row.getCell( 1).getStringCellValue();
            String tournament = row.getCell( 2).getStringCellValue();
            String venue = row.getCell(3).getStringCellValue();
            String matchTime = row.getCell(4).getStringCellValue();

            Match match = new Match();
            Long homeTeamId = map.get(home_team_name);
            if (homeTeamId == null) {
                TeamDTO hometeam = teamService.getTeamByName(home_team_name);
                homeTeamId = hometeam.getId();
                map.put(home_team_name, homeTeamId);
                mapWithShortName.put(home_team_name, hometeam.getShortName());
            }
            match.setTeam_host(new Team(homeTeamId));

            Long awayTeamId = map.get(away_team_name);
            if (awayTeamId == null) {
                TeamDTO awayteam = teamService.getTeamByName(away_team_name);
                awayTeamId = awayteam.getId();
                map.put(away_team_name, awayTeamId);
                mapWithShortName.put(away_team_name, awayteam.getShortName());
            }

            match.setTeam_away(new Team(awayTeamId));

            Long tournamentId = map.get(tournament);
            if (tournamentId == null) {
                TournamentDTO tournamentDTO = tournamentService.getTournamentByName(tournament);
                tournamentId = tournamentDTO.getId();
                map.put(tournament, tournamentId);
            }
            match.setTournament(new Tournament(tournamentId));

            Long venueId = map.get(venue);
            if (venueId == null) {
                VenueDTO venueDTO = venueService.getVenueByName(venue);
                venueId = venueDTO.getId();
                map.put(venue, venueId);
            }
            match.setVenue(new Venue(venueId));

            DateTime dateTime = DateTime.parse(matchTime);
            match.setMatchTime(dateTime);

            String shortHomeName = mapWithShortName.get(home_team_name)!= null ? mapWithShortName.get(home_team_name) : home_team_name;
            String shortAwayName = mapWithShortName.get(away_team_name)!= null ? mapWithShortName.get(away_team_name) : away_team_name;

            match.setDescription(shortHomeName + " VS " + shortAwayName + " -- " + dateTime.getDayOfMonth() + "-" + dateTime.getMonthOfYear());
            matchList.add(match);
        }
        repository.saveAll(matchList);
    }

    public void clearMatchCache() {
        cacheService.evictAllCacheValues(MATCH_CACHE_NAME);
    }
}
