package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.PlayerRepository;
import com.garv.satta.fantasy.dao.repository.TeamRepository;
import com.garv.satta.fantasy.dto.PlayerDTO;
import com.garv.satta.fantasy.dto.RequestDTO;
import com.garv.satta.fantasy.dto.converter.PlayerConverter;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.fantasyenum.OperationEnum;
import com.garv.satta.fantasy.fantasyenum.PlayerEnum;
import com.garv.satta.fantasy.model.backoffice.Player;
import com.garv.satta.fantasy.model.backoffice.Team;
import com.garv.satta.fantasy.service.admin.CacheService;
import com.garv.satta.fantasy.service.admin.FantasyConfigService;
import com.garv.satta.fantasy.validation.PlayerValidator;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private PlayerConverter playerConverter;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private PlayerValidator validator;

    @Autowired
    private ExcelFileService excelFileService;

    @Autowired
    private UserTeamService userTeamService;

    @Autowired
    private CacheService cacheService;

    @Autowired
    private FantasyConfigService fantasyConfigService;

    public final String PLAYER_CACHE_NAME = "PlayerCache";

    @Cacheable(cacheNames = PLAYER_CACHE_NAME , keyGenerator = "customKeyGenerator")
    public List<PlayerDTO> getPlayerList() {
        List<Player> playerList = playerRepository.findAllByIsDeleted(Boolean.FALSE);
        return playerConverter.convertToFullDTOList(playerList);
    }

    public List<PlayerDTO> getPlayerListByUserTeamIdForLeagueView(Long id) {
        boolean isviewAllowed = fantasyConfigService.getShowUserTeamDetailsInLeague();
        if (isviewAllowed) {
            return userTeamService.getPlayerListByUserTeamId(id);
        }
        throw new GenericException("User Team View disable, please check after match start");
    }

    public PlayerDTO getplayerbyname(String name) {
        Player player = playerRepository.findPlayerByName(name);
        return playerConverter.convertToDTO(player);
    }

    public List<PlayerDTO> getPlayerListbyids(long[] ids) {
        List<Player> player = playerRepository.findAllPlayerByIdIn(ids);
        return playerConverter.convertToFullDTOList(player);
    }


    public PlayerDTO createPlayer(PlayerDTO playerDTO) {
        Player player = playerConverter.convertToEntity(playerDTO);
        player.setId(null);
        validator.validatePlayerValue(player.getValue());
        player = playerRepository.save(player);
        clearPlayerCache();
        return playerConverter.convertToDTO(player);
    }

    public void updateExternalPlayerId(RequestDTO dto) {
        Long playerId = dto.getPlayerId();
        Integer externalId = dto.getExternalId();
        Player player = playerRepository.findPlayerById(playerId);
        Assert.notNull(player,"Player id is Not Valid" + playerId );
        Assert.notNull(externalId, "External Match id is not valid");
        player.setExternalpid(externalId);
        playerRepository.save(player);
        clearPlayerCache();
    }

    public void addTeamToPlayer(Long playerId, Long teamId) {
        addRemoveTeamFromPlayer(playerId, teamId, OperationEnum.ADD);
    }

    public void removeTeamFromPlayer(Long playerId, Long teamId) {
        addRemoveTeamFromPlayer(playerId, teamId, OperationEnum.REMOVE);
    }

    public void addRemoveTeamFromPlayer(Long playerId, Long teamId, OperationEnum ops) {
        Player player = playerRepository.findPlayerById(playerId);
        Team team = teamRepository.findTeamById(teamId);

        if (team == null || player == null) {
            throw new GenericException("Team or Player is Not Valid");
        }

        if (OperationEnum.ADD.equals(ops)) {
            player.addTeam(team);
        } else {
            player.removeTeam(team);
        }
        playerRepository.save(player);
        clearPlayerCache();
    }

    public void uploadPlayerList(MultipartFile file) {
        Iterator<Row> rowList = excelFileService.readData(file);
        List<Player> playerList = new ArrayList<>();
        Map<String, Long> map = new HashMap<>();

        rowList.hasNext();  // skipping header
        while (rowList.hasNext()) {
            Row row = rowList.next();
            String name = row.getCell(0).getStringCellValue();
            String country = row.getCell(1).getStringCellValue();
            String type = row.getCell(2).getStringCellValue();
            double value = row.getCell(3).getNumericCellValue();
            String team_name = row.getCell(4).getStringCellValue();

            Player player = new Player();
            player.setValue((float) value);
            player.setCountry(country);
            player.setName(name);
            player.setType(PlayerEnum.valueOf(type));

            Long teamId = map.get(team_name);
            if (teamId == null) {
                Team hometeam = teamRepository.findTeamByName(team_name);
                teamId = hometeam.getId();
                map.put(team_name, teamId);
            }
            player.addTeam(new Team(teamId));

            playerList.add(player);
        }
        playerRepository.saveAll(playerList);
        clearPlayerCache();
    }


    public List<PlayerDTO> getTopPickedPlayer() {
        List<Player> playerList = playerRepository.findAll();
        return playerConverter.convertToFullDTOList(playerList);
    }

    public void clearPlayerCache() {
        cacheService.evictAllCacheValues(PLAYER_CACHE_NAME);
    }
}
