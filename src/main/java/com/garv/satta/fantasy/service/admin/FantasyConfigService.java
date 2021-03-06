package com.garv.satta.fantasy.service.admin;

import com.garv.satta.fantasy.dao.repository.FantasyConfigRepository;
import com.garv.satta.fantasy.model.monitoring.FantasyConfig;
import com.garv.satta.fantasy.service.FantasyErrorService;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class FantasyConfigService {

    @Autowired
    private FantasyConfigRepository fantasyConfigRepository;

    @Autowired
    private FantasyErrorService fantasyErrorService;

    @Autowired
    private CacheService cacheService;

    private final String FANTASY_CACHE = "FantasyCache";
    private final String KEY_GENERATOR = "customKeyGenerator";

    public FantasyConfig addFantasyConfig(String key, String value) {
        FantasyConfig fantasyConfig = new FantasyConfig();
        fantasyConfig.setConfigkey(key);
        fantasyConfig.setConfigvalue(value);
        fantasyConfig = fantasyConfigRepository.save(fantasyConfig);
        cacheService.clearFantasyCache();
        return fantasyConfig;
    }

    @Cacheable(cacheNames = FANTASY_CACHE , keyGenerator = KEY_GENERATOR)
    public String getCricInfoSeriesId() {
        String key = "CRIC_INFO_IPL_SERIES_ID";
        String defaultValue = "8048";
        return getValue(key, defaultValue);
    }

    @Cacheable(cacheNames = FANTASY_CACHE , keyGenerator = KEY_GENERATOR)
    public String getLiveDataProviderKey() {
        String key = "LIVE_DATA_PROVIDER";
        String defaultValue = "CRICINFO";
        return getValue(key, defaultValue);
    }

    @Cacheable(cacheNames = FANTASY_CACHE , keyGenerator = KEY_GENERATOR)
    public String getCricAPITokenKey() {
        String key = "CRIC_API_KEY";
        String defaultValue = "kdbnBeYPF3aX2PEEcXGjgowpxwz1";
        return getValue(key, defaultValue);
    }

    @Cacheable(cacheNames = FANTASY_CACHE , keyGenerator = KEY_GENERATOR)
    public int getPaginationValue() {
        String key = "PAGINATION_COUNT";
        String defaultValue = "20";
        String value =  getValue(key, defaultValue);
        return Integer.parseInt(value);
    }

    @Cacheable(cacheNames = FANTASY_CACHE , keyGenerator = KEY_GENERATOR)
    public String getTransferCountKeyValue() {
        String key = "TRANSFER_COUNT";
        String defaultValue = "DISABLE";
        return getValue(key, defaultValue);
    }

    @Cacheable(cacheNames = FANTASY_CACHE , keyGenerator = KEY_GENERATOR)
    public boolean getShowPublicLeagueKeyValue() {
        String key = "SHOW_PUBLIC_LEAGUE";
        String defaultValue = "DISABLE";
        return "ENABLE".equalsIgnoreCase(getValue(key, defaultValue));
    }

    @Cacheable(cacheNames = FANTASY_CACHE , keyGenerator = KEY_GENERATOR)
    public boolean getShowUserTeamDetailsInLeague() {
        String key = "SHOW_USER_TEAM_DEATILS_IN_LEAGUE";
        String defaultValue = "DISABLE";
        return "ENABLE".equalsIgnoreCase(getValue(key, defaultValue));
    }

    @Cacheable(cacheNames = FANTASY_CACHE , keyGenerator = KEY_GENERATOR)
    public boolean getAutoUserScoreRankingCalculate() {
        String key = "AUTO_USER_SCORE_CALCULATION";
        String defaultValue = "DISABLE";
        return "ENABLE".equalsIgnoreCase(getValue(key, defaultValue));
    }

    public String getValue(String key, String value) {
        FantasyConfig config = fantasyConfigRepository.findConfigByConfigkey(key);
        if (config == null) {
            config = addFantasyConfig(key, value);
        }
        return config.getConfigvalue();
    }

    public FantasyConfig getConfigByKey(String key) {
        FantasyConfig config = fantasyConfigRepository.findConfigByConfigkey(key);
        return config;
    }

    public void enableOtherUserTeamViewInLeague() {
        updateConfigKeyValue("SHOW_USER_TEAM_DEATILS_IN_LEAGUE" , "ENABLE");
    }

    public void disableOtherUserTeamViewInLeague() {
        updateConfigKeyValue("SHOW_USER_TEAM_DEATILS_IN_LEAGUE" , "DISABLE");
    }

    public FantasyConfig updateConfigKeyValue(String key, String value) {
        try {
            FantasyConfig config = fantasyConfigRepository.findConfigByConfigkey(key);
            if (config == null) {
                config = addFantasyConfig(key, value);
            } else {
                config.setConfigvalue(value);
            }
            config = fantasyConfigRepository.save(config);
            cacheService.clearFantasyCache();
            return config;
        } catch (Exception e) {
            fantasyErrorService.logMessage("update config key: "+ key, e.getMessage() + " : " + value);
            return null;
        }
    }

}
