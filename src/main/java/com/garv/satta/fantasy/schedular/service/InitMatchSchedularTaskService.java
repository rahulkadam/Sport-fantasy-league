package com.garv.satta.fantasy.schedular.service;

import com.garv.satta.fantasy.dao.repository.TaskSchedularRepository;
import com.garv.satta.fantasy.external.service.CricMatchPlayerScoreService;
import com.garv.satta.fantasy.fantasyenum.MatchStateEnum;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.backoffice.Tournament;
import com.garv.satta.fantasy.model.monitoring.TaskSchedular;
import com.garv.satta.fantasy.service.CalculatePointsService;
import com.garv.satta.fantasy.service.FantasyErrorService;
import com.garv.satta.fantasy.service.MatchService;
import com.garv.satta.fantasy.service.TournamentService;
import com.garv.satta.fantasy.service.admin.CacheService;
import com.garv.satta.fantasy.service.admin.FantasyConfigService;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
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
    private FantasyConfigService fantasyConfigService;

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
     * 5. unlock Tournament
     * 6. Init USer Score
     * TODO pending or manual task : 1. unlock tournament 2. Init user Score
     */
    public void executeInitiateMatchSquadForNextMatch() {
        try {
            boolean isTaskEnable = isTaskEnable(MATCH_AUTO_INIT_TASK);
            if (!isTaskEnable) {
                return;
            }
            List<Tournament> tournamentList = tournamentService.getTournamentShortList();
            Tournament tournament = tournamentList.get(0);
            List<Match> matchList = matchService.getUpComingTOP2MatchList();
            matchList.forEach(match -> {
                executeInitiateMatchSquadForNextMatch(match, tournament);
            });
            unLockTournamentAfter30Min(tournament);
        } catch (Exception e) {
            fantasyErrorService.logMessage("Execute Init Match SCHEDULE_ERROR", e.getMessage());
        }
    }

    public void executeInitiateMatchSquadForNextMatch(Match match, Tournament tournament) {
        if (tournament.getStatus() == true) {
            initMatchBefore25Min(match);
            lockTournamentBefore10Min(match);
        }
        startMatchAtMatchTime(match);
    }

    /**
     * UnLock Tournament , if tournament is locked due to match start
     * Unlock after 30 min of Match Start
     * @param tournament
     */
    public void unLockTournamentAfter30Min(Tournament tournament) {
        try {
            if (tournament.getStatus() == false) {
                Match match = matchService.getJustStartedMatchList();
                DateTime dateTime = DateTime.now();
                DateTime matchTime = match.getMatchTime().plusMinutes(25);
                if (matchTime.getMillis() < dateTime.getMillis()) {
                    tournamentService.unLockTournament(tournament);
                }
            }
        } catch (Exception e) {
            fantasyErrorService.logMessage("Unlock after 30 min error",  e.getMessage());
        }
    }

    /**
     * Mark match as live and mark state as Toss Completed
     * @param match
     */
    public void initMatchBefore25Min(Match match) {
        try {
            DateTime matchTime = match.getMatchTime();
            DateTime plus25MinTime = getTimePlusMinuite(25);
            if (matchTime.getMillis() < plus25MinTime.getMillis() && match.getState() == null) {
                match.setState(MatchStateEnum.TOSS_COMPLETED);
                match.setStatus(Boolean.TRUE);
                matchService.saveMatch(match);
                updateScoreSchedularTaskService.updateScoreForMatch(match);
            }
        } catch (Exception e) {
            log.error("Init before 25 min error:" + e.getMessage(), e);
            fantasyErrorService.logMessage("Init before 25 min error", match.getId() + " : " + e.getMessage());
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
            // after tournament lock, init user for Same Match
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
            fantasyConfigService.enableOtherUserTeamViewInLeague();
        }
    }

    @Cacheable(cacheNames = "FantasyCache" , keyGenerator = "customKeyGenerator")
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

    public DateTime getTimeMinusMinutes(int minuite) {
        DateTime dateTime = DateTime.now();
        dateTime = dateTime.minusMinutes(minuite);
        return dateTime;
    }
}
