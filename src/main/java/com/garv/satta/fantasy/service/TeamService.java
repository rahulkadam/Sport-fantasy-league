package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.TeamRepository;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.dto.TeamDTO;
import com.garv.satta.fantasy.dto.converter.TeamConverter;
import com.garv.satta.fantasy.model.backoffice.Team;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import com.garv.satta.fantasy.validation.TeamValidator;
import com.garv.satta.fantasy.validation.TournamentValidator;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    TeamConverter converter;

    @Autowired
    private TeamValidator teamValidator;

    @Autowired
    TournamentValidator tournamentValidator;

    @Autowired
    TournamentService tournamentService;

    @Autowired
    private ExcelFileService excelFileService;

    public List<TeamDTO> getTeams() {
        List<Team> teamList = (List) teamRepository.findAll();
        return converter.convertToFullDTOList(teamList);
    }

    public List<TeamDTO> getTeamsByTournamentId(Long tournamentId) {
        List<Team> teamList = teamRepository.findTeamByTournamentId(tournamentId);
        return converter.convertToDTOList(teamList);
    }

    public TeamDTO getTeamsById(Long id) {
        Team team = teamRepository.findTeamById(id);
        return converter.convertToDTO(team);
    }


    public TeamDTO CreateTeamForTournament(TeamDTO teamDTO ) {
        Team team = converter.convertToFullEntity(teamDTO);
        team.setId(null);
        team = teamRepository.save(team);
        return converter.convertToDTO(team);
    }

    public void AddTournamentToTeam(RequestDTO dto) {
        Long tournamentId = dto.getAdd();
        Long teamId = dto.getAddTo();
        tournamentValidator.validateTournamentById(tournamentId);
        teamValidator.validateTeamById(teamId);
        Team team = teamRepository.findTeamById(teamId);
        Tournament tournament = new Tournament(tournamentId);
        team.addTournament(tournament);
        teamRepository.save(team);
    }

    public void uploadTeamList(MultipartFile file) {
        Iterator<Row> rowList = excelFileService.readData(file);
        List<Team> teams = new ArrayList<>();

        while (rowList.hasNext()) {
            Row row = rowList.next();
            String name = row.getCell(0).getStringCellValue();
            String owner = row.getCell(1).getStringCellValue();
            String country = row.getCell(2).getStringCellValue();
            String shortName = row.getCell(3).getStringCellValue();
            Team team = new Team();
            team.setCountry(country);
            team.setName(name);
            team.setShortName(shortName);
            team.setOwner(owner);
            teams.add(team);
        }
        teamRepository.saveAll(teams);
    }
}
