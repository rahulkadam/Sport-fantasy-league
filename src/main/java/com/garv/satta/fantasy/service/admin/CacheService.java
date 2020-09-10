package com.garv.satta.fantasy.service.admin;

import com.garv.satta.fantasy.dto.RequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class CacheService {

    @Autowired
    CacheManager cacheManager;

    List<String> cacheList = Arrays.asList("FantasyCache",
            "MatchCache" ,
            "PlayerCache",
            "TOURNAMENT_CACHE");

    public void evictSingleCacheValue(String cacheName, String cacheKey) {
        cacheManager.getCache(cacheName).evict(cacheKey);
    }

    public void evictAllCacheValues(String cacheName) {
        if ("ALL".equalsIgnoreCase(cacheName)) {

            cacheManager.getCacheNames().stream().forEach(cache -> {
                cacheManager.getCache(cache).clear();
            });
            /**
            cacheList.forEach(cache -> {
                cacheManager.getCache(cache).clear();
            });
             */
        } else {
        cacheManager.getCache(cacheName).clear();
    }
    }

    /**
     * Clear Cache by name
     * @param dto
     */
    public void clearCacheByName(RequestDTO dto) {
        String cacheName = dto.getName();
        evictAllCacheValues(cacheName);
    }

    public void clearFantasyCache() {
        evictAllCacheValues("FantasyCache");
    }

    public void clearMatchCache() {
        evictAllCacheValues("MatchCache");
    }

    public void clearPlayerCache() {
        evictAllCacheValues("PlayerCache");
    }


}
