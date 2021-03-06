package com.garv.satta.fantasy.validation;

import com.garv.satta.fantasy.dao.repository.MatchRepository;
import com.garv.satta.fantasy.exceptions.GenericException;
import com.garv.satta.fantasy.model.backoffice.Match;
import com.garv.satta.fantasy.model.backoffice.MatchResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MatchValidator {

    @Autowired
    private MatchRepository repository;

    public void validateMatchById(Long id) {
        if (!repository.existsById(id)) {
            throw new GenericException("Match is not exist with ID : " + id);
        }
    }

    public void isTeamIdValidForMatch(Long matchId, Long teamId) {
        Match match = repository.findMatchById(matchId);

        if (match == null) {
            throw new GenericException("Match does not exist with Id : " + match.getId());
        }

        if (match.getTeam_away().getId() != teamId && match.getTeam_host().getId() != teamId) {
            throw new GenericException("Team " + teamId + " is not playing in the Match : " + match.getId());
        }
    }

    public void validateResultExistforMatch(Long matchId) {
        Match match = repository.findMatchById(matchId);
        MatchResult matchResult = match.getMatchResult();
        if (matchResult != null) {
            throw new GenericException("Match Result is already exist for : " + matchId);
        }
    }
}
