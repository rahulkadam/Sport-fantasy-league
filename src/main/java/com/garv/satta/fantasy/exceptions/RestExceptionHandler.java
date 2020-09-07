package com.garv.satta.fantasy.exceptions;

import com.garv.satta.fantasy.service.FantasyErrorService;
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
@ControllerAdvice(value = {"com.garv.satta.fantasy.controller", "com.garv.satta.fantasy.external"})
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @Autowired
    private FantasyErrorService fantasyErrorService;

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<Object> handleEntityNotFound(Exception ex) {
        logger.error("Exception : ", ex);
        String error = ex.getMessage();
        String error_description = ex.getLocalizedMessage();
        if (!(ex instanceof GenericException)) {
            error = "Unable to process request! Please try after sometime";
        }
        ErrorInfo errorInfo = new ErrorInfo(error, error_description);
        fantasyErrorService.saveError(errorInfo, ex);
        return new ResponseEntity(errorInfo, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
