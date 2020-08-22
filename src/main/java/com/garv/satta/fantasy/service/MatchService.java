package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.MatchRepository;
import com.garv.satta.fantasy.dto.MatchDTO;
import com.garv.satta.fantasy.dto.TeamDTO;
import com.garv.satta.fantasy.dto.TournamentDTO;
import com.garv.satta.fantasy.dto.VenueDTO;
import com.garv.satta.fantasy.dto.converter.MatchConverter;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.backoffice.Team;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import com.garv.satta.fantasy.model.backoffice.Venue;
import com.garv.satta.fantasy.validation.TeamValidator;
import com.garv.satta.fantasy.validation.TournamentValidator;
import org.apache.poi.ss.usermodel.Row;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    public List<MatchDTO> getMatchList() {
        List<Match> matches = repository.findAll();
        return converter.convertToFullDTOList(matches);
    }

    public List<MatchDTO> getUpComingMatchList() {
        DateTime currentTime = new DateTime();
        List<Match> matches = repository.findUpcomingMatches(currentTime);
        return converter.convertToFullDTOList(matches);
    }

    public List<MatchDTO> getCompletedMatchList() {
        DateTime currentTime = new DateTime();
        List<Match> matches = repository.findCompletedMatches(currentTime);
        return converter.convertToFullDTOList(matches);
    }



    public MatchDTO getMatchById(Long id) {
        Match match = repository.findMatchById(id);
        return converter.convertToFullDTO(match);
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
        return converter.convertToFullDTO(match);
    }

    public void uploadTeamList(MultipartFile file) {
        Iterator<Row> rowList = excelFileService.readData(file);
        Map<String, Long> map = new HashMap<>();
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
            }
            match.setTeam_host(new Team(homeTeamId));

            Long awayTeamId = map.get(away_team_name);
            if (awayTeamId == null) {
                TeamDTO awayteam = teamService.getTeamByName(away_team_name);
                awayTeamId = awayteam.getId();
                map.put(away_team_name, awayTeamId);
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

            match.setDescription(home_team_name + " VS " + away_team_name + " On " + dateTime.getDayOfMonth() + "-" + dateTime.getMonthOfYear());
            matchList.add(match);
        }
        repository.saveAll(matchList);
    }
}
