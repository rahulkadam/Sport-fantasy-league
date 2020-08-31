package com.garv.satta.fantasy.service.admin;

import com.garv.satta.fantasy.dto.RequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

@Service
public class CacheService {

    @Autowired
    CacheManager cacheManager;

    public void evictSingleCacheValue(String cacheName, String cacheKey) {
        cacheManager.getCache(cacheName).evict(cacheKey);
    }

    public void evictAllCacheValues(String cacheName) {
        cacheManager.getCache(cacheName).clear();
    }

    /**
     * Clear Cache by name
     * @param dto
     */
    public void clearCacheByName(RequestDTO dto) {
        String cacheName = dto.getName();
        evictAllCacheValues(cacheName);
    }

}
