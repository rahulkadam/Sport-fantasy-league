package com.garv.satta.fantasy.exceptions;

import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


@RestController
public class CustomErrorController implements ErrorController {

    @GetMapping("/error")
    public ModelAndView handleError(HttpServletResponse response) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("forward:/static/index.html");
        return modelAndView;
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }

}