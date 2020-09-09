package com.garv.satta.fantasy.service.admin;

import com.garv.satta.fantasy.dao.repository.FantasyConfigRepository;
import com.garv.satta.fantasy.model.monitoring.FantasyConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class FantasyConfigService {

    @Autowired
    private FantasyConfigRepository fantasyConfigRepository;

    @Cacheable(cacheNames = "FantasyCache" , keyGenerator = "customKeyGenerator")
    public String getCricInfoSeriesId() {
        FantasyConfig fantasyConfig = fantasyConfigRepository.findConfigByConfigkey("CRIC_INFO_IPL_SERIES_ID");
        return fantasyConfig.getConfigvalue();
    }

    @Cacheable(cacheNames = "FantasyCache" , keyGenerator = "customKeyGenerator")
    public String getLiveDataProviderKey() {
        FantasyConfig fantasyConfig = fantasyConfigRepository.findConfigByConfigkey("LIVE_DATA_PROVIDER");
        return fantasyConfig.getConfigvalue();
    }

    @Cacheable(cacheNames = "FantasyCache" , keyGenerator = "customKeyGenerator")
    public String getCricAPITokenKey() {
        FantasyConfig config = fantasyConfigRepository.findConfigByConfigkey("CRIC_API_KEY");
        return config.getConfigvalue();
    }

}
