package com.garv.satta.fantasy.schedular;

import com.garv.satta.fantasy.schedular.service.InitMatchSchedularTaskService;
import com.garv.satta.fantasy.schedular.service.UpdateScoreSchedularTaskService;
import com.garv.satta.fantasy.service.FantasyErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class FantasyTaskSchedular {

    @Autowired
    private InitMatchSchedularTaskService initMatchSchedularTaskService;

    @Autowired
    private UpdateScoreSchedularTaskService updateScoreSchedularTaskService;

    @Autowired
    private FantasyErrorService fantasyErrorService;
    private final String TASK_NAME="CRIC_API_TASK";

    // 5000*60
    @Scheduled(fixedRateString = "${fixedDelay.in.milliseconds}")
    public void scheduleFixedRateTask() {
        executeMatchDayTaskScheduler();
    }

    public void executeMatchDayTaskScheduler() {
        try {
            boolean isTaskEnable = initMatchSchedularTaskService.isTaskEnable(TASK_NAME);
            if (!isTaskEnable) {
                return;
            }
            initMatchSchedularTaskService.executeInitiateMatchSquadForNextMatch();
            updateScoreSchedularTaskService.executeLiveMatchScoreTaskScheduler();
        } catch (Exception e) {
            fantasyErrorService.logMessage("MATCH DAY SCHEDULE_ERROR", e.getMessage());
        }
    }
}
