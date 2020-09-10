package com.garv.satta.fantasy.schedular.service;

import com.garv.satta.fantasy.dao.repository.TaskSchedularRepository;
import com.garv.satta.fantasy.dto.TournamentDTO;
import com.garv.satta.fantasy.external.service.CricMatchPlayerScoreService;
import com.garv.satta.fantasy.fantasyenum.MatchStateEnum;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.monitoring.TaskSchedular;
import com.garv.satta.fantasy.service.CalculatePointsService;
import com.garv.satta.fantasy.service.FantasyErrorService;
import com.garv.satta.fantasy.service.MatchService;
import com.garv.satta.fantasy.service.TournamentService;
import com.garv.satta.fantasy.service.admin.CacheService;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class InitMatchSchedularTaskService {

    @Autowired
    private MatchService matchService;

    @Autowired
    private CacheService cacheService;

    @Autowired
    private CalculatePointsService calculatePointsService;

    @Autowired
    private TournamentService tournamentService;

    @Autowired
    private CricMatchPlayerScoreService cricMatchPlayerScoreService;

    @Autowired
    private FantasyErrorService fantasyErrorService;

    @Autowired
    private UpdateScoreSchedularTaskService updateScoreSchedularTaskService;

    @Autowired
    private TaskSchedularRepository repository;

    private final String MATCH_AUTO_INIT_TASK = "MATCH_AUTO_INIT_TASK";


    /**
     * Initiate Match Task, as the start of match
     * 1. Mark match live
     * 2. get team and toss details
     * 3. lock tournament
     * 4. mark match in progress at time
     * TODO pending or manual task : 1. unlock tournament 2. Init user Score
     */
    public void executeInitiateMatchSquadForNextMatch() {
        try {
            boolean isTaskEnable = isTaskEnable(MATCH_AUTO_INIT_TASK);
            if (!isTaskEnable) {
                return;
            }
            List<TournamentDTO> tournamentList = tournamentService.getTournamentShortList();
            Boolean tournamentStatus = tournamentList.get(0).getStatus();
            List<Match> matchList = matchService.getUpComingTOP2MatchList();
            matchList.forEach(match -> {
                executeInitiateMatchSquadForNextMatch(match, tournamentStatus);
            });
        } catch (Exception e) {
            fantasyErrorService.logMessage("Execute Init Match SCHEDULE_ERROR", e.getMessage());
        }
    }

    public void executeInitiateMatchSquadForNextMatch(Match match, Boolean tournamentStatus) {
        if (tournamentStatus == true) {
            initMatchBefore25Min(match);
            lockTournamentBefore10Min(match);
        }
        startMatchAtMatchTime(match);
    }

    /**
     * Mark match as live and mark state as Toss Completed
     * @param match
     */
    public void initMatchBefore25Min(Match match) {
        DateTime matchTime = match.getMatchTime();
        DateTime plus25MinTime = getTimePlusMinuite(25);
        if (matchTime.getMillis() < plus25MinTime.getMillis() && match.getState() == null) {
            match.setState(MatchStateEnum.TOSS_COMPLETED);
            match.setStatus(Boolean.TRUE);
            matchService.saveMatch(match);
            updateScoreSchedularTaskService.updateScoreForMatch(match);
        } else {
            Long hrsDiff = (matchTime.getMillis() - plus25MinTime.getMillis()) / (1000 * 60 * 60);
            System.out.println("Match is not avaialble , will start in Hours " + hrsDiff);
        }
    }

    /**
     * Lock tournament 10 min before match, unlock and init user score will be manuall task
     * @param match
     */
    public void lockTournamentBefore10Min(Match match) {
        DateTime matchTime = match.getMatchTime();
        DateTime plus10MinTime = getTimePlusMinuite(10);
        if (matchTime.getMillis() < plus10MinTime.getMillis()) {
            tournamentService.lockTournamentByName("IPL-20");
            calculatePointsService.initUserScoreForMatch(match);
        }
    }


    /**
     * Start match at the time, mark inProgress
     * @param match
     */
    public void startMatchAtMatchTime(Match match) {
        DateTime matchTime = match.getMatchTime();
        DateTime plus2MinTime = getTimePlusMinuite(2);
        if (matchTime.getMillis() < plus2MinTime.getMillis() && match.getState() == MatchStateEnum.TOSS_COMPLETED) {
            match.setState(MatchStateEnum.IN_PROGRESS);
            match.setStatus(Boolean.TRUE);
            matchService.saveMatch(match);
        }
    }

    public boolean isTaskEnable(String taskName) {
        TaskSchedular taskSchedular = repository.findTaskByName(taskName);
        if (taskSchedular == null) {
            repository.save(new TaskSchedular(taskName));
            return false;
        }
        Boolean taskStatus = taskSchedular.getIsActive();
        if (taskStatus == null || !taskStatus) {
            return false;
        }
        return true;
    }

    public DateTime getTimePlusMinuite(int minuite) {
        DateTime dateTime = DateTime.now();
        dateTime = dateTime.plusMinutes(minuite);
        return dateTime;
    }
}
