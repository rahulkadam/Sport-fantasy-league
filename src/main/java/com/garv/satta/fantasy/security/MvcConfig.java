package com.garv.satta.fantasy.security;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer {

    String reactHomeURl = "forward:/static/index.html";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:Resources", "classpath:static");
        ;
    }

    @Override
    public void configureViewResolvers(final ViewResolverRegistry registry) {
        registry.jsp("/static/", ".*");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

    /**
     * View controller to map react mapping for loading new React UI
     *
     * @param registry
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {

        List<String> urlList = getReactMappingURL();
        urlList.forEach(url -> {
            loadReactView(registry, url);
        });
    }

    /**
     * Load react mapping and forward it to react home page
     *
     * @param registry
     * @param url
     */
    public void loadReactView(ViewControllerRegistry registry, String url) {
        registry.addViewController(url).setViewName(reactHomeURl);
    }


    /**
     * Update React UI URL mapping Here
     *
     * @return
     */
    public List getReactMappingURL() {
        List<String> urlList = Arrays.asList(
                "/", "team", "league", "login", "redirect",
                "/userinfo", "home", "error", "Error",
                "/back/venue" , "/back/team",
                "/back/player", "/back/tournament",
                "/back/match",
                "/termsAndconditions", "/helppage"
        );
        return urlList;
    }

}