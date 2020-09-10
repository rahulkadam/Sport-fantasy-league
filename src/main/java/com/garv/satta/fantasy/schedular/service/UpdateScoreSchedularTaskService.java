package com.garv.satta.fantasy.schedular.service;

import com.garv.satta.fantasy.dao.repository.TaskSchedularRepository;
import com.garv.satta.fantasy.external.service.CricMatchPlayerScoreService;
import com.garv.satta.fantasy.fantasyenum.MatchStateEnum;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.service.FantasyErrorService;
import com.garv.satta.fantasy.service.MatchService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class UpdateScoreSchedularTaskService {


    @Autowired
    private MatchService matchService;

    @Autowired
    private CricMatchPlayerScoreService cricMatchPlayerScoreService;

    @Autowired
    private FantasyErrorService fantasyErrorService;

    @Autowired
    private TaskSchedularRepository repository;

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
            fantasyErrorService.logMessage("Execute Live Match SCHEDULE_ERROR", e.getMessage());
        }
    }

    public void updateScoreForMatch(Match match) {
        try {
            MatchStateEnum state = match.getState();
            if (state == MatchStateEnum.IN_PROGRESS || state == MatchStateEnum.TOSS_COMPLETED) {
                cricMatchPlayerScoreService.updateMatchScoreFromCricAPI(match);
            }
        } catch (Exception e) {
            fantasyErrorService.logMessage("Update Score SCHEDULE_ERROR", match.getId() + " " + e.getMessage());
        }
    }
}
