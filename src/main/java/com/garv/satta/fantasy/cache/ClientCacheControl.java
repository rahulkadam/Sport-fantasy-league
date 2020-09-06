package com.garv.satta.fantasy.cache;

import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;

import java.util.concurrent.TimeUnit;

public class ClientCacheControl {

    public static CacheControl getCacheControl() {
        CacheControl cacheControl = CacheControl.maxAge(600, TimeUnit.SECONDS)
                .noTransform()
                .mustRevalidate();
        return cacheControl;
    }

    public static CacheControl getCacheControl(long seconds) {
        CacheControl cacheControl = CacheControl.maxAge(seconds, TimeUnit.SECONDS)
                .noTransform()
                .mustRevalidate();
        return cacheControl;
    }

    public static <T> ResponseEntity<T> getResponseBody(T obj, long seconds) {
        CacheControl cacheControl = ClientCacheControl.getCacheControl(600);
        return ResponseEntity.ok().cacheControl(cacheControl).body(obj);
    }

    // default 10 min
    public static <T> ResponseEntity<T> getResponseBody(T obj) {
        CacheControl cacheControl = ClientCacheControl.getCacheControl(600);
        return ResponseEntity.ok().cacheControl(cacheControl).body(obj);
    }
}
