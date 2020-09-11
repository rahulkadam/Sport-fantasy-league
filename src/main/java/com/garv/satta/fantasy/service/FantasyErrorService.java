package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.dao.repository.FantasyErrorRepository;
import com.garv.satta.fantasy.exceptions.ErrorInfo;
import com.garv.satta.fantasy.model.monitoring.FantasyError;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class FantasyErrorService {

    @Autowired
    private FantasyErrorRepository repository;

    protected final Log logger = LogFactory.getLog(this.getClass());

    public void saveError(ErrorInfo errorInfo, Exception ex) {
        try {
            FantasyError fantasyError = new FantasyError();
            fantasyError.setMessage(errorInfo.error);
            repository.save(fantasyError);
        } catch (Exception e) {
            logger.error("Exception occured ", e);
        }
    }

    public void logMessage(String message, String value) {
        try {
            FantasyError fantasyError = new FantasyError();
            fantasyError.setMessage(message);
            fantasyError.setDescription(value);
            repository.save(fantasyError);
        } catch (Exception e) {
            logger.error("Exception occured ", e);
        }
    }

    public List<FantasyError> top30Error() {
        return repository.findFirst30ByOrderByIdDesc();
    }
}
