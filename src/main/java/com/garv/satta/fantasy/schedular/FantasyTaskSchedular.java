package com.garv.satta.fantasy.schedular;

import com.garv.satta.fantasy.dao.repository.TaskSchedularRepository;
import com.garv.satta.fantasy.dto.MatchDTO;
import com.garv.satta.fantasy.external.service.CricMatchPlayerScoreService;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.monitoring.TaskSchedular;
import com.garv.satta.fantasy.service.FantasyErrorService;
import com.garv.satta.fantasy.service.MatchService;
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
    private CricMatchPlayerScoreService cricMatchPlayerScoreService;

    @Autowired
    private FantasyErrorService fantasyErrorService;

    @Autowired
    private TaskSchedularRepository repository;

    private final String TASK_NAME="CRIC_API_TASK";

    @Scheduled(fixedRate = 2000*60)
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
            // executeInitiateMatchSquadForNextMatch();
            executeLiveMatchScoreTaskScheduler();
        } catch (Exception e) {
            fantasyErrorService.logMessage("SCHEDULE_ERROR", e.getMessage());
        }
    }

    public void executeInitiateMatchSquadForNextMatch() {
        MatchDTO matchDto = matchService.getMatchStartingInNext1Hour();
        if (matchDto == null) {
            return;
        }
        DateTime matchTime = matchDto.getMatchTime();
        DateTime currentTime = DateTime.now();
        currentTime.plusMinutes(30);
        if (matchTime.getMillis() < currentTime.getMillis()) {
            cricMatchPlayerScoreService.initiateMatchPlayerSquadFromCricAPI(matchDto.getId());
        } else {
            Long hrsDiff = (matchTime.getMillis() - currentTime.getMillis())/(1000*60*60);
            System.out.println("Match is not avaialble , will start in Hours " + hrsDiff);
        }
    }

    /**
     * Once match started, keep updating score / mark match as live
     */
    public void executeLiveMatchScoreTaskScheduler() {
        try {
            List<MatchDTO> matchDTOList = matchService.getLiveMatchesShortDto();
            if (CollectionUtils.isEmpty(matchDTOList)) {
                return;
            }

            matchDTOList.stream().forEach(matchDTO -> {
                Long matchId = matchDTO.getId();
                try {
                    cricMatchPlayerScoreService.updateMatchScoreFromCricAPI(matchDTO.getId());
                } catch (Exception e) {
                    fantasyErrorService.logMessage("SCHEDULE_ERROR", matchId + " " + e.getMessage());
                }
            });
        } catch (Exception e) {
            fantasyErrorService.logMessage("SCHEDULE_ERROR", e.getMessage());
        }

    }

}
