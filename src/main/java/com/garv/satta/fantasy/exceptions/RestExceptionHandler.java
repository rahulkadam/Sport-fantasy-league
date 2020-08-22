package com.garv.satta.fantasy.exceptions;

import com.garv.satta.fantasy.dao.repository.FantasyErrorRepository;
import com.garv.satta.fantasy.model.monitoring.FantasyError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Exception Handler for all V2 API which will provide data to new React UI
 */
@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice(value = "com.garv.satta.fantasy.controller")
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @Autowired
    private FantasyErrorRepository repository;

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<Object> handleEntityNotFound(Exception ex) {
        ex.printStackTrace();
        String error = ex.getMessage();
        String error_description = ex.getLocalizedMessage();
        ErrorInfo errorInfo = new ErrorInfo(error, error_description);
        saveError(errorInfo, ex);
        return new ResponseEntity(errorInfo, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private void saveError(ErrorInfo errorInfo, Exception ex) {
        try {
            FantasyError fantasyError = new FantasyError();
            fantasyError.setMessage(errorInfo.error);
            repository.save(fantasyError);
        } catch (Exception e) {
            logger.error("Exception occured ", e);
        }
    }

}
