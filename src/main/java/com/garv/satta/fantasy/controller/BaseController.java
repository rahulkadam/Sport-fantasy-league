package com.garv.satta.fantasy.controller;

import com.garv.satta.fantasy.cache.ClientCacheControl;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;

public class BaseController {

    public long FOR_1_DAY = 60*60*24;
    public long FOR_2_DAY = 60*60*24*2;
    public long FOR_7_DAY = 60*60*24*7;
    public long FOR_1_MONTH = 60*60*24*30;
    public long FOR_1_HOUR = 60*60;
    public long FOR_2_HOUR = 60*60*2;
    public long FOR_12_HOUR = 60*60*12;
    public long FOR_10_MIN = 60*10;
    public long FOR_5_MIN = 60*5;
    public long FOR_3_MIN = 60*3;
    public long FOR_2_MIN = 60*2;


    public <T> ResponseEntity<T> getResponseBody(T obj) {
        return ResponseEntity.ok().body(obj);
    }

    public <T> ResponseEntity<T> getResponseBodyWithCache(T obj) {
        CacheControl cacheControl = ClientCacheControl.getCacheControl(FOR_10_MIN);
        return ResponseEntity.ok().cacheControl(cacheControl).body(obj);
    }

    public <T> ResponseEntity<T> getResponseBodyWithCache(T obj, long seconds) {
        CacheControl cacheControl = ClientCacheControl.getCacheControl(seconds);
        return ResponseEntity.ok().cacheControl(cacheControl).body(obj);
    }
}
