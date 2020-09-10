package com.garv.satta.fantasy.schedular;

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
import org.apache.commons.collections4.CollectionUtils;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.List;

@Configuration
@EnableScheduling
public class FantasyTaskSchedular {

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
    private TaskSchedularRepository repository;

    private final String TASK_NAME="CRIC_API_TASK";

    private final String MATCH_AUTO_INIT_TASK="MATCH_AUTO_INIT_TASK";

    @Scheduled(fixedRate = 2000*60)
    public void schedule1MinSchedularFixedRateTask() {
        TaskSchedular taskSchedular = repository.findTaskByName(MATCH_AUTO_INIT_TASK);
        if (taskSchedular == null) {
            repository.save(new TaskSchedular(MATCH_AUTO_INIT_TASK));
            return;
        }
        Boolean taskStatus = taskSchedular.getIsActive();
        if (taskStatus == null || !taskStatus) {
            return;
        }

        List<TournamentDTO> tournamentList = tournamentService.getTournamentShortList();
        // if tournament is locked, then no need to run this
        Boolean tournamentStatus = tournamentList.get(0).getStatus();
            List<Match> matchList = matchService.getUpComingTOP2MatchList();
            matchList.forEach(match -> {
                executeInitiateMatchSquadForNextMatch(match, tournamentStatus);
            });
    }

    public void executeInitiateMatchSquadForNextMatch(Match match, Boolean tournamentStatus) {
        DateTime matchTime = match.getMatchTime();
        if (tournamentStatus == true) {
            DateTime current25MinTime = DateTime.now();
            current25MinTime = current25MinTime.plusMinutes(25);
            if (matchTime.getMillis() < current25MinTime.getMillis() && match.getState() == null) {
                match.setState(MatchStateEnum.TOSS_COMPLETED);
                match.setStatus(Boolean.TRUE);
                matchService.saveMatch(match);
                updateScoreForMatch(match);
            } else {
                Long hrsDiff = (matchTime.getMillis() - current25MinTime.getMillis()) / (1000 * 60 * 60);
                System.out.println("Match is not avaialble , will start in Hours " + hrsDiff);
            }

            DateTime current10MinTime = DateTime.now();
            current10MinTime = current10MinTime.plusMinutes(10);
            if (matchTime.getMillis() < current10MinTime.getMillis()) {
                tournamentService.lockTournamentByName("IPL-20");
                // calculatePointsService.initUserScoreForMatch(match);
            }
        }

        DateTime current2MinTime = DateTime.now();
        current2MinTime = current2MinTime.plusMinutes(2);
        if (matchTime.getMillis() < current2MinTime.getMillis() && match.getState() == MatchStateEnum.TOSS_COMPLETED) {
            match.setState(MatchStateEnum.IN_PROGRESS);
            match.setStatus(Boolean.TRUE);
            matchService.saveMatch(match);
        }
    }



    // 5000*60
    @Scheduled(fixedRateString = "${fixedDelay.in.milliseconds}")
    public void scheduleFixedRateTask() {
        executeMatchDayTaskScheduler();
    }

    public void executeMatchDayTaskScheduler() {
        try {
            TaskSchedular taskSchedular = repository.findTaskByName(TASK_NAME);
            if (taskSchedular == null) {
                repository.save(new TaskSchedular(TASK_NAME));
                return;
            }

            Boolean taskStatus = taskSchedular.getIsActive();
            if (taskStatus == null || !taskStatus) {
                return;
            }
            executeInitiateMatchSquadForNextMatch();
            executeLiveMatchScoreTaskScheduler();
        } catch (Exception e) {
            fantasyErrorService.logMessage("SCHEDULE_ERROR", e.getMessage());
        }
    }

    public void executeInitiateMatchSquadForNextMatch() {
        List<TournamentDTO> tournamentList = tournamentService.getTournamentShortList();
        Boolean tournamentStatus = tournamentList.get(0).getStatus();
        List<Match> matchList = matchService.getUpComingTOP2MatchList();
        matchList.forEach(match -> {
            executeInitiateMatchSquadForNextMatch(match, tournamentStatus);
        });
    }

    /**
     * Once match started, keep updating score / mark match as live
     */
    public void executeLiveMatchScoreTaskScheduler() {
        try {
            List<Match> liveMatchList = matchService.getLiveMatchesForSchedular();
            if (CollectionUtils.isEmpty(liveMatchList)) {
                return;
            }
            liveMatchList.stream().forEach(match -> {
                updateScoreForMatch(match);
            });
        } catch (Exception e) {
            fantasyErrorService.logMessage("SCHEDULE_ERROR", e.getMessage());
        }
    }

    public void updateScoreForMatch(Match match) {
        try {
            MatchStateEnum state = match.getState();
            if (state == MatchStateEnum.IN_PROGRESS || state == MatchStateEnum.TOSS_COMPLETED) {
                cricMatchPlayerScoreService.updateMatchScoreFromCricAPI(match);
            }
        } catch (Exception e) {
            fantasyErrorService.logMessage("SCHEDULE_ERROR", match.getId() + " " + e.getMessage());
        }
    }
}
